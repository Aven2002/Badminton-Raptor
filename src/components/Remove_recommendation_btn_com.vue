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
      recommendationID: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        confirmationMessage: `Confirm to delete recommendation - Recommendation ID: ${this.recommendationID} ?`,
        itemToRemove: null,
        modalId: `confirmationModal-${this.recommendationID}`
      };
    },
    methods: {
      confirmRemove() {
        this.itemToRemove = this.recommendationID;
        this.showConfirmationModal(this.confirmationMessage);
      },
      async handleConfirm() {
        if (this.itemToRemove) {
          await this.removeFromRecommendation(this.itemToRemove);
          this.itemToRemove = null;
        }
      },
      async removeFromRecommendation(recommendationID) {
        try {
          await axios.delete(`http://localhost:3000/api/recommendation/${recommendationID}`);
          this.$emit('item-removed', recommendationID);
        } catch (error) {
          console.error('Error removing recommendation:', error);  
          this.$emit('error', 'An error occurred while removing the recommendation. Please try again later.');
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
  