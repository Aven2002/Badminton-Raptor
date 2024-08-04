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
            <router-link :to="homeLink" class="nav-link" @click="toggleNavbar">Home</router-link>
          </li>
          <li class="nav-item dropdown" @mouseover="showDropdown" @mouseleave="hideDropdown">
            <router-link to="/browse_equipment_view" class="nav-link dropdown-toggle" @click="toggleNavbar">Equipment</router-link>
            <ul class="dropdown-menu" :class="{ show: isDropdownVisible }">
              <li v-for="category in categories" :key="category">
                <router-link :to="`/browse_equipment_view?filter=${category}`" class="dropdown-item" @click="toggleNavbar">{{ category }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!isAdmin">
            <router-link to="/contact_us_view" class="nav-link" @click="toggleNavbar">Contact Us</router-link>
          </li>
        </ul>
        <LogoutButton />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import LogoutButton from '@/components/Logout_btn_com.vue';
import axios from 'axios';

export default {
  name: "Navbar_view_com",
  components: {
    LogoutButton
  },
  data() {
    return {
      title: "Badminton Raptor",
      logo: require("@/assets/Icon/ComLogo.png"),
      isNavbarCollapsed: false,
      isDropdownVisible: false,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
    homeLink() {
      return this.isAdmin ? '/home_view_admin' : '/home_view_user';
    }
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
    fetchEquipment() {
      axios.get('http://localhost:3000/api/equipment')
        .then(response => {
          const equipment = response.data;
          const categoriesSet = new Set(equipment.map(item => item.equipCategory));
          this.categories = Array.from(categoriesSet);
        })
        .catch(error => {
          console.error('Error fetching equipment:', error);
        });
    }
  },
  created() {
    this.fetchEquipment();
  }
};
</script>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
  color: #f8f9fa;
  font-size: 1.25rem;
  font-weight: bold;
}

.logo {
  width: 40px;
  height: 40px;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

@media (min-width: 992px) {
  .navbar-nav {
    flex-direction: row;
    align-items: center;
  }
}

.navbar-nav .nav-item {
  margin-left: 1rem;
}

.navbar-nav .nav-link {
  color: #f8f9fa;
  transition: color 0.3s, background-color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.navbar-nav .nav-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-nav .dropdown-menu {
  background-color: #343a40;
  border: none;
  border-radius: 0.25rem;
}

.navbar-nav .dropdown-item {
  color: #ffffff;
  transition: background-color 0.3s, color 0.3s;
}

.navbar-nav .dropdown-item:hover {
  background-color: #495057;
  color: #ffffff;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  filter: brightness(0.8);
}
</style>
