<template>
    <div class="container mt-5">
      <div class="row">
        <!-- Category Selection Cards -->
        <div class="col-md-4 mb-4" v-for="category in categories" :key="category">
          <div class="card category-card" @click="selectCategory(category)">
            <img :src="getCategoryImage(category)" class="card-img-top" :alt="category" />
            <div class="card-body">
              <h5 class="card-title">{{ category }}</h5>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Only show equipment dropdowns if a category is selected -->
      <template v-if="selectedCategory">
        <div class="row">
          <div class="col-md-6" v-for="side in ['Left', 'Right']" :key="side">
            <h4>Select Equipment for Comparison ({{ side }})</h4>
            <div class="mb-3">
              <label :for="'equipment' + side" class="form-label">Equipment</label>
              <select :id="'equipment' + side" v-model="selectedEquipment[side]" @change="fetchEquipmentDetails(side)" class="form-select form-select-sm">
                <option v-for="equip in equipmentNames" :key="equip.equipID" :value="equip.equipID">{{ equip.equipName }}</option>
              </select>
            </div>
            <div v-if="equipmentDetails[side]" class="details">
              <h5>Details:</h5>
              <p>Name: {{ equipmentDetails[side].equipName }}</p>
              <p>Brand: {{ equipmentDetails[side].equipBrand }}</p>
              <p>Price: {{ equipmentDetails[side].equipPrice }}</p>
              <div v-for="(detail, key) in dynamicDetails(equipmentDetails[side])" :key="key">
                <p><strong>{{ key }}:</strong> {{ detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  
  <script src='@/javascript/Compare_Equipment.js'></script>

  <style src='@/style/Compare_Equipment.css' scoped></style>