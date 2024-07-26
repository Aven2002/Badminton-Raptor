import axios from 'axios';
import { Modal } from 'bootstrap';
import Cookies from 'js-cookie';

export default {
  name: 'Login_view',
  data() {
    return {
      step: 1,
      identifier: '',
      password: '',
      errorMessage: '',
      showPassword: false,
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordToggleIcon() {
      return this.showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    }
  },
  methods: {
    async checkUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/account');
        const users = response.data;
        const user = users.find(
          (u) => u.username === this.identifier || u.email === this.identifier
        );

        if (user) {
          this.step = 2;
        } else {
          this.showError('User not found. Please check your username or email.');
        }
      } catch (error) {
        this.showError('An error occurred while checking the user. Please try again later.');
      }
    },
    async login() {
      try {
        const response = await axios.get('http://localhost:3000/api/account');
        const users = response.data;
        const user = users.find(
          (u) => (u.username === this.identifier || u.email === this.identifier) && u.password === this.password
        );

        if (user) {
          Cookies.set('userID', user.userID);
          this.$router.push('/Home_view');
        } else {
          this.showError('Incorrect username or password.');
        }
      } catch (error) {
        this.showError('An error occurred while logging in. Please try again later.');
      }
    },
    showError(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
      errorModal._element.addEventListener('hidden.bs.modal', this.resetForm);
    },
    resetForm() {
      this.step = 1;
      this.identifier = '';
      this.password = '';
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};