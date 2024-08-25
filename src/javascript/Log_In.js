import axios from 'axios';
import { Modal } from 'bootstrap';
import Cookies from 'js-cookie';
import ErrorModal from '@/components/Error_modal_com.vue';

export default {
  name: 'Log_In_view',
  components: {
    ErrorModal
  },
  data() {
    return {
      step: 1,
      identifier: '',
      password: '',
      errorMessage: '',
      showPassword: false,
      isAdmin: false, // Track if the user is an admin
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordToggleIcon() {
      return this.showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    },
    homeLink() {
      return this.isAdmin ? '/Home_view_admin' : '/Home_view_user';
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
        const response = await axios.post('http://localhost:3000/api/account/verifyPassword', {
          identifier: this.identifier, // Can be either username or email
          password: this.password,
        });
    
        if (response.data.success) {
          Cookies.set('userID', response.data.userID);
          await this.checkUserRole(); // Ensure role is checked before redirecting
          this.$router.push(this.homeLink); // Redirect based on user role
        } else {
          this.showError('Incorrect Password or Username'); // Show specific error message
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.showError('Incorrect Password or Username'); // Handle 401 errors specifically
        } else {
          this.showError('An error occurred while logging in. Please try again later.');
        }
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
    },
    async checkUserRole() {
      try {
        const userID = Cookies.get('userID');
        if (!userID) {
          console.warn('No userID found in cookies');
          this.isAdmin = false; // Default to non-admin if no userID
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/account/${userID}/role`);
        const userRole = response.data.userRole;

        this.isAdmin = userRole === 'Admin'; // Ensure this matches the role in your API
        Cookies.set('userRole', userRole); // Save the userRole to cookies
      } catch (error) {
        console.error('Error fetching user role:', error);
        this.isAdmin = false; // Default to non-admin in case of error
      }
    }
  }
};
