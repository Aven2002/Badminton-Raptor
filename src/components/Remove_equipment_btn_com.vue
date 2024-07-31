<template>
    <div>
      <button @click="confirmRemove" class="btn btn-danger mt-2" >
        Remove
      </button>
      <ConfirmationModal :confirmationMessage="confirmationMessage" @confirm="handleConfirm" modalId="equipmentRemoveConfirmationModal" />
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
      equipID: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        confirmationMessage: 'Are you sure you want to remove equipment ID ${equipID} from database ?',
        itemToRemove: null
      };
    },
    methods: {
      confirmRemove() {
        this.itemToRemove = this.equipID;
        this.showConfirmationModal(this.confirmationMessage);
      },
      async handleConfirm() {
        if (this.itemToRemove) {
          await this.removeEquipment(this.itemToRemove);
          this.itemToRemove = null;
        }
      },
      async removeEquipment(equipID) {
        try {
          await axios.delete(`http://localhost:3000/api/equipment/${equipID}`);
          this.$emit('item-removed', equipID);
        } catch (error) {
          console.error('Error removing equipment:', error);  // Debug log
          this.$emit('error', 'An error occurred while removing the equipment. Please try again later.');
        }
      },
      showConfirmationModal(message) {
        this.confirmationMessage = message;
        const confirmationModal = new Modal(document.getElementById('equipmentRemoveConfirmationModal'));
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
  