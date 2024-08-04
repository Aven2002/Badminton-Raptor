<template>
    <div>
      <nav>
        <ul>
          <li><router-link to="/manage_account_view/view_account_com">View Account</router-link></li>
          <li><router-link to="/manage_account_view/update_account_com">Update Account</router-link></li>
        </ul>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Manage_Account_view'
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  