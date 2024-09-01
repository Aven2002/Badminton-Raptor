<template>
    <div class="modal fade" id="feedbackDetailsModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="feedbackModalLabel">Feedback Details </h5>
          </div>
          <div class="modal-body">
            <p><strong>Feedback ID:</strong> {{ feedback?.feedbackID  }}</p>
            <p><strong>Email:</strong> {{ feedback?.email }}</p>
            <p><strong>Contact Number:</strong> {{ feedback?.contactNum }}</p>
            <p><strong>Feedback content:</strong></p>
            <p>{{ feedback?.feedbackContent }}</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="custom-button-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'feedbackDetailsModal',
    props: {
      feedback: {
        type: Object,
        default: null
      },
      showModal: {
       type: Boolean,
       default: false
     }
    }
  };
  </script>
  


  