<template>
  <div>
    <button @click="confirmRemove" class="custom-button-danger mt-2">
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
      equipID: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        confirmationMessage: `Remove equipment ID ${this.equipID} from database?`,
        itemToRemove: null,
        modalId: `confirmationModal-${this.equipID}` 
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


