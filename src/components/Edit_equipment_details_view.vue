<template>
    <div class="container">
         <!-- Close Button -->
         <div class="text-end mb-4">
        <button class="custom-back-button" @click="closeEditView">
          Back <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
        </div>
      <div class="custom-card-dark mb-5">
        <div class="card-header mb-3">
          <h4>Equipment ID: {{ localEquipment.equipID }}</h4>
        </div>
  
        <!-- Equipment Information -->
        <div class="card-body">
          <div class="row">
            <!-- Left side: Current Image and Upload Button -->
            <div class="col-md-4 text-center mt-2">
              <img :src="getImagePath(localEquipment.equipImgPath)" alt="Equipment Image" class="img-fluid rounded shadow-lg" />
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
  
                <div v-if="showAdditionalDetails">
                  <!-- Additional fields based on category -->
                  <div v-if="localEquipment.equipCategory === 'Racquet'">
                    <div class="mb-3">
                      <label for="flex" class="form-label">Flex:</label>
                      <input type="text" id="flex" class="form-control" v-model="additionalDetails.flex" />
                    </div>
                    <div class="mb-3">
                      <label for="frame" class="form-label">Frame:</label>
                      <input type="text" id="frame" class="form-control" v-model="additionalDetails.frame" />
                    </div>
                    <div class="mb-3">
                      <label for="shaft" class="form-label">Shaft:</label>
                      <input type="text" id="shaft" class="form-control" v-model="additionalDetails.shaft" />
                    </div>
                    <div class="mb-3">
                      <label for="joint" class="form-label">Joint:</label>
                      <input type="text" id="joint" class="form-control" v-model="additionalDetails.joint" />
                    </div>
                    <div class="mb-3">
                      <label for="length" class="form-label">Length:</label>
                      <input type="text" id="length" class="form-control" v-model="additionalDetails.length" />
                    </div>
                    <div class="mb-3">
                      <label for="weight" class="form-label">Weight:</label>
                      <input type="text" id="weight" class="form-control" v-model="additionalDetails.weight" />
                    </div>
                    <div class="mb-3">
                      <label for="stringAdvice" class="form-label">String Advice:</label>
                      <input type="text" id="stringAdvice" class="form-control" v-model="additionalDetails.stringAdvice" />
                    </div>
                    <div class="mb-3">
                        <label for="color" class="form-label">Color:</label>
                        <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                    </div>
                    <div class="mb-3">
                        <label for="madeIn" class="form-label">Made In:</label>
                        <input type="text" id="madeIn" class="form-control" v-model="additionalDetails.madeIn" />
                    </div>
                  </div>
                  <div v-else-if="localEquipment.equipCategory === 'Shuttlecock'">
                    <div class="mb-3">
                      <label for="quantityPerTube" class="form-label">Quantity Per Tube:</label>
                      <input type="number" id="quantityPerTube" class="form-control" v-model="additionalDetails.quantityPerTube" />
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Description:</label>
                      <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                    </div>
                  </div>
                  <div v-else-if="localEquipment.equipCategory === 'Bags'">
                    <div class="mb-3">
                      <label for="color" class="form-label">Color:</label>
                      <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                    </div>
                    <div class="mb-3">
                      <label for="size" class="form-label">Size:</label>
                      <input type="text" id="size" class="form-control" v-model="additionalDetails.size" />
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Description:</label>
                      <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                    </div>
                  </div>
                  <div v-else-if="localEquipment.equipCategory === 'Footwear'">
                    <div class="mb-3">
                      <label for="color" class="form-label">Color:</label>
                      <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                    </div>
                    <div class="mb-3">
                      <label for="upper" class="form-label">Upper:</label>
                      <input type="text" id="upper" class="form-control" v-model="additionalDetails.upper" />
                    </div>
                    <div class="mb-3">
                      <label for="midsole" class="form-label">Midsole:</label>
                      <input type="text" id="midsole" class="form-control" v-model="additionalDetails.midsole" />
                    </div>
                    <div class="mb-3">
                      <label for="outsole" class="form-label">Outsole:</label>
                      <input type="text" id="outsole" class="form-control" v-model="additionalDetails.outsole" />
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Description:</label>
                      <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                     </div>
                  </div>
                  <div v-else-if="localEquipment.equipCategory === 'Apparel'">
                    <div class="mb-3">
                      <label for="color" class="form-label">Color:</label>
                      <input type="text" id="color" class="form-control" v-model="additionalDetails.color" />
                    </div>
                    <div class="mb-3">
                      <label for="material" class="form-label">Material:</label>
                      <input type="text" id="material" class="form-control" v-model="additionalDetails.material" />
                    </div>
                  </div>
                  <div v-else-if="localEquipment.equipCategory === 'Accessories'">
                    <div class="mb-3">
                      <label for="description" class="form-label">Description:</label>
                      <input type="text" id="description" class="form-control" v-model="additionalDetails.description" />
                    </div>
                  </div>
                </div>
                
                <div class="button-container d-flex justify-content-between mt-5">
                  <button type="button" class="btn btn-additional" @click="toggleDetails">
                  <i class="fa-solid fa-compress"></i>
                  Additional Details
                </button>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditEquipment',
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
        selectedFile: null,
        isCardVisible: true,
      };
    },
    methods: {
      closeEditView() {
        this.currentView = 'list';
        this.$emit('update-success');
      },
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
        
        // Append details to formData
        formData.append('equipName', this.localEquipment.equipName);
        formData.append('equipCategory', this.localEquipment.equipCategory);
        formData.append('equipBrand', this.localEquipment.equipBrand);
        formData.append('equipPrice', this.localEquipment.equipPrice);
  
        if (this.additionalDetails) {
          formData.append('details', JSON.stringify(this.additionalDetails));
        }
  
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
      toggleDetails() {
        this.showAdditionalDetails = !this.showAdditionalDetails;
      },
      getImagePath(path) {
        return path ? `http://localhost:3000/assets/${path}` : require('@/assets/Icon/Default_Img_Icon.png');
      }
    },
    created() {
      this.fetchEquipmentDetails();
    }
  };
  </script>
  
  <style scoped>
  .img-fluid{
    max-height:350px;
  }

  .card {
    background-color: #333;
    color: #fff;
    border: 1px solid #444;
    border-radius: 0.25rem;
  }

  .card-header{
    border-bottom: 2px solid #6c757d;
    padding:10px;
  }

  .card-body{
    text-align:left;
    margin-left:30px;
  }

  .card-header h4{
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn {
  font-size: 0.8em;
  font-weight: bold;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  color: white;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease-in-out;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  z-index: 0;
}

.btn-primary:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.btn-primary:hover,
.btn-primary:focus {
  background: linear-gradient(45deg, #0056b3, #007bff);
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.6);
  transform: translateY(-3px);
}
  
  .btn-additional {
    background-color: transparent;
    color: #fff;
    border: 1px solid #007bff;
    border-radius: 0.25rem;
  }
  
  .btn-additional:hover {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border-color: #007bff;
  }
  
  .form-control {
    background-color: #444;
    border: 1px solid #555;
    color: #fff;
  }
  
  .form-control:focus {
    background-color: #444;
    border-color: #007bff;
    box-shadow: none;
    color:#fff;
  }
  
  .form-control:disabled {
    background-color: #6c757d; 
    border: 1px solid #495057; 
    color: #e9ecef; 
    cursor: not-allowed; 
  }

  .custom-back-button {
      position: relative;
      padding: 10px 20px;
      border-radius: 7px;
      border: none;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 2px;
      background: transparent;
      color: #333333;
      overflow: hidden;
      box-shadow: 0 0 0 0 transparent;
      -webkit-transition: all 0.2s ease-in;
      -moz-transition: all 0.2s ease-in;
      transition: all 0.2s ease-in;
    }
    
    .custom-back-button:hover {
      background: #333333;
      box-shadow: 0 0 30px 5px #444444;
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
      color:#fff;
    }
    
    .custom-back-button:hover::before {
      -webkit-animation: sh02 0.5s 0s linear;
      -moz-animation: sh02 0.5s 0s linear;
      animation: sh02 0.5s 0s linear;
    }
    
    .custom-back-button::before {
      content: '';
      display: block;
      width: 0px;
      height: 86%;
      position: absolute;
      top: 7%;
      left: 0%;
      opacity: 0;
      background: #fff;
      box-shadow: 0 0 50px 30px #fff;
      -webkit-transform: skewX(-20deg);
      -moz-transform: skewX(-20deg);
      -ms-transform: skewX(-20deg);
      -o-transform: skewX(-20deg);
      transform: skewX(-20deg);
    }
    
    @keyframes sh02 {
      from {
        opacity: 0;
        left: 0%;
      }
    
      50% {
        opacity: 1;
      }
    
      to {
        opacity: 0;
        left: 100%;
      }
    }
    
    .custom-back-button:active {
      box-shadow: 0 0 0 0 transparent;
      -webkit-transition: box-shadow 0.2s ease-in;
      -moz-transition: box-shadow 0.2s ease-in;
      transition: box-shadow 0.2s ease-in;
    }
  </style>