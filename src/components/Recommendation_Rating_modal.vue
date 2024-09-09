<template>
  <!-- Modal structure -->
  <div class="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ratingModalLabel">Recommendation Feedback</h5>
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
              data-bs-dismiss="modal"
            >
              <span class="emoji-text">{{ emoji }}</span>
            </span>
          </div>
        </div>
        <div class="modal-footer">
         <button type="button" class="custom-button-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'RatingModal',
  props: {
    recommendationId: {
      type: Number,
      required: true,
      default: 0 
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
        console.log('Retrieved userID:', userID); // Log the userID

        if (!userID) {
          console.error('User ID not found in cookies.');
          return;
        }

        if (this.recommendationId <= 0) {
          console.error('Invalid recommendation ID:', this.recommendationId);
          return;
        }

        console.log('Recommendation ID:', this.recommendationId); // Log the recommendationID
        console.log('Selected Rating:', this.selectedRating); // Log the selected rating

        const payload = {
          userID: userID,
          recommendationID: this.recommendationId,
          rating: this.selectedRating
        };

        console.log('Payload for updateRating request:', payload); // Log the payload

        await axios.put('http://localhost:3000/api/recommendation/updateRating', payload);
        console.log('Rating submitted successfully!');

      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  }
};
</script>


<style scoped>
  .modal-title {
    color: #26b602; 
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
    background-color: lightgrey; 
    border-radius: 50%; 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  }

  </style>
  