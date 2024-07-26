<template>
    <div class="container mt-5">
      <div class="row">
        <!-- Category Dropdown -->
        <div class="col-md-12 mb-4">
          <h4>Select Equipment Category</h4>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select id="category" v-model="selectedCategory" class="form-select">
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>
  
        <!-- Equipment Dropdowns and Details -->
        <div class="col-md-6" v-for="side in ['Left', 'Right']" :key="side">
          <h4>Select Equipment for Comparison ({{ side }})</h4>
          <div class="mb-3">
            <label :for="'equipment' + side" class="form-label">Equipment</label>
            <select :id="'equipment' + side" v-model="selectedEquipment[side]" @change="fetchEquipmentDetails(side)" class="form-select">
              <option v-for="equip in equipmentNames" :key="equip.equipID" :value="equip.equipID">{{ equip.equipName }}</option>
            </select>
          </div>
          <div v-if="equipmentDetails[side]">
            <h5>Details:</h5>
            <p>Name: {{ equipmentDetails[side].equipName }}</p>
            <p>Brand: {{ equipmentDetails[side].equipBrand }}</p>
            <p>Price: {{ equipmentDetails[side].equipPrice }}</p>
            <div v-for="(detail, key) in dynamicDetails(equipmentDetails[side])" :key="key">
              <p>{{ key }}: {{ detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categories: [],
        equipmentNames: [],
        selectedCategory: '',
        selectedEquipment: {
          Left: null,
          Right: null,
        },
        equipmentDetails: {
          Left: null,
          Right: null,
        },
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('http://localhost:3000/api/equipment');
          this.categories = [...new Set(response.data.map(item => item.equipCategory))];
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchEquipmentNames() {
        try {
          const response = await axios.get(`http://localhost:3000/api/equipment/${this.selectedCategory}`);
          this.equipmentNames = response.data;
        } catch (error) {
          console.error('Error fetching equipment names:', error);
        }
      },
      async fetchEquipmentDetails(side) {
        const equipID = this.selectedEquipment[side];
        if (!equipID) return;
  
        try {
          const response = await axios.get(`http://localhost:3000/api/equipment/${equipID}/details`);
          const equipment = response.data.equipment;
          const details = response.data.details;
          this.equipmentDetails[side] = { ...equipment, ...details };
        } catch (error) {
          console.error(`Error fetching ${side.toLowerCase()} equipment details:`, error);
        }
      },
      dynamicDetails(details) {
        const dynamicKeys = {
          Racquet: ['flex', 'frame', 'shaft', 'joint', 'length', 'weight', 'stringAdvice', 'color', 'madeIn'],
          Shuttlecock: ['quantityPerTube', 'description'],
          Bags: ['color', 'size', 'description'],
          Footwear: ['color', 'upper', 'midsole', 'outsole', 'description'],
          Apparel: ['color', 'material'],
          Accessories: ['description'],
        };
        return dynamicKeys[this.selectedCategory].reduce((acc, key) => {
          if (details[key] !== undefined) {
            acc[key] = details[key];
          }
          return acc;
        }, {});
      },
    },
    watch: {
      selectedCategory(newCategory) {
        if (newCategory) {
          this.fetchEquipmentNames();
        }
      },
    },
    created() {
      this.fetchCategories();
    },
  };
  </script>
  
  <style>
  /* Add any necessary styling here */
  </style>
  