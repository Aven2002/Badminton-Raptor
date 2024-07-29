<template>
  <main class="content container">
    <!-- Breadcrumb -->
    <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Favourite List'"
      />
    </div>
    
    <!-- Search Bar -->
    <div class="mb-3">
      <SearchBar_Com @search="handleSearch" />
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <h2>Favorites</h2>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="filteredFavoriteItems.length === 0" class="text-center">
            <img src="@/assets/Empty.png" alt="No favorites" class="img-fluid" />
          </div>
          <div v-else>
            <table class="table table-hover">
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
                <tr v-for="item in filteredFavoriteItems" :key="item.favoriteID" @click="goToDetails(item.equipID)">
                  <td>
                    <img :src="getImagePath(item.equipImgPath)" alt="Equipment Image" class="img-thumbnail" />
                  </td>
                  <td>{{ item.equipName }}</td>
                  <td>RM{{ item.equipPrice }}</td>
                  <td>{{ item.equipCategory }}</td>
                  <td>{{ item.equipBrand }}</td>
                  <td>
                    <button class="btn btn-danger" @click.stop="confirmRemoveFromFavorites(item.favoriteID)">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
    <ConfirmationModal :confirmationMessage="confirmationMessage" @confirm="handleConfirm" />
  </main>
</template>

  
  <script src='@/javascript/Favorite_List.js'></script>
  
  <style scoped>
  .img-thumbnail {
    width: 100px;
    height: auto;
  }
  .table-hover tbody tr:hover {
    cursor: pointer;
  }
  .table th, .table td {
    text-align: center;
  }
  </style>
  