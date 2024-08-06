<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent justify-content-center">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="item in navItems" :key="item.view" class="nav-item" :class="{ active: isActive(item.routeName) }">
            <router-link class="nav-link" :to="getLink(item)" @click="navigate(item.view)">
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
  name: 'Navbar_CRUD_com',
  props: {
    navItems: {
      type: Array,
      required: true
    },
    basePath: {
      type: String,
      required: false // Make basePath optional
    }
  },
  data() {
    return {
      currentView: this.defaultView
    };
  },
  watch: {
    '$route.path': function(newPath) {
      this.currentView = newPath.split('/').pop(); // Update current view on route change
    }
  },
  methods: {
    navigate(view) {
      this.currentView = view;
    },
    getLink(item) {
      if (item.routeName === 'home_view_admin') {
        return `/${item.routeName}`; // Special case for 'Home'
      }
      return `${this.basePath}/${item.routeName}`;
    },
    isActive(routeName) {
      return this.$route.path.includes(routeName);
    }
  }
};
</script>

<style scoped>
  .navbar {
    font-size: 12px;
    font-weight: 800;
    background-color: transparent;
    border-radius: 30px;
    max-width: 450px;
    border: solid #23a7be 2px;
    margin-bottom: 15px;
  }
  
  .nav-item {
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 30px;
    margin-right: 0.3rem;
    align-items: center;
  }
  
  .nav-item .nav-link {
    display: flex;
    align-items: center;
  }
  
  .nav-item .nav-link i {
    margin-right: 0.2rem;
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
