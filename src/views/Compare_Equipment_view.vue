<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Category Selection Cards -->
      <div class="col-md-2" v-for="category in categories" :key="category">
        <div class="card category-card" @click="selectCategory(category)">
          <img :src="getCategoryImage(category)" class="card-img-top" :alt="category" />
          <div class="card-body">
          </div>
        </div>
      </div>
    </div>

    <!-- Only show equipment dropdowns if a category is selected -->
    <template v-if="selectedCategory">
      <div class="row mt-4">
        <div class="col-md-6" v-for="side in ['Left', 'Right']" :key="side">
          <div class="mb-3">
            <select :id="'equipment' + side" v-model="selectedEquipment[side]" @change="fetchEquipmentDetails(side)" class="form-select form-select-sm">
              <option v-for="equip in equipmentNames" :key="equip.equipID" :value="equip.equipID">{{ equip.equipName }}</option>
            </select>
          </div>
          <div v-if="equipmentDetails[side]" class="details">
            <h5>Summary</h5>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{{ equipmentDetails[side].equipName }}</td>
                </tr>
                <tr>
                  <th scope="row">Brand</th>
                  <td>{{ equipmentDetails[side].equipBrand }}</td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>{{ formatPrice(equipmentDetails[side].equipPrice) }}</td>
                </tr>
                <tr v-for="(detail, key) in dynamicDetails(equipmentDetails[side])" :key="key">
                  <th scope="row">{{ key }}</th>
                  <td>{{ detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
  
  <script src='@/javascript/Compare_Equipment.js'></script>

  <style src='@/style/Compare_Equipment.css' scoped></style>