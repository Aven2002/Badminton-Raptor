<template>
  <div class="signup-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-white">
            <h4 class="card-title">Sign Up</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="signup">
              <div class="row">
                <!-- Left column -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" v-model="firstName" required>
                  </div>
                  <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" v-model="lastName" required>
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                  </div>
                </div>
                <!-- Right column -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select class="form-control" id="gender" v-model="gender" required>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Not Specify</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="age" class="form-label">Age: {{ age }}</label>
                    <input type="range" class="form-control-range" id="age" v-model="age" min="0" max="100" required>
                  </div>
                  <div class="mb-3">
                    <label for="race" class="form-label">Race</label>
                    <select class="form-control" id="race" v-model="race" required>
                      <option>Chinese</option>
                      <option>Malay</option>
                      <option>Indian</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="contactNumber" class="form-label">Contact Number</label>
                    <input type="text" class="form-control" id="contactNumber" v-model="contactNumber" required>
                  </div>
                  <div class="mb-3">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" id="dob" v-model="dob" required>
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

<script>
export default {
  name: 'Signup_view',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      gender: '',
      age: 0,
      race: '',
      contactNumber: '',
      dob: ''
    };
  },
  methods: {
    signup() {
      // Add your signup logic here
      console.log('Signup button clicked');
      console.log('First Name:', this.firstName);
      console.log('Last Name:', this.lastName);
      console.log('Email:', this.email);
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      console.log('Gender:', this.gender);
      console.log('Age:', this.age);
      console.log('Race:', this.race);
      console.log('Contact Number:', this.contactNumber);
      console.log('Date of Birth:', this.dob);
      // Example: You can use Axios or fetch to send signup request
      // Example:
      // axios.post('/api/signup', {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   email: this.email,
      //   username: this.username,
      //   password: this.password,
      //   gender: this.gender,
      //   age: this.age,
      //   race: this.race,
      //   contactNumber: this.contactNumber,
      //   dob: this.dob
      // }).then(response => {
      //   console.log(response.data);
      // }).catch(error => {
      //   console.error('Error signing up:', error);
      // });
    }
  }
};
</script>

<style scoped>
.signup-container {
  padding: 45px;
}

body {
  color: #ffffff;
  font-family: 'Arial', sans-serif;
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

.form-control, .form-control-range, .form-select {
  background-color: #2c2c2c;
  border: 1px solid #444444;
  color: #ffffff;
}

.form-control::placeholder, .form-control-range::placeholder, .form-select::placeholder {
  color: #ffffff;
}

.form-control:focus {
  background-color: #2c2c2c;
  border-color: #555555;
  box-shadow: none;
  color:white;
}

input[type="range"] {
  width: 100%;
  height: 1.5rem;
  background: #2c2c2c;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}
</style>
