<template>
  <!-- Breadcrumb -->
  <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
        <Breadcrumb_Com
      :homeLink="'/Home_view'"
      :breadcrumbItems="[]"
      :currentItem="'Compare Equipment'"
    />
    </div>
  <div class="container mt-5">
    <div class="row">
      <!-- Category Selection Cards -->
      <div class="col-6 col-md-2 mb-3" v-for="category in categories" :key="category">
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
        <div class="col-md-4" v-for="side in ['Left', 'Center', 'Right']" :key="side">
          <div class="mb-3">
            <select :id="'equipment' + side" v-model="selectedEquipment[side]" @change="fetchEquipmentDetails(side)" class="form-select form-select-sm">
              <option v-for="equip in equipmentNames" :key="equip.equipID" :value="equip.equipID">{{ equip.equipName }}</option>
            </select>
          </div>
          <div v-if="equipmentDetails[side]" class="details">
            <div class="col-md-12 d-flex flex-column align-items-center left-section">
              <img class="equipment-img" :src="getImageURL(equipmentDetails[side].equipImgPath)" alt="Equipment Image">
            </div>
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

<script src='@/javascript/User/Compare_Equipment'></script>

<style src='@/style/User/Compare_Equipment.css' scoped></style>
