<template>
  <div class="d-flex justify-content-end mt-3 me-5">
    <BackBtn/>
  </div>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card position-relative">
      <!-- Card Header -->
      <div class="card-header text-white text-center">
        <h4 class="card-title">Login</h4>
      </div>

      <!-- Card Body with Grid Layout -->
      <div class="card-body">
        <div class="row align-items-center">
          <!-- Image Column -->
          <div class="col-md-4 d-flex justify-content-center">
            <img src='@/assets/Icon/badminton_icon.png' alt="Badminton Icon" class="img-fluid" />
          </div>

          <!-- Content Column -->
          <div class="col-md-8">
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
          </div>
        </div>

        <!-- Links aligned in a second row -->
        <div class="row mt-3">
          <div class="col text-center">
            <router-link to="/Reset_Password_view" class="text-center" style="color: #bbbbbb">
              Forgot Password?
            </router-link>
          </div>
          <div class="col text-center">
            <router-link to="/Sign_Up_view" class="text-center" style="color: #bbbbbb">
              Create an account
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
  </div>
</template>



<script src='@/javascript/Log_In.js'></script>

<style src='@/style/Log_In.css' scoped></style>
