<template>
  <main class="content container">
    <!-- Search Bar -->
    <div class="d-flex flex-column flex-md-row justify-content-end mb-2">
      <SearchBar_Com searchType="username" @search="handleSearch" />
    </div>

    <div>
      <div class="row">
        <div class="col-md-12">
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-else>
            <div v-if="items.length === 0" class="text-center">
              <img src="@/assets/Icon/Empty_Icon.png" alt="Empty Icon" class="img-fluid" />
            </div>
            <div v-else>
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
                          <UpdateButton
                            :userID="item.userID"
                            :userData="item"
                            @user-updated="handleUserUpdated"
                          />
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
      <div id="updateToast" class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast toast-success" role="alert" aria-live="assertive" aria-atomic="true" v-if="toastMessage">
          <div class="toast-body">
            {{ toastMessage }}
          </div>
        </div>
      </div>
      <ErrorModal :errorMessage="errorMessage" />
    </div>
  </main>
</template>

<script src='@/javascript/Admin/Update_Account.js'></script>


<style>
@import '@/style/Global_style.css';

.btn.btn-transparent {
color: black;
}

.btn.btn-transparent:hover {
background-color: darkgray;
color: black;
}

.toast-success {
  background-color: #28a745; /* Green background */
  color: #fff; /* White text */
}

.toast-success .toast-body {
  color: #fff; /* Ensure the text inside the toast is white */
}
</style>
