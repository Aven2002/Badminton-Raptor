<template>
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/Home_view">Home</a></li>
        <li class="breadcrumb-item"><a href="/Browse_Equipment_view">Equipment</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{ equipName }}</li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      equipName: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .breadcrumb {
    background-color: transparent;
  }
  .breadcrumb-item a {
    color: #007bff;
  }
  .breadcrumb-item.active {
    color: #6c757d;
  }
  </style>
  