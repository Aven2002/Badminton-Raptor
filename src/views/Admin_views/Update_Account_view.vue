<template>
  <main class="content container">
    <div v-if="currentView === 'list'">
      <!-- Breadcrumb -->
      <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
        <Breadcrumb_Com
          :homeLink="'/Home_view'"
          :breadcrumbItems="[]"
          :currentItem="'Update Account'"
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
            <div class="table-responsive">
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                    <th scope="col">Race</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in paginatedItems" :key="item.userID">
                    <td>{{ item.userID }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.fname + ' ' + item.lname }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.contactNum }}</td>
                    <td>{{ item.gender }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.race }}</td>
                    <td>{{ item.dob }}</td>
                    <td>
                      <div class="d-flex justify-content-center" style="gap: 20px;">
                        <UpdateButton :userID="item.userID" @error="showErrorModal" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
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

  
  <script src='@/javascript/Admin_views/Update_Account'></script>
  
  <style> @import '@/style/Global.css'; </style>

  