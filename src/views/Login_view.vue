<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header text-white text-center">
        <h4 class="card-title">Login</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <div class="input-group">
              <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Username or email address" required>
            </div>
          </div>
          <div class="mb-3">
            <div class="input-group">
              <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <router-link to="/Reset_Password_view" class="d-block mt-3 text-center" style="color: #bbbbbb">
  Forgot Password?
</router-link>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login_view',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Login button clicked');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Add your login logic here
    }
  }
};
</script>

<style scoped>
body {
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.login-container {
  padding:100px;
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

.form-control:focus, .form-select:focus {
  background-color: #2c2c2c;
  border-color: #555555;
  box-shadow: none;
  color:white;
}
</style>
