<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header text-white text-center">
        <h4 class="card-title">Login</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div v-if="step === 1">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                <input type="text" class="form-control" v-model="identifier" placeholder="Username or email address" required>
              </div>
            </div>
            <button type="button" class="btn btn-primary w-100" @click="checkUser">Next</button>
          </div>
          <div v-if="step === 2">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                <input :type="passwordFieldType" class="form-control" v-model="password" placeholder="Password" required>
                <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                  <i :class="passwordToggleIcon"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </form>
        <router-link to="/Reset_Password_view" class="d-block mt-3 text-center" style="color: #bbbbbb">
          Forgot Password?
        </router-link>
      </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ errorMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>

<style scoped>
body {
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.login-container {
  padding: 100px;
}

.card {
  background-color: #1e1e1e;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
}

.card-header {
  background-color: #333333;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #444444;
}

.card-title {
  margin-bottom: 0;
}

.card-body {
  padding: 1.5rem;
}

.form-label {
  color: #bbbbbb;
}

.form-control {
  background-color: #2c2c2c;
  border: 1px solid #444444;
  color: #ffffff;
}

.form-control::placeholder {
  color: #bbbbbb;
  font-size: 13px;
}

.form-control:focus {
  background-color: #2c2c2c;
  border-color: #555555;
  box-shadow: none;
  color: white;
}
</style>
