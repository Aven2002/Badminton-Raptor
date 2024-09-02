<template>
    <div class="container-fluid forbidden-container">
      <div class="row justify-content-center align-items-center mt-5">
        <!-- Left side with the image -->
        <div class="col-md-4 p-0">
          <img src="@/assets/Icon/Mage.png" alt="Mage Icon" class="img-fluid">
        </div>
  
        <!-- Right side with the text -->
        <div class="col-md-8 text-center text-light p-5">
          <!-- First row -->
          <h1 class="display-3 fw-bold text-dark-blue">YOU SHALL NOT PASS!</h1>
  
          <!-- Second row -->
          <h2 class="display-1 text-orange fw-bold">403</h2>
  
          <!-- Third row -->
          <p class="lead mt-4 text-light-blue">We are sorry, but you do not have access to this page or resource.</p>
  
          <!-- Back button -->
          <button @click="goBack" class="btn btn-info mt-5 custom-back-button"> Go Back</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ForbiddenView',
    methods: {
      goBack() {
        this.$router.back(); // This method navigates back in history
      }
    }
  }
  </script>
  
  <style scoped>
  /* Dark blue color for h1 and p */
  .text-dark-blue {
    color: #00274d;
  }
  
  /* Orange color for h2 */
  .text-orange {
    color: #ff8c00;
  }
  
  /* Lighter blue color for p */
  .text-light-blue {
    color: #00509e;
    font-weight:600;
    font-size:20px;
  }
  
  /* Image cover settings */
  .img-fluid {
    object-fit: cover;
    height: 70%;
    width: 70%;
  }
  
  /* Adjust lead paragraph size */
  p.lead {
    font-size: 1.25rem;
  }
  
.custom-back-button {
  border-radius: 10px; 
  padding: 0.75rem 2rem;
  font-size: 1.125rem; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s; 
}

.custom-back-button:hover {
  background-color: #537497; 
  color: #ffffff; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
}


  </style>
  