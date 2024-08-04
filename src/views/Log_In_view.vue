<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header text-white text-center">
        <h4 class="card-title">Login</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div v-if="step === 1">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                <input type="text" class="form-control" v-model="identifier" placeholder="Username or email address" required>
              </div>
            </div>
            <button type="button" class="btn btn-primary w-100" @click="checkUser">Next</button>
          </div>
          <div v-if="step === 2">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                <input :type="passwordFieldType" class="form-control" v-model="password" placeholder="Password" required>
                <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                  <i :class="passwordToggleIcon"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </form>
        <router-link to="/Reset_Password_view" class="d-block mt-3 text-center" style="color: #bbbbbb">
          Forgot Password?
        </router-link>
      </div>
    </div>

    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
  </div>
</template>

<script src='@/javascript/Log_In.js'></script>

<style src='@/style/Log_In.css' scoped></style>
