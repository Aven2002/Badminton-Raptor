<template>
  <main class="content container">
    
    <!-- Search Bar -->
    <div class="d-flex flex-column flex-md-row justify-content-end mb-2">
      <SearchBar_Com searchType="equipname" @search="handleSearch" />
    </div>

    <div class="row">
      <div class="col-md-12">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="filteredItems.length === 0" class="text-center">
            <img src="@/assets/Icon/Empty_Icon.png" alt="Empty Icon" class="img-fluid" />
          </div>
          <div v-else>
            <div class="table-container">
              <table class="custom-table-dark">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                      v-for="item in paginatedItems" 
                      :key="item.equipID" 
                      @click="selectEquipment(item)"
                    >
                    <td class="align-middle">
                      <img :src="getImagePath(item.equipImgPath)" alt="Equipment Image" class="img-thumbnail" @error="handleImageError" />
                    </td>
                    <td class="align-middle">{{ item.equipName }}</td>
                    <td class="align-middle">RM{{ item.equipPrice }}</td>
                    <td class="align-middle">{{ item.equipCategory }}</td>
                    <td class="align-middle">{{ item.equipBrand }}</td>
                    <td class="align-middle">
                      <div class="d-flex justify-content-center">
                        <RemoveButton :equipID="item.equipID" @item-removed="handleItemRemoved(item.equipID)" @error="showErrorModal" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <Pagination
              :totalPages="totalPages"
              :currentPage="currentPage"
              @page-changed="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
      <!-- Modals -->
      <EquipmentDetailsModal
        v-if="selectedEquipment"
        :equipment="selectedEquipment"
        @close="selectedEquipment = null"
      />
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>

<script src='@/javascript/Admin/View_Equipment.js'></script>

<style>
.img-thumbnail{
  width:150px;
  max-height:150px;
}
</style>
