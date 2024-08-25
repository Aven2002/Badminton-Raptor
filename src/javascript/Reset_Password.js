import axios from 'axios';
import { Modal } from 'bootstrap';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import UpdateModal from '@/components/Update_Password_modal_com.vue';

export default {
  components: {
    ErrorModal,
    SuccessModal,
    UpdateModal
  },
  data() {
    return {
      step: 1,
      username: '',
      userID: null,
      profileImg: '',
      questionID: null,
      securityQuestion: '',
      securityAnswer: '',
      newPassword: '', // For password reset
      errorMessage: '', // Initialize as an empty string
      successMessage: '',
      showModal: false
    };
  },
  methods: {
    async checkUsername() {
        try {
          const response = await axios.get(`http://localhost:3000/api/account/user/${this.username}`);
          if (response.data.message === 'Username does not exist') {
            this.showError('User not found. Please check your username or email.');
          } else if (response.data.userID) {
            this.userID = response.data.userID;
            const accountResponse = await axios.get(`http://localhost:3000/api/account/${this.userID}`);
            if (Array.isArray(accountResponse.data) && accountResponse.data.length > 0) {
              const accountData = accountResponse.data[0];
              this.username = accountData.username;
              this.profileImg = accountData.profileImg;
              this.step = 2;
              this.errorMessage = '';
            } else {
              this.showError('Account information could not be retrieved. Please try again.');
            }
          } else {
            this.showError('An unexpected error occurred. Please try again.');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.showError('User not found. Please check your username or email.'); 
          } else {
            this.showError('An error occurred while checking the username. Please try again.');
          }
        }
      },
      showError(message) {
        this.errorMessage = message;
        const errorModal = new Modal(document.getElementById('errorModal'));
        errorModal.show();
        errorModal._element.addEventListener('hidden.bs.modal', this.resetForm);
      },
    confirmIdentity(isConfirmed) {
      if (isConfirmed) {
        this.getRandomQuestion();
      } else {
        this.reset();
      }
    },
    async getRandomQuestion() {
      try {
        const response = await axios.get(`http://localhost:3000/api/security/security-question/random/${this.userID}`);
        if (response.data && response.data.questionID) {
          this.questionID = response.data.questionID;
          await this.getSecurityQuestion(this.questionID);
        } else {
          this.errorMessage = 'Error fetching security question.';
        }
      } catch (error) {
        this.errorMessage = 'Error fetching random question.';
      }
    },
    async getSecurityQuestion(questionID) {
      try {
        const response = await axios.get(`http://localhost:3000/api/security/security-question/${questionID}`);
        if (response.data && response.data.question) {
          this.securityQuestion = response.data.question;
          this.step = 3;
        } else {
          this.errorMessage = 'Error fetching security question text.';
        }
      } catch (error) {
        this.errorMessage = 'Error fetching security question text.';
      }
    },
    async verifyAnswer() {
        try {
          const payload = {
            userID: this.userID,
            questionID: this.questionID,
            answer: this.securityAnswer
          };
          const response = await axios.post('http://localhost:3000/api/security/verifySecurityAnswer', payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.data.verified) {
            this.step = 4;
            this.showSuccessModal('Security answer verified successfully.');
          } else {
            this.errorMessage = 'Incorrect security answer.';
            this.showErrorModal();
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = 'Incorrect security answer. Please try again later';
          } else {
            this.errorMessage = 'Error verifying security answer.';
          }
          this.showErrorModal();
        }
      },
    async resetPassword() {
      try {
        const response = await axios.post('http://localhost:3000/api/account/reset-password', {
          userID: this.userID,
          newPassword: this.newPassword
        });
        if (response.data.success) {
          this.showSuccessModal('Password successfully reset.');
          this.step = 1;
        } else {
          this.errorMessage = 'Failed to reset password.';
        }
      } catch (error) {
        this.errorMessage = 'Error resetting password.';
      }
    },
    reset() {
      this.step = 1;
      this.username = '';
      this.errorMessage = '';
    },
    showSuccessModal(message) {
        this.successMessage = message;
        const successModal = new Modal(document.getElementById('successModal'));
        successModal.show();
      
        // Listen for the 'hidden' event to show the update password modal
        successModal._element.addEventListener('hidden.bs.modal', () => {
          this.showUpdatePasswordModal();
        });
      },      
    showErrorModal() {
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    showUpdatePasswordModal() {
        if (!this.username) {
          console.error('Username is not set.');
          return;
        }
        this.showModal = true;
      },
      hideUpdatePasswordModal() {
        this.showModal = false;
      }
    }
};