<template>
  <div>
    <button @click="confirmRemove" class="btn btn-danger mt-2">
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
    favoriteID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      confirmationMessage: '',
      itemToRemove: null,
      modalId: `confirmationModal-${this.favoriteID}` // Unique ID for each modal
    };
  },
  methods: {
    confirmRemove() {
      this.itemToRemove = this.favoriteID;
      this.confirmationMessage = `Confirm to remove this equipment from your favorite list?`;
      this.showConfirmationModal();
    },
    async handleConfirm() {
      if (this.itemToRemove) {
        await this.removeFromFavorites(this.itemToRemove);
        this.itemToRemove = null;
      }
    },
    async handleAbort() {
      this.itemToRemove = null;
    },
    async removeFromFavorites(favoriteID) {
      try {
        await axios.delete(`http://localhost:3000/api/favorite/${favoriteID}`);
        this.$emit('item-removed', favoriteID);
      } catch (error) {
        console.error('Error removing favorite:', error); // Debug log
        this.$emit('error', 'An error occurred while removing the equipment. Please try again later.');
      }
    },
    showConfirmationModal() {
      const confirmationModal = new Modal(document.getElementById(this.modalId));
      confirmationModal.show();
    }
  }
};
</script>
