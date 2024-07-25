<template>
    <button @click="addToFavorites" class="btn btn-transparent">
      <i class="fa-solid fa-star"></i> Favorites
    </button>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      equipID: {
        type: Number,
        required: true
      }
    },
    methods: {
      async addToFavorites() {
        const favorite = {
          userID: 1, // Replace with dynamic user ID if applicable
          equipID: this.equipID
        };
        try {
          await axios.post('http://localhost:3000/api/favorite', favorite);
          alert('Added to favorites');
        } catch (error) {
          console.error('Error adding to favorites:', error);
          alert('Failed to add to favorites');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .btn-transparent {
    background-color: transparent;
    color: #007bff; /* Primary color text */
    border: 1px solid #007bff; /* Primary color border */
    border-radius: 5px; /* Rounded corners */
    font-size: 14px; /* Adjust font size */
    padding: 8px 16px; /* Adjust padding */
    transition: background-color 0.3s, color 0.3s; /* Smooth transition */
  }
  
  .btn-transparent:hover {
    background-color: rgba(0, 123, 255, 0.1); /* Light blue background on hover */
    color: #0056b3; /* Darker blue text on hover */
    border-color: #0056b3; /* Darker blue border on hover */
  }
  </style>
  