<template>
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img src='@/assets/Icon/Database_Success_Icon.png' alt="Success Icon" class="img-fluid my-3" />
            <p>{{ successMessage }}</p>
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
    name: 'SuccessModal',
    props: {
      successMessage: {
        type: String,
        required: true
      }
    }
  }
  </script>

  <style scoped>
  .modal-title {
    color: #26b602; /* White title color */
  }
  
  .img-fluid {
    max-width: 30%;
    max-height:30%;
  }
  </style>
  
  