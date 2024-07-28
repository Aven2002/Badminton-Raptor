<template>
  <div>
    <button @click="addToFavorites" class="btn btn-transparent">
      <i class="fa-solid fa-star"></i> Favorites
    </button>

    <!-- Use ErrorModal component -->
    <ErrorModal :errorMessage="errorMessage" />

    <!-- Use SuccessModal component -->
    <SuccessModal :successMessage="successMessage" />
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import Cookies from 'js-cookie'; 

export default {
  components: {
    SuccessModal,
    ErrorModal
  },
  data() {
    return {
      successMessage: '',
      errorMessage: ''
    };
  },
  props: {
    equipID: {
      type: Number,
      required: true
    }
  },
  methods: {
    async addToFavorites() {
      const userID = Cookies.get('userID'); // Retrieve userID from cookies
      if (!userID) {
        this.showErrorModal('User not logged in. Please log in to add to favorites.');
        return;
      }

      const favorite = {
        userID: userID,
        equipID: this.equipID
      };

      try {
        const checkResponse = await axios.get('http://localhost:3000/api/favorite/check', {
          params: favorite
        });
        
        if (checkResponse.data.isFavorite) {
          this.showErrorModal('Equipment already exists in favorite list.');
          return;
        }

        const response = await axios.post('http://localhost:3000/api/favorite', favorite);
        if (response.data && response.data.id) {
          this.showSuccessModal('Equipment added to your favorite list!');
        } else {
          this.showErrorModal('An error occurred while adding the equipment. Please try again later.');
        }
      } catch (error) {
        this.showErrorModal('An error occurred while adding the equipment. Please try again later.');
      }
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
      successModal._element.addEventListener('hidden.bs.modal', this.resetForm);
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
      errorModal._element.addEventListener('hidden.bs.modal', this.resetForm);
    },
    resetForm() {
      this.successMessage = '';
      this.errorMessage = '';
    }
  }
}
</script>


<style scoped>
.btn-transparent {
  background-color: transparent;
  color: #007bff; /* Primary color text */
  border: 1px solid #007bff; /* Primary color border */
  border-radius: 5px; /* Rounded corners */
  font-size: 14px; /* Adjust font size */
  padding: 8px 16px; /* Adjust padding */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.btn-transparent:hover {
  background-color: rgba(0, 123, 255, 0.1); /* Light blue background on hover */
  color: #0056b3; /* Darker blue text on hover */
  border-color: #0056b3; /* Darker blue border on hover */
}
</style>
