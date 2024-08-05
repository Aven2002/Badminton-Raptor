<template>
  <div>
    <div class="container mt-3">
        <!-- Breadcrumb -->
    <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
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
                        <th scope="row">{{ getLabel(key) }}</th>
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

<style src='@/style/User/Compare_Equipment.css' scoped></style>