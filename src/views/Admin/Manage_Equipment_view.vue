<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/manage_equipment_view/create_equipment_com">Create </router-link></li>
        <li><router-link to="/manage_equipment_view/view_equipment_com">View </router-link></li>
        <li><router-link to="/manage_equipment_view/update_equipment_com">Update </router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Manage_Equipment_view',
  components: {
  },
  data() {
    return {
      currentView: 'View',
      navItems: [
        { view: 'View', label: 'View', icon: 'fa-solid fa-eye', routeName: 'view_equipment_com' },
        { view: 'Add', label: 'Create', icon: 'fa-solid fa-circle-plus', routeName: 'create_equipment_com' },
        { view: 'Update', label: 'Update', icon: 'fa-solid fa-pen', routeName: 'update_equipment_com' }
      ]
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
