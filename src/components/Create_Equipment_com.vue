<template>
  <main class="container mt-3">
    <div class="card custom-card-dark mb-3">
      <div class="card-header">
        <h2>Equipment Information</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row">
            <!-- Left Column: General Details -->
            <div class="col-md-6">
              <div class="mb-2">
                <label for="equipName" class="form-label">Equipment Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipName"
                  v-model="equipment.equipName"
                  required
                />
              </div>
              <div class="mb-2">
                <label for="equipCategory" class="form-label">Category</label>
                <select
                  class="form-select"
                  id="equipCategory"
                  v-model="equipment.equipCategory"
                  @change="handleCategoryChange"
                  required
                >
                  <option disabled value="">Select a category</option>
                  <option value="Racquet">Racquet</option>
                  <option value="Shuttlecock">Shuttlecock</option>
                  <option value="Bags">Bags</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div class="mb-2">
                <label for="equipBrand" class="form-label">Brand</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipBrand"
                  v-model="equipment.equipBrand"
                  required
                />
              </div>
              <div class="mb-2">
                <label for="equipImgPath" class="form-label">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="equipImgPath"
                  @change="handleImageUpload"
                  required
                />
              </div>
              <div class="mb-2">
                <label for="equipPrice" class="form-label">Price</label>
                <input
                  type="number"
                  step="0.01"
                  class="form-control"
                  id="equipPrice"
                  v-model="equipment.equipPrice"
                  required
                />
              </div>
            </div>
            <!-- Right Column: Conditional Details -->
            <div class="col-md-6">
              <!-- Racquet Details -->
              <div v-if="equipment.equipCategory === 'Racquet'">
                <div class="mb-2">
                  <label for="flex" class="form-label">Flex</label>
                  <input type="text" class="form-control" id="flex" v-model="details.flex" />
                </div>
                <div class="mb-2">
                  <label for="frame" class="form-label">Frame</label>
                  <input type="text" class="form-control" id="frame" v-model="details.frame" />
                </div>
                <div class="mb-2">
                  <label for="shaft" class="form-label">Shaft</label>
                  <input type="text" class="form-control" id="shaft" v-model="details.shaft" />
                </div>
                <div class="mb-2">
                  <label for="joint" class="form-label">Joint</label>
                  <input type="text" class="form-control" id="joint" v-model="details.joint" />
                </div>
                <div class="mb-2">
                  <label for="length" class="form-label">Length</label>
                  <input type="text" class="form-control" id="length" v-model="details.length" />
                </div>
                <div class="mb-2">
                  <label for="weight" class="form-label">Weight</label>
                  <input type="text" class="form-control" id="weight" v-model="details.weight" />
                </div>
                <div class="mb-2">
                  <label for="stringAdvice" class="form-label">String Advice</label>
                  <input type="text" class="form-control" id="stringAdvice" v-model="details.stringAdvice" />
                </div>
                <div class="mb-2">
                  <label for="color" class="form-label">Color</label>
                  <input type="text" class="form-control" id="color" v-model="details.color" />
                </div>
                <div class="mb-2">
                  <label for="madeIn" class="form-label">Made In</label>
                  <input type="text" class="form-control" id="madeIn" v-model="details.madeIn" />
                </div>
              </div>

              <!-- Shuttlecock Details -->
              <div v-if="equipment.equipCategory === 'Shuttlecock'">
                <div class="mb-2">
                  <label for="quantityPerTube" class="form-label">Quantity Per Tube</label>
                  <input type="number" class="form-control" id="quantityPerTube" v-model="details.quantityPerTube" />
                </div>
                <div class="mb-2">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" v-model="details.description"></textarea>
                </div>
              </div>

              <!-- Bags Details -->
              <div v-if="equipment.equipCategory === 'Bags'">
                <div class="mb-2">
                  <label for="color" class="form-label">Color</label>
                  <input type="text" class="form-control" id="color" v-model="details.color" />
                </div>
                <div class="mb-2">
                  <label for="size" class="form-label">Size</label>
                  <input type="text" class="form-control" id="size" v-model="details.size" />
                </div>
                <div class="mb-2">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" v-model="details.description"></textarea>
                </div>
              </div>

              <!-- Footwear Details -->
              <div v-if="equipment.equipCategory === 'Footwear'">
                <div class="mb-2">
                  <label for="color" class="form-label">Color</label>
                  <input type="text" class="form-control" id="color" v-model="details.color" />
                </div>
                <div class="mb-2">
                  <label for="upper" class="form-label">Upper</label>
                  <input type="text" class="form-control" id="upper" v-model="details.upper" />
                </div>
                <div class="mb-2">
                  <label for="midsole" class="form-label">Midsole</label>
                  <input type="text" class="form-control" id="midsole" v-model="details.midsole" />
                </div>
                <div class="mb-2">
                  <label for="outsole" class="form-label">Outsole</label>
                  <input type="text" class="form-control" id="outsole" v-model="details.outsole" />
                </div>
                <div class="mb-2">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" v-model="details.description"></textarea>
                </div>
              </div>

              <!-- Apparel Details -->
              <div v-if="equipment.equipCategory === 'Apparel'">
                <div class="mb-2">
                  <label for="color" class="form-label">Color</label>
                  <input type="text" class="form-control" id="color" v-model="details.color" />
                </div>
                <div class="mb-2">
                  <label for="material" class="form-label">Material</label>
                  <input type="text" class="form-control" id="material" v-model="details.material" />
                </div>
              </div>

              <!-- Accessories Details -->
              <div v-if="equipment.equipCategory === 'Accessories'">
                <div class="mb-2">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" v-model="details.description"></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="mt-3">
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
     <!-- Use ErrorModal component -->
     <ErrorModal :errorMessage="errorMessage" />
  
  <!-- Use SuccessModal component -->
  <SuccessModal :successMessage="successMessage" />
  </main>
</template>

<script src='@/javascript/Admin/Create_Equipment.js'></script>

<style scoped>
.card {
  margin: 0 auto;
  max-width: 1200px; /* Adjust the max-width as needed */
  padding: 15px;
}

.card-header {
  padding: 10px;
}

.card-header h2 {
  font-size: 1.5rem; 
}

.form-label {
    color: #bbbbbb;
  }
  
  .form-control, .form-control-range, .form-select {
    background-color: #2c2c2c;
    border: 1px solid #444444;
    color: #ffffff;
  }
  
  .form-control::placeholder, .form-control-range::placeholder, .form-select::placeholder {
    color: #ffffff;
  }
  
  .form-control:focus {
    background-color: #2c2c2c;
    border-color: #555555;
    box-shadow: none;
    color:white;
  }

  .btn {
  margin-left:auto;
  font-size: 0.8em;
  font-weight: bold;
  padding: 12px 30px;
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

/* Adjust space for navbar */
@media (min-width: 992px) { /* For larger screens */
  .container {
    padding-top: 80px; /* Adjust the padding-top as needed for the navbar */
  }
}

@media (max-width: 992px) { /* For smaller screens */
  .container {
    padding-top: 60px; /* Adjust padding for smaller screens */
  }
}
</style>
