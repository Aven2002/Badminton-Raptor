<template>
    <div class="modal fade" id="recommendationModal" tabindex="-1" aria-labelledby="recommendationModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="recommendationModalLabel">Recommendation ID: {{ recommendation?.recommendationID }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ recommendation?.recommendationContent }}</p>
            <div v-if="equipmentDetails.length">
              <div v-for="equipment in equipmentDetails" :key="equipment.equipID" class="equipment-item">
                <img :src="`/images/${equipment.equipImgPath}`" alt="Equipment Image" class="img-fluid">
                <p><strong>{{ equipment.equipName }}</strong></p>
              </div>
            </div>
            <div v-else>
              <p>No equipment details available.</p>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Okay</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RecommendationModal',
    props: {
      recommendation: {
        type: Object,
        default: null
      }
    },
    data() {
    return {
      equipmentDetails: [] // Initialize as an empty array
    };
  },
    methods: {
      async fetchEquipmentDetails(equipIDs) {
        this.equipmentDetails = [];
        for (const equipID of equipIDs) {
          try {
            const response = await axios.get(`http://localhost:3000/api/equipment/${equipID}/details`);
            this.equipmentDetails.push(response.data.equipment);
          } catch (error) {
            console.error(`Error fetching equipment details for ID ${equipID}:`, error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-content {
    background-color: #2c2f33;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
  }
  
  .modal-header .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
  }
  
  .modal-header .btn-close {
    filter: brightness(0) invert(1);
  }
  
  .modal-body p {
    margin-bottom: 1rem;
    line-height: 1.6;
    text-align: left;
    color: #cccccc;
  }
  
  .modal-footer {
    display: flex;
    justify-content: center;
    border-top: none;
  }
  
  .btn-secondary {
    background-color: #7289da;
    border-color: #7289da;
    color: #ffffff;
  }
  
  .btn-secondary:hover {
    background-color: #5b6eae;
    border-color: #5b6eae;
  }
  
  .equipment-item {
    margin-bottom: 1rem;
  }
  
  .equipment-item img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .equipment-item p {
    margin: 0;
    text-align: center;
    font-size: 1rem;
    color: #ffffff;
  }
  </style>
  