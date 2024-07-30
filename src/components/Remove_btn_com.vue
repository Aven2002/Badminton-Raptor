<template>
    <div>
      <button @click="confirmRemove" class="btn btn-danger">
        <i class="fa-solid fa-cloud-arrow-down"></i>
        Remove
      </button>
      <ConfirmationModal :confirmationMessage="confirmationMessage" @confirm="handleConfirm" modalId="favoriteListConfirmationModal" />
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
      favoriteID: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        confirmationMessage: 'Are you sure you want to remove it from your favorite list?',
        itemToRemove: null
      };
    },
    methods: {
      confirmRemove() {
        this.itemToRemove = this.favoriteID;
        this.showConfirmationModal(this.confirmationMessage);
      },
      async handleConfirm() {
        if (this.itemToRemove) {
          await this.removeFromFavorites(this.itemToRemove);
          this.itemToRemove = null;
        }
      },
      async removeFromFavorites(favoriteID) {
        try {
          await axios.delete(`http://localhost:3000/api/favorite/${favoriteID}`);
          this.$emit('item-removed', favoriteID);
        } catch (error) {
          console.error('Error removing favorite:', error);  // Debug log
          this.$emit('error', 'An error occurred while removing the equipment. Please try again later.');
        }
      },
      showConfirmationModal(message) {
        this.confirmationMessage = message;
        const confirmationModal = new Modal(document.getElementById('favoriteListConfirmationModal'));
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
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  
  .btn-danger:focus,
  .btn-danger:active {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5);
  }
  </style>
  