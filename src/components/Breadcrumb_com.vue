<template>
    <nav aria-label="breadcrumb" class="breadcrumb-custom mb-1">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="homeLink">Home</router-link>
        </li>
        <li
          v-for="(item, index) in breadcrumbItems"
          :key="index"
          class="breadcrumb-item"
        >
          <router-link v-if="item.link" :to="item.link">{{ item.text }}</router-link>
          <span v-else>{{ item.text }}</span>
        </li>
        <li v-if="currentItem" class="breadcrumb-item active" aria-current="page">
          {{ currentItem }}
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  export default {
    name: 'Breadcrumb_com',
    props: {
      breadcrumbItems: {
        type: Array,
        required: true,
      },
      currentItem: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isAdmin: false,
      };
    },
    computed: {
      homeLink() {
        return this.isAdmin ? '/Home_view_admin' : '/Home_view_user';
      },
    },
    methods: {
      async checkUserRole() {
        try {
          const userID = Cookies.get('userID');
          if (!userID) {
            console.warn('No userID found in cookies');
            this.isAdmin = false; // Default to non-admin if no userID
            return;
          }
  
          const response = await axios.get(
            `http://localhost:3000/api/account/${userID}/role`
          );
          this.isAdmin = response.data.userRole === 'Admin'; // Ensure this matches the role in your API
        } catch (error) {
          console.error('Error fetching user role:', error);
          this.isAdmin = false; // Default to non-admin in case of error
        }
      },
    },
    created() {
      this.checkUserRole(); // Fetch and set user role on component creation
    },
  };
  </script>
  
  <style scoped>
  .breadcrumb {
    background-color: transparent;
    font-size: 15px;
  }
  .breadcrumb-item a {
    color: #007bff;
  }
  .breadcrumb-item.active {
    color: #6c757d;
  }
  </style>
  