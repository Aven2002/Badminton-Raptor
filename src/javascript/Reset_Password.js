import axios from 'axios';
import { Modal } from 'bootstrap';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';

export default {
  components: {
    ErrorModal,
    SuccessModal,
    BackBtn,
  },
  data() {
    return {
      step: 1,
      username: "",
      profileImg: "", // Set based on account confirmation
      securityQuestion: "", // Set based on account data
      securityAnswer: "",
      newPassword: "",
      confirmPassword: "",
      accountConfirmed: false, // Initially false, set to true when user account is confirmed
      isStep2Valid: false, // Controls step 3 accessibility
      errorMessage: "",
      successMessage: "",
      userID: null,
      questionID: null,
      isAnswerVerified: false,
    };
  },
  computed: {
    isStep3Valid() {
      return this.isAnswerVerified;
    },
  },
  methods: {
    goToStep(step) {
      if (step === 2 && !this.accountConfirmed) return;
      if (step === 3 && !this.isStep2Valid) return;
      this.step = step;
    },
    async checkUsername() {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/user/${this.username}`);
        if (response.data.message === 'Username does not exist') {
          this.showError('User not found. Please check your username or email.');
          this.reset(); // Clear the form on error
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
            this.reset(); // Clear the form on error
          }
        } else {
          this.showError('User not found. Please check your username or email.');
          this.reset(); // Clear the form on error
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.showError('User not found. Please check your username or email.'); 
        } else {
          this.showError('An error occurred while checking the username. Please try again.');
        }
      }
    },
    confirmIdentity(isConfirmed) {
      this.accountConfirmed = isConfirmed;
      if (isConfirmed) {
        this.goToStep(3);
        this.getRandomQuestion();
      } else {
        this.reset();
      }
    },
    async getRandomQuestion() {
      try {
        const response = await axios.get(`http://localhost:3000/api/security/random-security-question/${this.userID}`);
        if (response.data && response.data.questionID) {
          this.questionID = response.data.questionID;
          await this.getSecurityQuestion(this.questionID);
        } else {
          this.showError('Error fetching security question.');
          this.reset(); // Clear the form on error
        }
      } catch (error) {
        this.handleError(error, 'fetching a random question');
        this.reset(); // Clear the form on error
      }
    },
    async getSecurityQuestion(questionID) {
      try {
        const response = await axios.get(`http://localhost:3000/api/security/security-question/${questionID}`);
        if (response.data && response.data.question) {
          this.securityQuestion = response.data.question;
          this.step = 3;
        } else {
          this.showError('Error fetching security question text.');
          this.reset(); // Clear the form on error
        }
      } catch (error) {
        this.handleError(error, 'fetching security question text');
        this.reset(); // Clear the form on error
      }
    },
    async verifyAnswer() {
      try {
        const payload = {
          userID: this.userID,
          questionID: parseInt(this.questionID, 10),
          answer: this.securityAnswer,
        };

        const response = await axios.post('http://localhost:3000/api/security/verify-security-answer', payload, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.data.verified) {
          this.isAnswerVerified = true;
          this.isStep2Valid = true;
          this.goToStep(4);
        } else {
          this.showError('Incorrect security answer. Please try again.');
          this.reset(); // Clear the form on error
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.showError('Incorrect security answer. Please try again later');
          this.reset(); // Clear the form on error
        } else {
          this.showError('Error verifying security answer.');
        }
      }
    },
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.showError('Passwords do not match.');
        return;
      }
      try {
        await axios.put('http://localhost:3000/api/security/updatePassword', {
          userID: this.userID,
          newPassword: this.newPassword,
        });
        this.showSuccessModal('Password updated successfully.');
        this.$router.push('/log_in_view');
      } catch (error) {
        this.handleError(error, 'updating the password');
        this.reset(); // Clear the form on error
      }
    },
    reset() {
      this.step = 1;
      this.username = '';
      this.profileImg = '';
      this.questionID = null;
      this.securityQuestion = '';
      this.securityAnswer = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.accountConfirmed = false;
      this.isAnswerVerified = false;
    },
    showError(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
    },
    handleError(error, action) {
      console.error(`Error ${action}:`, error);
      this.showError(`An error occurred while ${action}. Please try again.`);
    },
  },
};
