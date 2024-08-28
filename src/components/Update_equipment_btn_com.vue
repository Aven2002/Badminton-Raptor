<template>
    <div>
      <button  class="custom-button-success mt-2">
        <i class="fa-solid fa-pen"></i>
        <span class="button-text">UPDATE</span>
      </button>
    </div>
  </template>
  
 
  
  <style scoped>
  .btn-update {
    background-color: #42f566;
    border: none;
    color: #1e5c1f;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 90px; 
    border-radius:10px;
  }
  
  .btn-update:hover {
    background-color: #7cde9a;
    border: solid #1e5c1f 1px;
  }
  
  .btn-update:focus,
  .btn-update:active {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5);
  }
  </style>
  