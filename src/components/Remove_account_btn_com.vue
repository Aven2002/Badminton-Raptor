<template>
    <div>
      <button @click="confirmRemove" class="custom-button-danger">
        <i class="fa-solid fa-trash-can"></i>
        <span class="button-text">Remove</span>
      </button>
      <ConfirmationModal
      :confirmationMessage="confirmationMessage"
      :modalId="modalId"
      @confirm="handleConfirm"
      @abort="handleAbort"
    />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  import ConfirmationModal from '@/components/Confirmation_modal_com.vue';
  
  export default {
    name: 'RemoveButton',
    components: {
      ConfirmationModal
    },
    props: {
      userID: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        confirmationMessage: `Confirm to delete account - User ID: ${this.userID} ?`,
        itemToRemove: null,
        modalId: `confirmationModal-${this.userID}` 
      };
    },
    methods: {
      confirmRemove() {
        this.itemToRemove = this.userID;
        this.showConfirmationModal(this.confirmationMessage);
      },
      async handleConfirm() {
        if (this.itemToRemove) {
          await this.removeAccount(this.itemToRemove);
          this.itemToRemove = null;
        }
      },
      async removeAccount(userID) {
        try {
          await axios.delete(`http://localhost:3000/api/account/${userID}`);
          this.$emit('item-removed', userID);
        } catch (error) {
          console.error('Error removing account:', error);  
          this.$emit('error', 'An error occurred while removing the account. Please try again later.');
        }
      },
      async handleAbort() {
          this.itemToRemove = null;
      },
      showConfirmationModal(message) {
        this.confirmationMessage = message;
        const confirmationModal = new Modal(document.getElementById(this.modalId));
        confirmationModal.show();
      }
    }
  };
  </script>
  
  