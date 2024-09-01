<template>
    <div class="modal fade" id="equipmentDetailsModal" tabindex="-1" aria-labelledby="equipmentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="equipmentModalLabel">Equipment Details</h5>
          </div>
          <div class="modal-body">
            <p><strong>Equipment ID:</strong> {{ equipment?.equipID }}</p>
            <p><strong>Name:</strong> {{ equipment?.equipName }}</p>
            <p><strong>Category:</strong> {{ equipment?.equipCategory }}</p>
            <p><strong>Brand:</strong> {{ equipment?.equipBrand }}</p>
            <p><strong>Price:</strong> RM {{ parseFloat(equipment?.equipPrice).toFixed(2) }}</p>
            <p><strong>Created At:</strong> {{ new Date(equipment?.created_at).toLocaleString() }}</p>
  
            <div v-if="showAdditionalDetails">
              <!-- Additional fields based on category -->
              <div v-if="equipment?.equipCategory === 'Racquet'">
                <p><strong>Flex:</strong> {{ equipment?.details?.flex }}</p>
                <p><strong>Frame:</strong> {{ equipment?.details?.frame }}</p>
                <p><strong>Shaft:</strong> {{ equipment?.details?.shaft }}</p>
                <p><strong>Joint:</strong> {{ equipment?.details?.joint }}</p>
                <p><strong>Length:</strong> {{ equipment?.details?.length }}</p>
                <p><strong>Weight:</strong> {{ equipment?.details?.weight }}</p>
                <p><strong>String Advice:</strong> {{ equipment?.details?.stringAdvice }}</p>
                <p><strong>Color:</strong> {{ equipment?.details?.color }}</p>
                <p><strong>Made In:</strong> {{ equipment?.details?.madeIn }}</p>
              </div>
              <div v-else-if="equipment?.equipCategory === 'Shuttlecock'">
                <p><strong>Quantity Per Tube:</strong> {{ equipment?.details?.quantityPerTube }}</p>
                <p><strong>Description:</strong> {{ equipment?.details?.description }}</p>
              </div>
              <div v-else-if="equipment?.equipCategory === 'Bags'">
                <p><strong>Color:</strong> {{ equipment?.details?.color }}</p>
                <p><strong>Size:</strong> {{ equipment?.details?.size }}</p>
                <p><strong>Description:</strong> {{ equipment?.details?.description }}</p>
              </div>
              <div v-else-if="equipment?.equipCategory === 'Footwear'">
                <p><strong>Color:</strong> {{ equipment?.details?.color }}</p>
                <p><strong>Upper:</strong> {{ equipment?.details?.upper }}</p>
                <p><strong>Midsole:</strong> {{ equipment?.details?.midsole }}</p>
                <p><strong>Outsole:</strong> {{ equipment?.details?.outsole }}</p>
                <p><strong>Description:</strong> {{ equipment?.details?.description }}</p>
              </div>
              <div v-else-if="equipment?.equipCategory === 'Apparel'">
                <p><strong>Color:</strong> {{ equipment?.details?.color }}</p>
                <p><strong>Material:</strong> {{ equipment?.details?.material }}</p>
              </div>
              <div v-else-if="equipment?.equipCategory === 'Accessories'">
                <p><strong>Description:</strong> {{ equipment?.details?.description }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-secondary mt-3 mb-3" @click="toggleDetails">
                <i class="fa-solid fa-compress"></i> Additional Details
            </button>
            <button type="button" class="custom-button-danger" data-bs-dismiss="modal" @click="closeToggleDetails">Close</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EquipmentDetailsModal',
    props: {
      equipment: {
        type: Object,
        default: null
      },
      showModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showAdditionalDetails: false
      };
    },
    methods: {
      toggleDetails() {
        this.showAdditionalDetails = !this.showAdditionalDetails;
      },
      closeToggleDetails(){
        this.showAdditionalDetails = false;
      }
    }
  };
  </script>
  
  
  <style scoped>
  .btn-secondary {
    background-color: transparent;
    color: #fff;
    border: 1px solid #007bff;
    border-radius: 0.25rem;
  }
  
  .btn-secondary:hover {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border-color: #007bff;
  }
  </style>
  