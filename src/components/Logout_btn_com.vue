<template>
    <div class="dropdown">
      <button
      class="btn btn-transparent rounded-circle dropdown-toggle"
      id="userDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img :src="userImg" alt="Profile" class="profile-img" />
      </button>
<ul class="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userDropdown">
      <li class="dropdown-item-text">
        <strong>{{ username }}</strong>
      </li>
      <li>
        <router-link to='/settings_view' class="dropdown-item mt-3 acc_settings_btn">Account Settings</router-link>
      </li>
      <li>
        <button class="dropdown-item mt-2 logout_btn" @click="handleLogout">Sign Out</button>
      </li>
    </ul>

      <!-- Confirmation Modal -->
      <ConfirmationModal
        :confirmationMessage="confirmationMessage"
        @confirm="handleConfirm"
        modalId="logoutConfirmationModal"
      />
    </div>
  </template>
  
  <script>
import axios from 'axios';
  import Cookies from 'js-cookie';
  import ConfirmationModal from '@/components/Confirmation_modal_com.vue';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'Logout_btn_com',
    components: {
      ConfirmationModal,
    },
    data() {
      return {
        confirmationMessage: '',
      };
    },
    methods: {
    ...mapActions(['logout']), // Map Vuex logout action to component

    getUserData() {
      // Fetch the user data using the userID stored in cookies
      const userID = Cookies.get('userID');
      if (userID) {
        axios.get(`http://localhost:3000/api/account/${userID}`)
          .then(response => {
            const user = response.data[0];
            this.userImg = user.profileImg;
            this.username = user.username;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    },
      handleLogout() {
        this.showConfirmationModal('Log out from your account?');
      },
      showConfirmationModal(message) {
        this.confirmationMessage = message;
        const confirmationModal = new Modal(document.getElementById('logoutConfirmationModal'));
        confirmationModal.show();
      },
      handleConfirm() {
        // Remove the userID cookie
        Cookies.remove('userID');
        // Redirect to the landing page
        this.$router.push('/');
    
        // Hide the confirmation modal
        const confirmationModalElement = document.getElementById('logoutConfirmationModal');
        const confirmationModal = Modal.getInstance(confirmationModalElement);
        if (confirmationModal) {
          confirmationModal.hide();
        }
      }
    }
  };
  </script>
  
<style scoped>
/* Profile Image Styling */
.profile-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 3D shadow effect */
  transition: box-shadow 0.3s ease;
}

/* Hide the default dropdown arrow */
.dropdown-toggle::after {
  display: none;
}

.btn-transparent {
  background-color: transparent;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
}

.btn-transparent:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Slight white overlay on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Subtle shadow on hover */
}

/* Dropdown Menu Styling */
.dropdown-menu {
  background-color: #2c2f33; /* Dark theme background */
  min-width: 220px; /* Increased width for better readability */
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  text-align: center; /* Center all content */
  margin-left: 10px; /* Space on the left */
  z-index: 1000; /* Ensure dropdown appears on top */
}

/* Dropdown Item Text Styling */
.dropdown-item-text {
  font-size: 1.2rem;
  font-weight: bold;
  color:antiquewhite;
  margin-bottom: 1rem; /* Add space below username */
}

/* Dropdown Item Button Styling */
.dropdown-item {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Button Styling */
.acc_settings_btn {
  margin-top: 20px;
  background-color: #8197e4; 
}

.acc_settings_btn:hover {
  background-color: #afbdeb;
}

.logout_btn{
  background-color: #eb2a2a;
}

.logout_btn:hover{
  background-color: #f14949;
}

</style>
