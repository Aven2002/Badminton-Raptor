<template>
  <main class="full-width-container mt-3">
    <!-- Breadcrumb and Back Button -->
    <div class="d-flex justify-content-between align-items-center mb-5">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Recommended Equipment'"
      />
      <!-- Trigger Rating Modal via Back Button -->
      <BackBtn @click="triggerRatingModal" />
    </div>

    <!-- Equipment Cards Section -->
    <div class="col-md-12">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else>
        <div v-if="recommendations.length === 0" class="text-center">
          <img
            src='@/assets/Icon/Empty_Icon.png'
            alt="No items found"
            class="img-fluid"
          />
        </div>
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="item in recommendations"
            :key="item.equipID"
          >
            <div class="card-container mb-5">
              <div class="card" @click="goToDetails(item.equipID)">
                <div class="card-front">
                  <img
                    class="card-img-top"
                    :src="getImagePath(item.equipImgPath)"
                    alt="Equipment Image"
                  />
                </div>
                <div class="card-back">
                  <h5 class="card-title">{{ item.equipName }}</h5>
                  <p class="card-text">Price: RM{{ formattedPrice(item.equipPrice) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <RatingModal :recommendationId="currentRecommendationId" />
  </main>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';
import RatingModal from '@/components/Recommendation_Rating_modal.vue';

export default {
  name: 'Equipment_Recommendation_view',
  components: {
    Breadcrumb_Com,
    BackBtn,
    RatingModal
  },
  data() {
    return {
      recommendations: [],
      loading: true,
      currentRecommendationId: 0, 
    };
  },
  methods: {
    async fetchRecommendations() {
  try {
    const userID = Cookies.get('userID');
    console.log('Retrieved userID:', userID); // Log the value to ensure it's correct

    if (userID) {
      const response = await axios.post('http://localhost:3000/api/recommendation/generateRecommendation', {
        userID: userID 
      });

      // Check if the backend response includes recommendationID
      if (response.data.recommendations && response.data.recommendations.recommendationID) {
        this.currentRecommendationId = response.data.recommendations.recommendationID;
        console.log("Updated ID :", this.currentRecommendationId);
      } else {
        console.error('Recommendation ID not found in the response.');
      }

      // Check if recommendations are present in the response
      if (Array.isArray(response.data.recommendations.recommendations)) {
        // Directly use the recommendations from the response
        const recommendations = response.data.recommendations.recommendations;

        this.recommendations = recommendations;
      } else {
        console.error('Recommendations not found in the response.');
      }
    } else {
      console.error('UserID not found in cookies.');
    }
    this.loading = false;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    this.loading = false;
  }
},
    goToDetails(productID) {
      this.$router.push({ name: 'Equipment_Details_view', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      const imagePath = `http://localhost:3000/assets/${equipImgPath}`;
      return imagePath;
    },
    formattedPrice(price) {
      const numericPrice = parseFloat(price);
      return numericPrice.toFixed(2);
    },
    triggerRatingModal() {
      if (this.currentRecommendationId !== null) {
        // Trigger the modal when the back button is pressed
        const ratingModalInstance = new Modal(document.getElementById('ratingModal'));
        ratingModalInstance.show();
      } else {
        console.error('Recommendation ID is not set.');
      }
    }
  },
  mounted() {
    this.fetchRecommendations();
  }
};
</script>



<style scoped>
.card-container {
  perspective: 800px;
}

.card-img-top {
  max-width: 100%; /* Ensures the image does not exceed the card width */
  max-height: 280px; /* Limits the height of the image */
  object-fit: contain; /* Ensures the image maintains aspect ratio and fits within the card */
  display: block; /* Removes extra space below the image */
  margin: auto; /* Centers the image horizontally */
}

.card {
  width: 300px; /* Increased card width */
  height: 300px; /* Increased card height */
  background: rgb(103, 225, 255);
  transition: all 0.4s;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
  font-size: 16px; /* Adjusted font size */
  font-weight: 700; /* Adjusted font weight */
  overflow: hidden; /* Ensures content does not overflow */
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
  background: rgb(103, 151, 255);
}

.card-front {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 15px;
}

.card:hover .card-front {
  height: 0px;
  opacity: 0;
}

.card-back {
  height: 100%;
  width: 100%;
  opacity: 0;
  display: flex;
  flex-direction: column; /* Stacks content vertically */
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  font-size: 1rem; /* Adjusted font size */
  transform: rotate(90deg) scale(-1);
  overflow: hidden; /* Ensures content does not overflow */
  padding: 10px; /* Adds padding inside the card-back */
}

.card:hover .card-back {
  opacity: 1;
  transform: rotate(0deg);
  font-size: 1rem; /* Adjusted font size */
}

/* Center cards and have two per row */
.row {
  display: flex;
  justify-content: center;
}

.col-md-4 {
  display: flex;
  justify-content: center;
}

/* Medium devices (laptops, 992px and up) */
@media (min-width: 768px) and (max-width: 1200px) {
  .col-md-4 {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }

  .card {
    width: 230px;
    height: 230px;
  }

  .card-img-top {
    max-height: 240px;
  }

  .card-back {
    font-size: 1rem;
    padding: 10px;
  }
}

/* Responsive layout for mobile devices */
@media (max-width: 576px) {
  .col-md-4 {
    flex: 0 0 100%; /* One card per row on extra small screens */
    max-width: 100%;
  }

  .card {
    width: 100%; /* Make card width 100% of column width */
    height: auto; /* Adjust height to maintain aspect ratio */
  }

  .card-img-top {
    max-height: 150px; /* Further reduced image height on extra small screens */
  }

  .card-back {
    font-size: 0.9rem; /* Smaller font size for smaller screens */
    padding: 8px; /* Reduced padding */
  }
}
</style>


