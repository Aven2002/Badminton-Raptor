<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="emitSearch"
        placeholder="Search by equipment name"
        class="form-control search-input"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      emitSearch() {
        this.$emit('search', this.searchQuery);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    width: 50%;
  }
  
  .search-input {
    width: 100%;
    background-color: #1e1e1e; /* Black background */
    border: 1px solid #444; /* Dark border */
    color: #fff; /* White text */
  }
  
  .search-input::placeholder {
    color: #bbb; /* Light gray placeholder text */
  }
  
  .search-input:focus {
    background-color: #2c2c2c;
    border-color: #555555;
    box-shadow: none;
    color: white;
  }
  </style>
  