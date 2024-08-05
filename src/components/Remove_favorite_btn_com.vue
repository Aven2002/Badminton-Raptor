<template>
  <div>
    <button @click="confirmRemove" class="btn btn-danger mt-2">
      Remove
    </button>
    <ConfirmationModal
      :confirmationMessage="confirmationMessage"
      @confirm="handleConfirm"
      modalId="favoriteListConfirmationModal"
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
      itemToRemove: null
    };
  },
  methods: {
    confirmRemove() {
      this.itemToRemove = this.favoriteID;
      this.confirmationMessage = `Are you sure you want to remove the item with ID ${this.favoriteID} from your favorite list?`;
      this.showConfirmationModal(this.confirmationMessage);
    },
    async handleConfirm() {
      if (this.itemToRemove) {
        console.log(`Removing item with ID: ${this.itemToRemove}`); // Debug log
        await this.removeFromFavorites(this.itemToRemove);
        this.itemToRemove = null;
      }
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
  width: 90px;
}

.btn-danger:hover {
  background-color: #db4957;
  border: solid black 1px;
}

.btn-danger:focus,
.btn-danger:active {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5);
}
</style>
