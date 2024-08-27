<template>
  <main class="content container mt-3">
    <!-- Breadcrumb and Back Button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
        <Breadcrumb_Com
            :homeLink="'/Home_view'"
            :breadcrumbItems="[]"
            :currentItem="'Recommended Equipment'" />
       <BackBtn />
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
            <div class="card-container">
              <div class="card" @click="goToDetails(item.equipID)">
                <div class="card-front">
                  <img class="card-img-top" :src="getImagePath(item.equipImgPath)" alt="Equipment Image">
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
  </main>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';

export default {
  name: 'Equipment_Recommendation_view',
  components: {
    Breadcrumb_Com,
    BackBtn
  },
  data() {
    return {
      recommendations: [],
      loading: true
    };
  },
  created() {
    this.fetchRecommendations();
  },
  methods: {
    async fetchRecommendations() {
      try {
        const userID = Cookies.get('userID');
        if (userID) {
          const response = await axios.get(`http://localhost:5000/api/recommendations`, {
            params: { user_id: userID }
          });
          // Fetch equipment details for each recommendation
          const recommendationsWithDetails = await Promise.all(response.data.recommendations.map(async item => {
            const detailsResponse = await axios.get(`http://localhost:3000/api/equipment/${item.equipID}/details`);
            return {
              ...item,
              equipImgPath: detailsResponse.data.equipment.equipImgPath
            };
          }));
          this.recommendations = recommendationsWithDetails;
        } else {
          console.error('UserID not found in cookies.');
        }
        this.loading = false;
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        this.loading = false;
      }
    },
    goBack() {
      this.$router.go(-1); // Navigate back in the browser history
    },
    goToDetails(productID) {
      this.$router.push({ name: 'Equipment_Details_view', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      // Adjust based on where your images are served
      const imagePath = `http://localhost:3000/assets/${equipImgPath}`;
      return imagePath;
    },
    formattedPrice(price) {
      // Convert price to a number and then format it
      const numericPrice = parseFloat(price);
      return numericPrice.toFixed(2);
    }
  }
};
</script>

<style scoped>
.card-container {
  perspective: 800px;
}

.card {
  position: relative;
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border: #2c2c2c solid 2px;
  background-color: #ebe7df;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.card-back {
  background-color: #2c2c2c;
  color: #ffffff;
  transform: rotateY(180deg);
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-back h5.card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card-back p.card-text {
  font-size: 1rem;
  margin-bottom: 5px;
}

.card-front img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.card:hover {
  transform: rotateY(180deg);
}
</style>
