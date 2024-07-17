<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img :src="logo" alt="Logo" class="logo">
          <span class="ms-2">{{ title }}</span>
        </router-link>
        <button class="navbar-toggler" type="button" @click="toggleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ show: isNavbarCollapsed }">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/Home_view" class="nav-link" @click="toggleNavbar">Home</router-link>
            </li>
            <li class="nav-item dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">
              <router-link to="/Browse_Equipment_view" class="nav-link dropdown-toggle" @click="toggleNavbar">Equipment</router-link>
              <ul class="dropdown-menu" :class="{ show: isDropdownVisible }">
                <li>
                  <router-link to="/Browse_Equipment_view?filter=racket" class="dropdown-item" @click="toggleNavbar">Rackets</router-link>
                </li>
                <li>
                  <router-link to="/Browse_Equipment_view?filter=shuttlecock" class="dropdown-item" @click="toggleNavbar">Shuttlecocks</router-link>
                </li>
                <!-- Add more items here -->
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/Contact_Us_view" class="nav-link" @click="toggleNavbar">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar_com",
    data() {
      return {
        title: "Badminton Raptor",
        logo: require("../assets/logo.png"),
        isNavbarCollapsed: false,
        isDropdownVisible: false,
      };
    },
    methods: {
      toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
      },
      showDropdown() {
        this.isDropdownVisible = true;
      },
      hideDropdown() {
        this.isDropdownVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .navbar-nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  @media (min-width: 992px) {
    .navbar-nav {
      flex-direction: row;
      align-items: center;
    }
  }
  
  .dropdown-menu {
    display: none;
  }
  
  .dropdown-menu.show {
    display: block;
  }
  
  .navbar-nav .nav-link {
    color: #ffffff;
    transition: color 0.3s;
  }
  
  .navbar-nav .nav-link:hover {
    color: #f8f9fa;
  }
  
  .navbar-nav .dropdown-menu .dropdown-item {
    color: #000000;
  }
  
  .navbar-nav .dropdown-menu .dropdown-item:hover {
    background-color: #f8f9fa;
    color: #000000;
  }
  </style>
  