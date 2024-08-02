<template>
  <main class="container mt-3">
    <!-- Nav Bar -->
    <div class="d-flex justify-content-end mb-3">
      <div class="ms-3">
        <Navbar :navItems="navItems" defaultView="Add" />
      </div>
    </div>
    <div class="card card-dark mb-5">
      <div class="card-header">
        <h2>Create New Equipment</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row">
            <!-- Left Column: General Details -->
            <div class="col-md-6">
              <div class="mb-3">
                <label for="equipName" class="form-label">Equipment Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipName"
                  v-model="equipment.equipName"
                  required
                />
              </div>
              <div class="mb-3">
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
              <div class="mb-3">
                <label for="equipBrand" class="form-label">Brand</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipBrand"
                  v-model="equipment.equipBrand"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="equipImgPath" class="form-label">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="equipImgPath"
                  @change="handleImageUpload"
                  required
                />
              </div>
              <div class="mb-3">
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
              <div v-if="equipment.equipCategory === 'Racquet'">
                <div class="mb-3">
                  <label for="flex" class="form-label">Flex</label>
                  <input type="text" class="form-control" id="flex" v-model="details.flex" />
                </div>
                <div class="mb-3">
                  <label for="frame" class="form-label">Frame</label>
                  <input type="text" class="form-control" id="frame" v-model="details.frame" />
                </div>
                <div class="mb-3">
                  <label for="shaft" class="form-label">Shaft</label>
                  <input type="text" class="form-control" id="shaft" v-model="details.shaft" />
                </div>
                <div class="mb-3">
                  <label for="joint" class="form-label">Joint</label>
                  <input type="text" class="form-control" id="joint" v-model="details.joint" />
                </div>
                <div class="mb-3">
                  <label for="length" class="form-label">Length</label>
                  <input type="text" class="form-control" id="length" v-model="details.length" />
                </div>
                <div class="mb-3">
                  <label for="weight" class="form-label">Weight</label>
                  <input type="text" class="form-control" id="weight" v-model="details.weight" />
                </div>
                <div class="mb-3">
                  <label for="stringAdvice" class="form-label">String Advice</label>
                  <input
                    type="text"
                    class="form-control"
                    id="stringAdvice"
                    v-model="details.stringAdvice"
                  />
                </div>
                <div class="mb-3">
                  <label for="color" class="form-label">Color</label>
                  <input type="text" class="form-control" id="color" v-model="details.color" />
                </div>
                <div class="mb-3">
                  <label for="madeIn" class="form-label">Made In</label>
                  <input type="text" class="form-control" id="madeIn" v-model="details.madeIn" />
                </div>
              </div>
              <!-- Add more conditional sections for other categories -->
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Create Equipment</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script src='@/javascript/Admin_views/Create_Equipment'></script>

<style> 
@import '@/style/Global.css'; 
</style>
