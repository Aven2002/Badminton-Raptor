<template>
    <div>
      <button @click="addToFavorites" class="button">
        <i class="fa-solid fa-heart-circle-plus"></i> Like
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
.button {
  --bg: #5c5c5c;
  --hover-bg: #e26277;
  --hover-text: #000;
  color: #680000;
  cursor: pointer;
  border: 3px groove #e26277;
  border-radius: 10px;
  padding: 0.6em 1.0em;
  background: transparent;
  transition: 0.2s;
  font-size:16px;
}

.button:hover {
  color: var(--hover-text);
  transform: translate(-0.25rem, -0.25rem);
  background: var(--hover-bg);
  box-shadow: 0.25rem 0.25rem var(--bg);
}

.button:active {
  transform: translate(0);
  box-shadow: none;
}
  </style>
  