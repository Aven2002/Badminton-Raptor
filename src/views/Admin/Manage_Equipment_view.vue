<template>
  <div class="container">
    <Navbar_CRUD_com class="navbar-crud" :navItems="navItems" :basePath="'/manage_equipment_view'" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar_CRUD_com from '@/components/Navbar_CRUD_com.vue';

export default {
  name: 'Manage_Equipment_view',
  components: {
    Navbar_CRUD_com
  },
  data() {
    return {
      navItems: [
        { view: 'Home', label: 'Home', icon: 'fa-solid fa-home', routeName: 'home_view_admin' },
        { view: 'View', label: 'View', icon: 'fa-solid fa-eye', routeName: 'view_equipment_com' },
        { view: 'Add', label: 'Create', icon: 'fa-solid fa-circle-plus', routeName: 'create_equipment_com' },
        { view: 'Update', label: 'Update', icon: 'fa-solid fa-pen', routeName: 'update_equipment_com' }
      ]
    };
  }
};
</script>

<style scoped>
.navbar-crud {
  position: absolute;
}

/* Media query for small screens */
@media (max-width: 768px) {
  .navbar-crud {
    position: relative;
    border:none;
  }
}

.content {
  margin-top: 30px; 
}


</style>
