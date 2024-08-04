<template>
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img src='@/assets/Icon/Database_Error_Icon.png' alt="Error Icon" class="img-fluid my-3" />
            <p>{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorModal',
    props: {
      errorMessage: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-content {
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    background-color: #ed2431;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .modal-footer {
    background-color: #f8f9fa;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  
  .btn-close {
    filter: invert(1);
  }
  
  .modal-body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #495057;
  }
  
  .modal-body p {
    margin: 20px 0;
    font-size: 1.1rem;
  }
  
  .btn-secondary {
    background-color: #343a40;
    border-color: #343a40;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #495057;
    border-color: #495057;
  }
  
  .img-fluid {
    max-width: 150px;
  }
  
  #errorModalLabel{
    font-weight: bold;
    font-size: 21px;
  }
  </style>
  