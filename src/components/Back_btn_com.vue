<template>
    <div>
      <button @click="goBack" class="btn btn-transparent mb-3 align-self-start">
        Back <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  
  <style scoped>
  .btn-transparent {
    background-color: transparent;
    color: #007bff;
    border: none;
  }
  
  .btn-transparent:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  </style>
  