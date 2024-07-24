<template>
    <main class="content container">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else>
        <div v-if="equipment">
          <div class="row">
            <div class="col-md-4">
              <img :src="getImagePath(equipment.equipImgPath)" alt="Equipment Image" class="img-fluid" />
            </div>
            <div class="col-md-8">
              <h2>{{ equipment.equipName }}</h2>
              <p><strong>Price:</strong> RM{{ equipment.equipPrice }}</p>
              <p><strong>Category:</strong> {{ equipment.equipCategory }}</p>
              <p><strong>Brand:</strong> {{ equipment.equipBrand }}</p>
              
              <!-- Display additional details based on category -->
              <div v-if="details">
                <div v-if="equipment.equipCategory === 'Racquet'">
                  <h4>Racquet Details</h4>
                  <ul>
                    <li><strong>Flex:</strong> {{ details.flex }}</li>
                    <li><strong>Frame:</strong> {{ details.frame }}</li>
                    <li><strong>Shaft:</strong> {{ details.shaft }}</li>
                    <li><strong>Joint:</strong> {{ details.joint }}</li>
                    <li><strong>Length:</strong> {{ details.length }}</li>
                    <li><strong>Weight:</strong> {{ details.weight }}</li>
                    <li><strong>String Advice:</strong> {{ details.stringAdvice }}</li>
                    <li><strong>Color:</strong> {{ details.color }}</li>
                    <li><strong>Made In:</strong> {{ details.madeIn }}</li>
                  </ul>
                </div>
  
                <div v-if="equipment.equipCategory === 'Shuttlecock'">
                  <h4>Shuttlecock Details</h4>
                  <ul>
                    <li><strong>Quantity per Tube:</strong> {{ details.quantityPerTube }}</li>
                    <li><strong>Description:</strong> {{ details.description }}</li>
                  </ul>
                </div>
  
                <div v-if="equipment.equipCategory === 'Bags'">
                  <h4>Bag Details</h4>
                  <ul>
                    <li><strong>Color:</strong> {{ details.color }}</li>
                    <li><strong>Size:</strong> {{ details.size }}</li>
                    <li><strong>Description:</strong> {{ details.description }}</li>
                  </ul>
                </div>
  
                <div v-if="equipment.equipCategory === 'Footwear'">
                  <h4>Footwear Details</h4>
                  <ul>
                    <li><strong>Color:</strong> {{ details.color }}</li>
                    <li><strong>Upper:</strong> {{ details.upper }}</li>
                    <li><strong>Midsole:</strong> {{ details.midsole }}</li>
                    <li><strong>Outsole:</strong> {{ details.outsole }}</li>
                    <li><strong>Description:</strong> {{ details.description }}</li>
                  </ul>
                </div>
  
                <div v-if="equipment.equipCategory === 'Apparel'">
                  <h4>Apparel Details</h4>
                  <ul>
                    <li><strong>Color:</strong> {{ details.color }}</li>
                    <li><strong>Material:</strong> {{ details.material }}</li>
                  </ul>
                </div>
  
                <div v-if="equipment.equipCategory === 'Accessories'">
                  <h4>Accessory Details</h4>
                  <ul>
                    <li><strong>Description:</strong> {{ details.description }}</li>
                  </ul>
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
  
  export default {
    name: 'Equipment_Details_View',
    data() {
      return {
        equipment: null,
        details: null,
        loading: false
      };
    },
    created() {
      this.fetchEquipmentDetails();
    },
    methods: {
      async fetchEquipmentDetails() {
        this.loading = true;
        const equipID = this.$route.params.id;
  
        try {
          const response = await axios.get(`http://localhost:3000/api/equipment/${equipID}/details`);
          this.equipment = response.data.equipment;
          this.details = response.data.details;
        } catch (error) {
          console.error('Error fetching equipment details:', error);
        } finally {
          this.loading = false;
        }
      },
      getImagePath(equipImgPath) {
        return `http://localhost:3000/assets/${equipImgPath}`;
      }
    }
  };
  </script>
  
  
  <style scoped>
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  </style>
  