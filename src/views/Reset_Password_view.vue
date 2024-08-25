<template>
    <div>
      <div v-if="!showModal" class="reset-password-container d-flex justify-content-center align-items-center">
        <div class="card">
          <div class="card-header text-white text-center">
            <h4 class="card-title">Reset Password</h4>
          </div>
          <div class="card-body">
            <!-- Step 1: Enter Username -->
            <div v-if="step === 1">
              <div class="form-group">
                <label for="username" class="form-label">Enter your Username:</label>
                <input type="text" class="form-control" v-model="username" />
              </div>
              <button class="btn btn-primary mt-3" @click="checkUsername">Next</button>
            </div>
  
            <!-- Step 2: Is that you? -->
            <div v-if="step === 2">
              <div class="form-group">
                <h4 class="form-label">Is this you?</h4>
                <img :src="profileImg" alt="Profile Image" class="rounded-circle" width="150" height="150" />
                <h5 class="form-label">{{ username }}</h5>
                <div class="mt-3">
                  <button class="btn btn-success me-3" @click="confirmIdentity(true)">Yes</button>
                  <button class="btn btn-danger" @click="confirmIdentity(false)">No</button>
                </div>
              </div>
            </div>
  
            <!-- Step 3: Answer Security Question -->
            <div v-if="step === 3">
              <div class="form-group">
                <h4 class="form-label">Security Question</h4>
                <p class="form-label">{{ securityQuestion }}</p>
                <label for="answer" class="form-label">Your Answer:</label>
                <input type="text" class="form-control" v-model="securityAnswer" />
                <button class="btn btn-primary mt-3" @click="verifyAnswer">Submit Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modals -->
      <ErrorModal :errorMessage="errorMessage" />
      <SuccessModal :successMessage="successMessage" />
      <UpdateModal
        v-if="showModal"
        :username="username"
        @close="hideUpdatePasswordModal"
      />
    </div>
  </template>
  
  
  <script src='@/javascript/Reset_Password.js'></script>
  
  <style scoped>
  body {
    color: #ffffff;
    font-family: 'Arial', sans-serif;
  }
  
  .reset-password-container {
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
  