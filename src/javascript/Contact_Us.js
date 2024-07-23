import axios from 'axios';

export default {
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
      isSubmitDisabled: false
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
    
    // Assuming that the presence of feedback data in the response indicates success
    if (response.data && response.data.id) {
      alert('Feedback submitted successfully!');
      this.resetForm();
    } else {
      this.errorMessage = 'Error submitting feedback. Please try again later.';
    }
  } catch (error) {
    this.errorMessage = 'Error submitting feedback. Please try again later.';
    console.error('Submit Feedback Error:', error);
  } finally {
    this.isSubmitDisabled = false; // Re-enable button after submission
  }
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
      this.isSubmitDisabled = false;
    }
  }
};