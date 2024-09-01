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
};
</script>
