<template>
  <div class="container mt-3">
    <!-- Breadcrumb -->
    <div class="d-flex justify-content-between align-items-center">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Edit Equipment'"
      />
    </div>
    <div class="card bg-dark text-light">
      <!-- Top Section -->
      <div class="card-header">
        <div class="header">
          <h4>Edit Equipment</h4>
          <p class="equip-id">ID: {{ localEquipment.equipID }}</p>
        </div>
      </div>

      <!-- Equipment Information -->
      <div class="card-body">
        <div class="row">
          <!-- Left side: Current Image and Upload Button -->
          <div class="col-md-4 text-center">
            <img :src="getImagePath(localEquipment.equipImgPath)" alt="Equipment Image" class="img-fluid rounded shadow-lg" />
            <input type="file" @change="handleFileUpload" class="mt-2" />
          </div>

          <!-- Right side: Input Fields -->
          <div class="col-md-8">
            <form @submit.prevent="updateEquipment">
              <div class="mb-3">
                <label for="equipName" class="form-label">Name:</label>
                <input type="text" id="equipName" class="form-control" v-model="localEquipment.equipName" />
              </div>
              <div class="mb-3">
                <label for="equipCategory" class="form-label">Category:</label>
                <input type="text" id="equipCategory" class="form-control" v-model="localEquipment.equipCategory" disabled />
              </div>
              <div class="mb-3">
                <label for="equipBrand" class="form-label">Brand:</label>
                <input type="text" id="equipBrand" class="form-control" v-model="localEquipment.equipBrand" />
              </div>
              <div class="mb-3">
                <label for="equipPrice" class="form-label">Price:</label>
                <input type="number" step="0.01" id="equipPrice" class="form-control" v-model="localEquipment.equipPrice" />
              </div>

              <button type="button" class="btn btn-secondary mb-3" @click="toggleDetails">Toggle Additional Details</button>

              <div v-if="showAdditionalDetails">
                <!-- Additional fields based on category -->
                <div v-if="localEquipment.equipCategory === 'Racquet'">
                  <label for="flex" class="form-label">Flex:</label>
                  <input type="text" id="flex" class="form-control" v-model="additionalDetails.flex" />
                  <label for="frame" class="form-label">Frame:</label>
                  <input type="text" id="frame" class="form-control" v-model="additionalDetails.frame" />
                  <label for="shaft" class="form-label">Shaft:</label>
                  <input type="text" id="shaft" class="form-control" v-model="additionalDetails.shaft" />
                  <label for="joint" class="form-label">Joint:</label>
                  <input type="text" id="joint" class="form-control" v-model="additionalDetails.joint" />
                  <label for="length" class="form-label">Length:</label>
                  <input type="text" id="length" class="form-control" v-model="additionalDetails.length" />
                  <label for="weight" class="form-label">Weight:</label>
                  <input type="text" id="weight" class="form-control" v-model="additionalDetails.weight" />
                  <label for="stringAdvice" class="form-label">String Advice:</label>
                  <input type="text" id="stringAdvice" class="form-control" v-model="additionalDetails.stringAdvice" />
                  <label for="color" class="form-label">Color:</label>
                  <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                  <label for="madeIn" class="form-label">Made In:</label>
                  <input type="text" id="madeIn" class="form-control" v-model="additionalDetails.madeIn" />
                </div>
                <div v-else-if="localEquipment.equipCategory === 'Shuttlecock'">
                  <label for="quantityPerTube" class="form-label">Quantity Per Tube:</label>
                  <input type="number" id="quantityPerTube" class="form-control" v-model="additionalDetails.quantityPerTube" />
                  <label for="description" class="form-label">Description:</label>
                  <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                </div>
                <div v-else-if="localEquipment.equipCategory === 'Bags'">
                  <label for="color" class="form-label">Color:</label>
                  <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                  <label for="size" class="form-label">Size:</label>
                  <input type="text" id="size" class="form-control" v-model="additionalDetails.size" />
                  <label for="description" class="form-label">Description:</label>
                  <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                </div>
                <div v-else-if="localEquipment.equipCategory === 'Footwear'">
                  <label for="color" class="form-label">Color:</label>
                  <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                  <label for="upper" class="form-label">Upper:</label>
                  <input type="text" id="upper" class="form-control" v-model="additionalDetails.upper" />
                  <label for="midsole" class="form-label">Midsole:</label>
                  <input type="text" id="midsole" class="form-control" v-model="additionalDetails.midsole" />
                  <label for="outsole" class="form-label">Outsole:</label>
                  <input type="text" id="outsole" class="form-control" v-model="additionalDetails.outsole" />
                  <label for="description" class="form-label">Description:</label>
                  <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                </div>
                <div v-else-if="localEquipment.equipCategory === 'Apparel'">
                  <label for="color" class="form-label">Color:</label>
                  <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                  <label for="material" class="form-label">Material:</label>
                  <input type="text" id="material" class="form-control" v-model="additionalDetails.material" />
                </div>
                <div v-else-if="localEquipment.equipCategory === 'Accessories'">
                  <label for="description" class="form-label">Description:</label>
                  <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                </div>
              </div>

              <button type="submit" class="btn btn-update">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';

export default {
  name: 'EditEquipment',
  components: {
    Breadcrumb_Com
  },
  props: {
    equipID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localEquipment: {},
      additionalDetails: {},
      showAdditionalDetails: false,
      selectedFile: null
    };
  },
  methods: {
    async fetchEquipmentDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/equipment/${this.equipID}/details`);
        this.localEquipment = response.data.equipment;
        this.additionalDetails = response.data.details;
      } catch (error) {
        console.error('Error fetching equipment details:', error);
      }
    },
    async updateEquipment() {
  try {
    const formData = new FormData();
    
    // Append general equipment details
    formData.append('equipName', this.localEquipment.equipName);
    formData.append('equipCategory', this.localEquipment.equipCategory);
    formData.append('equipBrand', this.localEquipment.equipBrand);
    formData.append('equipPrice', this.localEquipment.equipPrice);

    // Append additional details if applicable
    if (this.additionalDetails) {
      for (const key in this.additionalDetails) {
        if (Object.prototype.hasOwnProperty.call(this.additionalDetails, key)) {
          formData.append(`details[${key}]`, this.additionalDetails[key]);
        }
      }
    }

    // Append the file if selected
    if (this.selectedFile) {
      formData.append('equipImgPath', this.selectedFile);
    }

    // Log FormData entries for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Make the PUT request
    const response = await axios.put(`http://localhost:3000/api/equipment/${this.equipID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Handle success
    console.log('Update successful:', response.data);
    this.$emit('update-success');
  } catch (error) {
    console.error('Error updating equipment:', error.response ? error.response.data : error.message);
    this.$emit('update-error', error.message);
  }
},
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    toggleDetails() {
      this.showAdditionalDetails = !this.showAdditionalDetails;
    },
    getImagePath(path) {
      return path ? `http://localhost:3000/${path}` : 'defaultImg.png';
    }
  },
  created() {
    this.fetchEquipmentDetails();
  }
};
</script>

<style scoped>
.card {
  background-color: #333;
  color: #fff;
}
.header h4 {
  font-size: 1.5rem;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
.btn-update {
  background-color: #007bff;
  color: #fff;
}
.btn-update:hover {
  background-color: #0056b3;
}
</style>
