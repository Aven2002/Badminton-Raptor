<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent justify-content-center">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="item in navItems" :key="item.view" class="nav-item" :class="{ active: currentView === item.view }">
              <router-link class="nav-link" :to="{ name: item.routeName }" @click="navigate(item.view)">
                <i :class="item.icon"></i> {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar_crud_com',
    props: {
      navItems: {
        type: Array,
        required: true
      },
      defaultView: {
        type: String,
        default: 'View'
      }
    },
    data() {
      return {
        currentView: this.defaultView 
      };
    },
    methods: {
      navigate(view) {
        this.currentView = view;
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    font-size: 12px; /* Smaller font size */
    font-weight: 800;
    background-color: transparent;
    border-radius: 30px; /* Smaller border radius */
    max-width: 600px; /* Reduced max width */
    border: solid #23a7be 2px;
    margin-bottom: 15px; /* Reduced margin */
  }
  
  .nav-item {
    cursor: pointer;
    padding: 0.3rem 0.6rem; /* Reduced padding */
    transition: background-color 0.3s, color 0.3s;
    border-radius: 30px; /* Smaller border radius */
    margin-right: 0.3rem; /* Reduced margin */
    align-items: center;
  }
  
  .nav-item .nav-link {
    display: flex;
    align-items: center;
  }
  
  .nav-item .nav-link i {
    margin-right: 0.2rem; /* Reduced margin */
  }
  
  .nav-item:hover {
    background-color: #71d2e3;
    color: white;
    border-radius: 30px;
  }
  
  .nav-item.active {
    background-color: #71d2e3;
    color: white;
    border-radius: 30px;
  }
  
  .nav-item:not(.active) {
    background-color: transparent;
    color: black;
  }
  
  .nav-item:not(.active):hover {
    background-color: lightgray;
    color: black;
    border-radius: 30px;
  }
  </style>
  