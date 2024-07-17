<template>
  <div class="reset-container d-flex justify-content-center align-items-center">
    <div class="card reset-card">
      <div class="card-header text-center">
        <h4>Reset Password</h4>
      </div>
      <div class="card-body">
        <p class="text">Please enter your email address which is linked with your account</p>
        <form @submit.prevent="submitEmail">
          <div class="mb-3">
            <input type="email" id="email" v-model="email" class="form-control" placeholder="Email address" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Reset_Password_view',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async submitEmail() {
      try {
        const response = await axios.post('http://your-api-endpoint/resetPassword', { email: this.email });
        if (response.data.success) {
          alert('Password reset link has been sent to your email!');
        } else {
          alert('Error sending reset link. Please try again later.');
        }
      } catch (error) {
        alert('Error sending reset link. Please try again later.');
      }
    }
  }
};
</script>

<style scoped>
body {
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.reset-container {
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
  padding: 1.0rem;
  border-bottom: 1px solid #444444;
  color:white;
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

.form-control:focus, .form-select:focus {
  background-color: #2c2c2c;
  border-color: #555555;
  box-shadow: none;
  color:white;
}

.text {
  color: #ffffff;
  text-align: left;
  font-size: 18px;
}
@media (max-width: 576px) {
  .card {
    max-width: 100%;
  }

  .card-header,
  .card-body {
    padding: 1rem;
  }

  .text {
    font-size: 16px;
  }

  .form-control::placeholder {
    font-size: 12px;
  }
}
</style>
