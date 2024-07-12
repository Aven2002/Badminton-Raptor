<template>
  <div class="login-container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-white">
            <h4 class="card-title">Login</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
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
  background-image: url('../assets/background/Bg_01.png');
  background-size: cover;
  padding:50px;
}

.card {
  background-color: #1e1e1e;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

.form-control:focus {
  background-color: #2c2c2c;
  border-color: #555555;
  box-shadow: none;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}
</style>
