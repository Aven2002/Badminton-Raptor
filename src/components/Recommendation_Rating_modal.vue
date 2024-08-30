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
        <div class="modal-footer ">
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

      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  }
};
</script>
  
<style src='@/style/Global_style.css' scoped></style>

  <style scoped>
  .modal-body p {
    margin: 20px 0;
    font-size: 1.1rem;
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
  }

  </style>
  