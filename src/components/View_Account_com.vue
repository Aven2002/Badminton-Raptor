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
              <div class="table-container">
                <table class="custom-table-dark">
                  <thead>
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Username</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="item in paginatedItems" 
                      :key="item.userID" 
                      @click="selectAccount(item)"
                    >
                      <td>{{ item.userID }}</td>
                      <td>{{ item.username }}</td>
                      <td>{{ item.fname + ' ' + item.lname }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.contactNum }}</td>
                      <td @click.stop>
                        <div class="d-flex justify-content-center" style="gap: 20px;">
                          <RemoveButton :userID="item.userID"  @error="showErrorModal" />
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
      <AccountDetailsModal
        v-if="selectedAccount"
        :account="selectedAccount"
        @close="selectedAccount = null"
      />
      <ErrorModal :errorMessage="errorMessage" />
    </div>
  </main>
</template>

<script src='@/javascript/Admin/View_Account.js'></script>


