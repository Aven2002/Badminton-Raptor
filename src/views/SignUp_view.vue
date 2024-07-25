<template>
  <div class="signup-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-white">
            <h4 class="card-title">Sign Up</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="signUp">
              <div class="row">
                <!-- Left column -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="fname" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="fname" v-model="form.fname" required>
                  </div>
                  <div class="mb-3">
                    <label for="lname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lname" v-model="form.lname" required>
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="form.username" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="form.email" required>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="form.password" required>
                  </div>
                </div>
                <!-- Right column -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select class="form-control" id="gender" v-model="form.gender" required>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Not Specify</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="age" class="form-label">Age: {{ form.age }}</label>
                    <input type="range" class="form-control-range" id="age" v-model="form.age" min="0" max="100" required>
                  </div>
                  <div class="mb-3">
                    <label for="race" class="form-label">Race</label>
                    <select class="form-control" id="race" v-model="form.race" required>
                      <option>Chinese</option>
                      <option>Malay</option>
                      <option>Indian</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="contactNumber" class="form-label">Contact Number</label>
                    <input type="text" class="form-control" id="contactNumber" v-model="form.contactNum" required>
                  </div>
                  <div class="mb-3">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" id="dob" v-model="form.dob" required>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='@/javascript/SignUp.js'></script>

<style src='@/style/SignUp.css' scoped></style>