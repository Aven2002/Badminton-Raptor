<template>
  <!-- Modal structure -->
  <div class="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ratingModalLabel">Current Recommendation ID: {{ recommendationId }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <h2>How are you feeling today?</h2>
          <p>Your input is valuable in helping us better understand your needs and tailor our service accordingly.</p>
          <div class="emoji-container">
            <span 
              v-for="(emoji, index) in emojis" 
              :key="index" 
              :class="{ 'emoji': true, 'selected': index + 1 === selectedRating }" 
              @click="selectRating(index + 1)"
            >
              <span class="emoji-text">{{ emoji }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'bootstrap';

export default {
  name: 'RatingModal',
  props: {
    recommendationId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedRating: 0,
      emojis: ['😢', '😞', '😐', '🙂', '🥰']
    };
  },
  methods: {
    selectRating(rating) {
      this.selectedRating = rating;
      this.submitRating(); // Submit rating immediately after selection
    },
    async submitRating() {
      try {
        const userID = Cookies.get('userID');
        if (!userID) {
          console.error('User ID not found in cookies.');
          return;
        }

        const payload = {
          user_id: userID,
          recommendation_id: this.recommendationId,
          rating: this.selectedRating
        };

        await axios.post('http://localhost:5000/api/update_rating', payload);
        console.log('Rating submitted successfully!');

        // Hide the modal after submission
        const modalElement = document.getElementById('ratingModal');
        const bootstrapModal = Modal.getInstance(modalElement);
        if (bootstrapModal) {
          bootstrapModal.hide();
        } else {
          console.error('Bootstrap Modal instance not found.');
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  }
};
</script>
  
  <style scoped>
  .modal-content {
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    background-color: #7beb52;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .modal-footer {
    background-color: #f8f9fa;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  
  .btn-close {
    filter: invert(1);
  }
  
  .modal-body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #495057;
  }
  
  .modal-body p {
    margin: 20px 0;
    font-size: 1.1rem;
  }
  
  .btn-secondary {
    background-color: #343a40;
    border-color: #343a40;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #495057;
    border-color: #495057;
  }
  
  .emoji-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .emoji {
    cursor: pointer;
    font-size: 3rem; /* Adjust size as needed */
    margin: 0 5px; /* Spacing between emojis */
  }

  .emoji :hover{
    background-color: lightgrey; /* Background color for unselected emoji */
    border-radius: 50%; 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
    transform: scale(1.2); 
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s; 
  }

  </style>
  