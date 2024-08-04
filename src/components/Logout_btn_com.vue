<template>
    <div>
      <button class="btn btn-danger" @click="handleLogout">
        Logout
      </button>
      <!-- Modal -->
      <ConfirmationModal
        :confirmationMessage="confirmationMessage"
        @confirm="handleConfirm"
        modalId="logoutConfirmationModal"
      />
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  import ConfirmationModal from '@/components/Confirmation_modal_com.vue';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'Logout_btn_com',
    components: {
      ConfirmationModal,
    },
    data() {
      return {
        confirmationMessage: '',
      };
    },
    methods: {
      handleLogout() {
        this.showConfirmationModal('Log out from your account?');
      },
      showConfirmationModal(message) {
        this.confirmationMessage = message;
        const confirmationModal = new Modal(document.getElementById('logoutConfirmationModal'));
        confirmationModal.show();
      },
      handleConfirm() {
        // Remove the userID cookie
        Cookies.remove('userID');
        // Redirect to the landing page
        this.$router.push('/');
    
        // Hide the confirmation modal
        const confirmationModalElement = document.getElementById('logoutConfirmationModal');
        const confirmationModal = Modal.getInstance(confirmationModalElement);
        if (confirmationModal) {
          confirmationModal.hide();
        }
      }
    }
  };
  </script>
  