<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Action Confirmation</h5>
          </div>
          <div class="modal-body text-center">
            <img src='@/assets/Icon/Question_Mark_Icon.png' alt="Question Mark Icon" class="img-fluid my-3" />
            <p>{{ confirmationMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="custom-button-danger" data-bs-dismiss="modal" @click="abortProcess">Cancel</button>
            <button type="button" class="custom-button-success" data-bs-dismiss="modal" @click="$emit('confirm')">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmationModal',
    props: {
      confirmationMessage: {
        type: String,
        required: true
      },
      modalId: {
        type: String,
        required: true
      }
    },
    methods: {
      abortProcess() {
        this.$emit('abort');
      },
      continueProcess() {
        this.$emit('confirm');
      }
    }
  };
  </script>

  <style scoped>
  .modal-title {
    color: #d0ee4b; 
  }
  
  .img-fluid {
    max-width: 30%;
    max-height:30%;
  }
  </style>
  