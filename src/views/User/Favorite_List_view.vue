<template>
  <main class="full-width-container">
    <!-- Breadcrumb and Search Bar -->
    <div class="mt-3">
      <div class="row mb-1 align-items-center">
        <div class="col-md-6">
          <Breadcrumb_Com
            :homeLink="'/Home_view'"
            :breadcrumbItems="[]"
            :currentItem="'Favourite List'"
          />
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <SearchBar_Com searchType="equipname" @search="handleSearch" />
        </div>
      </div>
    </div>

    <!-- Equipment Table -->
    <div class="row">
      <div class="col-md-12">
        <div v-if="loading" class="text-center text-light">Loading...</div>
        <div v-else>
          <div v-if="paginatedItems.length === 0" class="text-center">
            <img src="@/assets/Icon/Empty_Icon.png" alt="No favorites" class="img-fluid" />
          </div>
          <div v-else>
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
                <tr v-for="item in paginatedItems" :key="item.favoriteID" @click="goToDetails(item.equipID)">
                  <td>
                    <img :src="getImagePath(item.equipImgPath)" alt="Equipment Image" class="img-thumbnail" />
                  </td>
                  <td class="truncate">{{ item.equipName }}</td>
                  <td>RM{{ formattedPrice(item.equipPrice) }}</td>
                  <td>{{ item.equipCategory }}</td>
                  <td>{{ item.equipBrand }}</td>
                  <td @click.stop="">
                    <div class="d-flex justify-content-end mr-2" style="gap: 20px;">
                      <DownloadButton :equipID="item.equipID" @error="handleError" />
                      <RemoveButton :favoriteID="item.favoriteID" @item-removed="handleItemRemoved" @error="showErrorModal" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination Controls -->
    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    />
    <!-- Error Modal -->
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>

<script src='@/javascript/User/Favorite_List.js'></script>

<style> 
.text-light {
  color: #e0e0e0; /* Light color for loading text */
}

.table-dark tbody tr:hover {
  background-color: #333;
  cursor: pointer; 
}

.img-thumbnail{
  width: 120px;
  height: 120px;
} 

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px; 
}
</style>
