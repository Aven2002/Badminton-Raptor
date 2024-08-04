<template>
    <div>
      <nav>
        <ul>
          <router-link to="/manage_recommendation_view/view_recommendation_com">Recommendation</router-link>
        </ul>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Manage_Recommendation_view',
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  