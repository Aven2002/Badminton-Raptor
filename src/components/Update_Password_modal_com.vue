<template>
    <div class="update-password-container d-flex justify-content-center align-items-center">
      <div class="card">
        <div class="card-header text-white text-center">
          <h4 class="card-title">New Password</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePassword">
            <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
              </div>
              <button type="submit" class="btn btn-primary">Update Password</button>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleClose">Close</button>
          </div>
        </div>
      </div>
  
    <!-- Modal -->
     <ErrorModal :errorMessage="errorMessage" />
    <SuccessModal :successMessage="successMessage" />
    </div>
  </template>


<script>
import axios from 'axios';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import { Modal } from 'bootstrap';

export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  components: {
    SuccessModal,
    ErrorModal
  },
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      userID: null,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        this.showErrorModal();
        return;
      }

      try {
        const userResponse = await axios.get(`http://localhost:3000/api/account/user/${this.username}`);
        this.userID = userResponse.data.userID;

        if (!this.userID) {
          this.errorMessage = 'User ID could not be retrieved.';
          this.showErrorModal();
          return;
        }

        await axios.post('http://localhost:3000/api/security/updatePassword', {
          userID: this.userID,
          newPassword: this.newPassword
        });

        this.successMessage = 'Password updated successfully!';
        this.newPassword = '';
        this.confirmPassword = '';
        this.showSuccessModal();
      } catch (error) {
        if (error.response) {
          this.errorMessage = `Error: ${error.response.data.message || 'An error occurred. Please try again.'}`;
          this.showErrorModal();
        } else if (error.request) {
          this.errorMessage = 'No response from server. Please check your network connection.';
          this.showErrorModal();
        } else {
          this.errorMessage = `Error: ${error.message || 'An unexpected error occurred.'}`;
          this.showErrorModal();
        }
      }
    },
    showSuccessModal() {
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
      document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
        this.$router.push('/');
      });
    },
    showErrorModal() {
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    }
  }
};
</script>

  
  <style scoped>
  body {
    color: #ffffff;
    font-family: 'Arial', sans-serif;
  }
  
  .update-password-container {
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