<template>
    <div class="container mt-5">
      <div class="card">
        <!-- Top Section -->
        <div class="card-header">
          <h2>My Profile</h2>
          <p>Manage and protect your account</p>
          <p>ID: {{ userID }}</p>
        </div>
  
        <!-- Second Row -->
        <div class="card-body">
          <div class="row">
            <!-- Left Side: User Info -->
            <div class="col-md-6">
              <form @submit.prevent="updateProfile">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="user.username" />
                </div>
                <div class="mb-3">
                  <label for="fname" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="fname" v-model="user.fname" />
                </div>
                <div class="mb-3">
                  <label for="lname" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="lname" v-model="user.lname" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="user.email" />
                </div>
                <div class="mb-3">
                  <label for="contactNum" class="form-label">Contact Number</label>
                  <input type="text" class="form-control" id="contactNum" v-model="user.contactNum" />
                </div>
                <div class="mb-3">
                  <label for="dob" class="form-label">Date of Birth</label>
                  <input type="date" class="form-control" id="dob" v-model="user.dob" />
                </div>
                <div class="mb-3">
                  <label for="gender" class="form-label">Gender</label>
                  <select class="form-control" id="gender" v-model="user.gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
              </form>
            </div>
  
            <!-- Right Side: Profile Image -->
            <div class="col-md-6">
              <h5>Change Profile Image</h5>
              <div class="d-flex flex-wrap">
                <img 
                  v-for="img in profileImages" 
                  :src="img" 
                  :key="img" 
                  @click="selectProfileImage(img)" 
                  class="img-thumbnail m-2" 
                  :class="{ selected: user.profileImg === img }"
                  style="cursor: pointer;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        user: {
          username: '',
          fname: '',
          lname: '',
          email: '',
          contactNum: '',
          dob: '',
          gender: '',
          profileImg: ''
        },
        userID: Cookies.get('userID') || '000', 
        profileImages: [
          require('@/assets/Profile_Img/Profile_Img_01.png'),
          require('@/assets/Profile_Img/Profile_Img_02.png'),
          require('@/assets/Profile_Img/Profile_Img_03.png'),
          require('@/assets/Profile_Img/Profile_Img_04.png')
        ]
      };
    },
    created() {
      this.fetchUserInfo();
    },
    methods: {
      async fetchUserInfo() {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${this.userID}`);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      },
      async updateProfile() {
        try {
          await axios.put(`http://localhost:3000/api/user/${this.userID}`, this.user);
          alert('Profile updated successfully!');
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile.');
        }
      },
      selectProfileImage(img) {
        this.user.profileImg = img;
      }
    }
  };
  </script>
  
  <style scoped>
  .selected {
    border: 2px solid #007bff;
  }
  </style>
  