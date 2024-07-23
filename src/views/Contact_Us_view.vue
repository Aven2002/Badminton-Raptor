<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header">
        <h4>Send us a message</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <!-- Left side with image -->
            <img src='@/assets/contactLogo.png' alt="Contact Image" class="img-fluid mb-3">
            <p class="text-white">Contact Information:</p>
            <ul class="list-unstyled text-white">
              <li>Email: badmintonRaptorSystem@service.com</li>
              <li>Phone: +03-9011-2945</li>
              <li>Address: Badminton Raptor, Jalan Professor Khoo Kay Kim, Seksyen 13, 46200 Petaling Jaya, Selangor</li>
            </ul>
          </div>
          <div class="col-md-6">
            <!-- Right side with form -->
            <form @submit.prevent="submitFeedback">
              <div class="mb-3">
                <label for="feedbackCategory" class="form-label">Category</label>
                <select id="feedbackCategory" v-model="form.feedbackCategory" class="form-control" autocomplete="off">
                  <option value="General">General Inquiry</option>
                  <option value="Bug">Report a Bug or Technical Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required autocomplete="email">
              </div>
              <div class="mb-3">
                <label for="contactNum" class="form-label">Contact Number</label>
                <input type="text" id="contactNum" v-model="form.contactNum" class="form-control" required autocomplete="tel">
                <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
              </div>
              <div class="mb-3">
                <label for="feedbackContent" class="form-label">Feedback</label>
                <textarea id="feedbackContent" v-model="form.feedbackContent" class="form-control" rows="4" required autocomplete="off" @input="updateCharCount"></textarea>
                <div id="charCount" class="text-white">{{ charCount }}/1500 characters</div>
                <div id="errorMessage" class="text-danger">{{ errorMessage }}</div>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitDisabled">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    console.log('Response Data:', response.data); // Log response data
    
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
</script>

<style src='@/style/Contact_Us.css' scoped></style>
