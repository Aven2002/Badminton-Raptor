<template>
    <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="feedbackModalLabel">Feedback ID: {{ feedback?.feedbackID }}</h5>
          </div>
          <div class="modal-body">
            <p><strong>Email:</strong> {{ feedback?.email }}</p>
            <p><strong>Contact Number:</strong> {{ feedback?.contactNum }}</p>
            <p><strong>Feedback content:</strong></p>
            <p>{{ feedback?.feedbackContent }}</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Okay</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'FeedbackModal',
    props: {
      feedback: {
        type: Object,
        default: null
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-content {
    background-color: #2c2f33;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
  }
  
  .modal-header .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
  }
  
  .modal-header .btn-close {
    filter: brightness(0) invert(1);
  }
  
  .modal-body p {
    margin-bottom: 1rem;
    line-height: 1.6;
    text-align: left;
    color: #cccccc;
  }
  
  .modal-footer {
    display: flex;
    justify-content: center;
    border-top: none;
  }
  
  .btn-primary {
    background-color: #7289da;
    border-color: #7289da;
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background-color: #5b6eae;
    border-color: #5b6eae;
  }
  </style>
  


  