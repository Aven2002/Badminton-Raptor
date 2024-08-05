<template>
  <div>
    <div class="container mt-3">
      <!-- Breadcrumb -->
    <div class="d-flex justify-content-start custom-breadcrumb">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Compare Equipment'"
      />
    </div>

      <!-- Category Selection Bar -->
      <div class="category-bar d-flex">
        <div
          class="category-icon"
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="{ active: selectedCategory === category }"
        >
          <img :src="getCategoryImage(category)" :alt="category" />
        </div>
      </div>

      <!-- Equipment Selection and Details -->
      <template v-if="selectedCategory">
        <div class="row mt-2">
          <div class="col-md-4" v-for="side in ['Left', 'Center', 'Right']" :key="side">
            <div class="card dark-card mb-2">
              <div class="card-body p-2">
                <div class="mb-2">
                  <select
                    :id="'equipment' + side"
                    v-model="selectedEquipment[side]"
                    @change="fetchEquipmentDetails(side)"
                    class="form-select form-select-sm"
                  >
                    <option v-for="equip in equipmentNames" :key="equip.equipID" :value="equip.equipID">
                      {{ equip.equipName }}
                    </option>
                  </select>
                </div>
                <div v-if="equipmentDetails[side]" class="details">
                  <div class="d-flex flex-column align-items-center">
                    <img class="equipment-img" :src="getImageURL(equipmentDetails[side].equipImgPath)" alt="Equipment Image" />
                  </div>
                  <table class="table table-dark table-striped table-sm">
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
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script src="@/javascript/User/Compare_Equipment.js"></script>

<style scoped>
.custom-breadcrumb {
  margin-bottom: 10px;
}

/* Category Bar */
.category-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:transparent;
  border:none;
  overflow-x: auto;
}

.category-icon {
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #495057;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  transition: border 0.3s ease, background-color 0.3s ease;
}

.category-icon img {
  max-width: 50px;
  max-height: 50px;
}

.category-icon:hover {
  border: 3px solid #007bff;
}

.category-icon.active {
  background-color: #007bff;
}

.dark-card {
  background-color: #343a40;
  color: #fff;
  border: 1px solid #495057;
}

.dark-card .card-body {
  padding: 8px;
}

.equipment-img {
  max-width: 80px;
  height: auto;
  margin-bottom: 5px;
}

.table-dark th,
.table-dark td {
  color: #fff;
  padding: 5px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

.form-select-sm {
  font-size: 12px;
}

.details {
  font-size: 12px;
}
</style>
