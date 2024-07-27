import axios from 'axios';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import { Modal } from 'bootstrap';

export default {
  components: {
    SuccessModal,
    ErrorModal
  },
  data() {
    return {
      form: {
        feedbackCategory: 'General',
        email: '',
        contactNum: '',
        feedbackContent: ''
      },
      charCount: 0,
      phoneError: '',
      errorMessage: '',
      successMessage: '',
      isSubmitDisabled: false,
      showSuccess: false,
      showError: false
    };
  },
  methods: {
    updateCharCount() {
      if (this.form.feedbackContent) {
        this.charCount = this.form.feedbackContent.trim().length;
        if (this.charCount > 1500) {
          this.errorMessage = 'Maximum 1500 characters allowed.';
          this.isSubmitDisabled = true;
        } else {
          this.errorMessage = '';
          this.isSubmitDisabled = false;
        }
      } else {
        this.charCount = 0;
      }
    },
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^\+?\d{1,}$/;
      return phoneRegex.test(phoneNumber);
    },
    async submitFeedback() {
      if (!this.validatePhoneNumber(this.form.contactNum)) {
        this.phoneError = 'Invalid phone number format. Please try again...';
        return;
      }

      this.isSubmitDisabled = true; // Disable submit button during submission

      try {
        const response = await axios.post('http://localhost:3000/api/feedback', this.form);
        
        if (response.data && response.data.id) {
          this.showSuccessModal('Your feedback has been submitted successfully!');
        } else {
          this.showErrorModal('An error occurred while logging in. Please try again later.');
        }
      } catch (error) {
        this.showErrorModal('An error occurred while logging in. Please try again later.');
      } finally {
        this.isSubmitDisabled = false; // Re-enable button after submission
      }
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
      successModal._element.addEventListener('hidden.bs.modal', this.resetForm);
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
      errorModal._element.addEventListener('hidden.bs.modal', this.resetForm);
    },
    resetForm() {
      this.form = {
        feedbackCategory: 'General',
        email: '',
        contactNum: '',
        feedbackContent: ''
      };
      this.charCount = 0;
      this.phoneError = '';
      this.errorMessage = '';
      this.successMessage = '';
      this.showSuccess = false;
      this.showError = false;
      this.isSubmitDisabled = false;
    }
  }
};