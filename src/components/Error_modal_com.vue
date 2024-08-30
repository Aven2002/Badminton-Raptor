<template>
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
          </div>
          <div class="modal-body text-center">
            <img src='@/assets/Icon/Database_Error_Icon.png' alt="Error Icon" class="img-fluid my-3" />
            <p>{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="custom-button-danger" data-bs-dismiss="modal">Close</button>
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
  .modal-title {
    color: #cc0425; /* White title color */
  }
  
  .img-fluid {
    max-width: 30%;
    max-height:30%;
  }
  </style>
  