<template>
    <main class="content container">
      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
        <Breadcrumb_Com
          :homeLink="'/Home_view'"
          :breadcrumbItems="[]"
          :currentItem="'Update Equipment'"
        />
      </div>
      
      <!-- Nav & Search Bar -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="flex-grow-1">
          <SearchBar_Com @search="handleSearch" />
        </div>
        <div class="ms-3">
          <Navbar :navItems="navItems" defaultView="Update" />
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12">
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-else>
            <div v-if="filteredItems.length === 0" class="text-center">
              <img src="@/assets/NoDataFound.png" alt="No Data Found" class="img-fluid" />
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
                  <tr v-for="item in paginatedItems" :key="item.equipID">
                    <td>
                      <img :src="getImagePath(item.equipImgPath)" alt="Equipment Image" class="img-thumbnail" @error="handleImageError" />
                    </td>
                    <td>{{ item.equipName }}</td>
                    <td>RM{{ item.equipPrice }}</td>
                    <td>{{ item.equipCategory }}</td>
                    <td>{{ item.equipBrand }}</td>
                    <td>
                    <div class="d-flex justify-content-end" style="gap: 20px;">
                      <UpdateButton :equipID="item.equipID" @item-update="handleItemUpdate(item.equipID)" @error="showErrorModal" />
                    </div>
                  </td>
                  </tr>
                </tbody>
              </table>
  
              <!-- Pagination Controls -->
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="currentPage = currentPage - 1">Previous</a>
                  </li>
                  <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage = currentPage + 1">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <ErrorModal :errorMessage="errorMessage" />
    </main>
  </template>
  
  <script src='@/javascript/Admin_views/Update_Equipment'></script>
  
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
  