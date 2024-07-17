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
                <li>Email: sportStoreSystem@service.com</li>
                <li>Phone: +03-9011-2945</li>
                <li>Address: Sport Store, Jalan Professor Khoo Kay Kim, Seksyen 13, 46200 Petaling Jaya, Selangor</li>
              </ul>
            </div>
            <div class="col-md-6">
              <!-- Right side with form -->
              <form @submit.prevent="submitFeedback">
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <select id="category" v-model="form.category" class="form-control">
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
                  <input type="email" id="email" v-model="form.email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="contactNum" class="form-label">Contact Number</label>
                  <input type="text" id="contactNum" v-model="form.contactNum" class="form-control" required>
                  <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Feedback</label>
                  <textarea id="message" v-model="form.message" class="form-control" rows="4" required @input="updateCharCount"></textarea>
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
          category: 'General',
          email: '',
          contactNum: '',
          message: ''
        },
        charCount: 0,
        phoneError: '',
        errorMessage: '',
        isSubmitDisabled: false
      };
    },
    methods: {
      updateCharCount() {
        this.charCount = this.form.message.trim().length;
        if (this.charCount > 1500) {
          this.errorMessage = 'Maximum 1500 characters allowed.';
          this.isSubmitDisabled = true;
        } else {
          this.errorMessage = '';
          this.isSubmitDisabled = false;
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
  
        try {
          const response = await axios.post('http://your-api-endpoint/submitFeedback', this.form);
          if (response.data.success) {
            alert('Feedback submitted successfully!');
          } else {
            alert('Error submitting feedback. Please try again later.');
          }
        } catch (error) {
          alert('Error submitting feedback. Please try again later.');
        }
      }
    }
  };
  </script>

  <style scoped>
  
  .container {
  padding:30px;
}

.card {
  background-color: #1e1e1e;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.card-header {
  background-color: #333333;
  border-bottom: 1px solid #444444;
}

h4 {
  color: #ffffff;
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
  color: #bbbbbb; /* Light grey color for the placeholder */
}

.form-control:focus {
  border-color: #555555;
  box-shadow: none;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.text-white {
  color: #ffffff;
}

li {
  text-align: left;
  font-size: 13px;
  margin-top: 15px;
}

p {
  text-align: left;
  font-size: 15px;
}

  </style>
  