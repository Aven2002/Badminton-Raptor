<template>
  <main class="content container">
    <!-- Breadcrumb -->
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center custom-breadcrumb mb-3">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Manage Equipment'"
      />
    </div>
    
    <!-- Nav & Search Bar -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
      <div class="flex-grow-1 mb-3 mb-md-0">
        <SearchBar_Com @search="handleSearch" />
      </div>
      <div class="ms-md-3">
        <Navbar :navItems="navItems" defaultView="View" />
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
            <div class="table-responsive">
              <table class="table table-dark ">
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
                      <div class="d-flex justify-content-center" style="gap: 20px;">
                        <RemoveButton :equipID="item.equipID" @item-removed="handleItemRemoved(item.equipID)" @error="showErrorModal" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <nav aria-label="Page navigation" class="mt-3">
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

<script src='@/javascript/Admin_views/Manage_Equipment'></script>

<style> @import '@/style/Global.css'; </style>
