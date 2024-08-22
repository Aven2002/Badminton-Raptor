<template>
    <div>
      <button @click="confirmRemove" class="btn btn-danger mt-2" >
        Remove
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
        confirmationMessage: `Confirm to delete Recommendation ID: ${this.recommendationID} ?`,
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
  
  <style scoped>
  .btn-danger {
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 90px; 
  }
  
  .btn-danger:hover {
    background-color: #db4957;
    border : solid black 1px;
  }
  
  .btn-danger:focus,
  .btn-danger:active {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5);
  }
  </style>
  