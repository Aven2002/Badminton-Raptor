<template>
   <div class="modal fade" id="recommendationModal" tabindex="-1" aria-labelledby="recommendationModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="recommendationModalLabel">Recommendation Details</h5>
        </div>
        <div class="modal-body">
          <p><strong>Recommendation ID:</strong> {{ recommendation?.recommendationID }}</p>
          <p><strong>User ID:</strong> {{ recommendation?.userID }}</p>
          <p><strong>Rating:</strong> {{ recommendation?.rating }}</p>
          <p><strong>Created At:</strong> {{ new Date(recommendation?.created_at).toLocaleString() }}</p>
          <p><strong>Last Shown At:</strong> {{ new Date(recommendation?.last_shown_at).toLocaleString() }}</p>

          <p><strong>Equipment IDs:</strong> <br>{{ recommendation?.equipment_ids }}</p>
        </div>
        <div class="modal-footer ">
          <button type="button" class="custom-button-danger" data-bs-dismiss="modal">Close</button>
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
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      equipmentDetails: []
    };
  },
  watch: {
    recommendation: {
      immediate: true,
      handler(newValue) {
        if (newValue && newValue.equipment_ids) {
          const equipIDs = JSON.parse(newValue.equipment_ids);
          this.fetchEquipmentDetails(equipIDs);
        }
      }
    }
  },
  methods: {
    async fetchEquipmentDetails(equipIDs) {
      this.equipmentDetails = [];
      const fetchPromises = equipIDs.map(equipID =>
        axios.get(`http://localhost:3000/api/equipment/${equipID}/details`)
          .then(response => this.equipmentDetails.push(response.data.equipment))
          .catch(error => console.error(`Error fetching equipment details for ID ${equipID}:`, error))
      );
      await Promise.all(fetchPromises);
    }
  }
};
</script>

<style scoped>
.modal-title {
    color: #0483cc; 
  }
.modal-body p{
  text-align: justify;
  color:#b9b9b9;
}

.modal-body strong{
  text-align: justify;
  color:#ffffff;
}

</style>