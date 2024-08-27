<template>
    <div class="reset-password-container">
    <!-- Navigation Bar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <nav class="pagination-container">
        <ul class="pagination mb-0">
          <li :class="['page-item', { active: step === 1 }]">
            <a class="page-link" href="#" @click.prevent="goToStep(1)">Username</a>
          </li>
          <li :class="['page-item', { active: step === 2 }]">
            <a class="page-link" href="#" @click.prevent="goToStep(2)" :class="{ disabled: !accountConfirmed }">Account Confirmation</a>
          </li>
          <li :class="['page-item', { active: step === 3 }]">
            <a class="page-link" href="#" @click.prevent="goToStep(3)" :class="{ disabled: !isStep2Valid }">Security Question</a>
          </li>
          <li :class="['page-item', { active: step === 4 }]">
            <a class="page-link" href="#" @click.prevent="goToStep(4)" :class="{ disabled: !isAnswerVerified }">Reset Password</a>
          </li>
        </ul>
      </nav>
      <!-- Back Button -->
      <BackBtn />
    </div>

   <!-- Form Sections -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg">
          <div class="card-body">
            <!-- Form for each step -->
            <form @submit.prevent="processForm">
              <!-- Step 1: Username Entry -->
              <div v-if="step === 1">
                <h4 class="text-center">Enter your username</h4>
                <input type="text" class="form-control" v-model="username" />
                <button class="btn btn-primary mt-3 d-block mx-auto" @click="checkUsername">Next</button>
              </div>

              <!-- Step 2: Account Confirmation -->
              <div v-if="step === 2">
                <h4 class="text-center">Account Information</h4>
                <p class="text-center">Is this your account?</p>
                <img :src="profileImg" alt="Profile Image" class="rounded-circle d-block mx-auto" width="150" height="150" />
                <p class="text-center">{{ username }}</p>
                <div class="mt-3 text-center">
                  <button class="btn btn-success me-3" @click="confirmIdentity(true)">Yes</button>
                  <button class="btn btn-danger" @click="confirmIdentity(false)">No</button>
                </div>
              </div>

              <!-- Step 3: Security Question -->
              <div v-if="step === 3">
                <h4 class="text-center">Security Question</h4>
                <p class="text-center">{{ securityQuestion }}</p>
                <label for="answer" class="form-label">Your Answer:</label>
                <input type="text" class="form-control" id="answer" v-model="securityAnswer" />
                <button class="btn btn-primary mt-3 d-block mx-auto" @click="verifyAnswer">Submit Answer</button>
              </div>

              <!-- Step 4: Password Reset -->
              <div v-if="step === 4">
                <h4 class="text-center">Reset Your Password</h4>
                <label for="newPassword" class="form-label">New Password</label>
                <input type="password" class="form-control" v-model="newPassword" required />
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" v-model="confirmPassword" required />
                <button type="submit" class="btn btn-primary mt-3 d-block mx-auto" @click="updatePassword">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Modals for success and error handling -->
    <ErrorModal :errorMessage="errorMessage" />
    <SuccessModal :successMessage="successMessage" />
  </div>
</template>


<script src='@/javascript/Reset_Password.js'></script>
<style src='@/style/Reset_Password.css' scoped></style>
