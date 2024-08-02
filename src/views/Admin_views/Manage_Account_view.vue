<template>
    <main class="content container">
      <!-- Breadcrumb -->
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center custom-breadcrumb mb-3">
        <Breadcrumb_Com
          :homeLink="'/Home_view'"
          :breadcrumbItems="[]"
          :currentItem="'Manage Account'"
        />
      </div>
      
      <!-- Nav Bar and Button -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
      <div class="d-flex justify-content-between w-100 align-items-center">
        <router-link to="/SignUp_view" class="btn btn-transparent">
          Create Account
        </router-link>
        <Navbar :navItems="navItems" defaultView="View" @view-change="changeView" />
      </div>
    </div>
  
      <div>
        <div class="row">
          <div class="col-md-12">
            <div v-if="loading" class="text-center">Loading...</div>
            <div v-else>
              <div v-if="items.length === 0" class="text-center">
                <img src="@/assets/NoDataFound.png" alt="No Data Found" class="img-fluid" />
              </div>
              <div v-else>
                <div class="table-responsive">
                  <table class="table table-dark ">
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
                            <RemoveButton :userID="item.userID"  @error="showErrorModal" />
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
        <ErrorModal :errorMessage="errorMessage" />
      </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
  import ErrorModal from '@/components/Error_modal_com.vue';
  import RemoveButton from '@/components/Remove_account_btn_com.vue';
  import Navbar from '@/components/Navbar_CRUD_com.vue';
  
  export default {
    name: 'Manage_Account',
    components: {
      Breadcrumb_Com,
      ErrorModal,
      RemoveButton,
      Navbar,
    },
    data() {
      return {
        items: [],
        loading: false,
        errorMessage: '',
        currentPage: 1,
        itemsPerPage: 6,
        currentView: 'View',
        navItems: [
          { view: 'View', label: 'Manage Account', icon: 'fa-solid fa-eye', routeName: 'Manage_Account_view' },
          { view: 'Update', label: 'Update Account', icon: 'fa-solid fa-pen', routeName: 'Update_Account_view' }
        ]
      };
    },
    created() {
      this.fetchItems();
    },
    computed: {
      totalPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
      paginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
      }
    },
    methods: {
      async fetchItems() {
        this.loading = true;
        try {
          const response = await axios.get('http://localhost:3000/api/account');
          this.items = response.data;
        } catch (error) {
          console.error('Error fetching items:', error);
        } finally {
          this.loading = false;
        }
      },
      showErrorModal(message) {
        this.errorMessage = message;
        const errorModal = new Modal(document.getElementById('errorModal'));
        errorModal.show();
      },
      changeView(view) {
        this.currentView = view;
      }
    }
  };
  </script>
  
  <style>
  @import '@/style/Global.css';

  .btn.btn-transparent {
  color: black;
}

.btn.btn-transparent:hover {
  background-color: darkgray;
  color: black;
}

  </style>
  