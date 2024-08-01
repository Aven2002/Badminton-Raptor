<template>
    <main class="content container">
      <div v-if="currentView === 'list'">
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
                          <UpdateButton 
                            :equipID="item.equipID" 
                            @item-update="handleItemUpdate" 
                            @error="showErrorModal" 
                            @click="editItem(item.equipID)"
                          />
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
      </div>
  
      <div v-else-if="currentView === 'edit'">
        <EditEquipmentDetailsView :equipID="selectedEquipID" @update-success="handleItemUpdate" @update-error="showErrorModal" />
      </div>
  
      <!-- Modal -->
      <ErrorModal :errorMessage="errorMessage" />
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
  import ErrorModal from '@/components/Error_modal_com.vue';
  import SearchBar_Com from '@/components/Search_bar_com.vue';
  import Navbar from '@/components/Navbar_CRUD_com.vue';
  import UpdateButton from '@/components/Update_equipment_btn_com.vue';
  import EditEquipmentDetailsView from '@/components/Edit_equipment_details_view.vue';
  
  export default {
    name: 'Update_Equipment',
    components: {
      Breadcrumb_Com,
      ErrorModal,
      SearchBar_Com,
      Navbar,
      UpdateButton,
      EditEquipmentDetailsView
    },
    data() {
      return {
        items: [],
        loading: false,
        errorMessage: '',
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 6,
        currentView: 'list',
        selectedEquipID: null,
        navItems: [
          { view: 'View', label: 'Manage Equipment', icon: 'fa-solid fa-eye', routeName: 'Manage_Equipment_view' },
          { view: 'Add', label: 'Create Equipment', icon: 'fa-solid fa-circle-plus', routeName: 'Create_equipment_view' },
          { view: 'Update', label: 'Update Equipment', icon: 'fa-solid fa-pen', routeName: 'Update_equipment_view' }
        ]
      };
    },
    created() {
      this.fetchItems();
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => item.equipName.toLowerCase().includes(this.searchQuery));
      },
      totalPages() {
        return Math.ceil(this.filteredItems.length / this.itemsPerPage);
      },
      paginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredItems.slice(start, end);
      }
    },
    methods: {
      async fetchItems() {
        this.loading = true;
        try {
          const response = await axios.get('http://localhost:3000/api/equipment');
          this.items = response.data;
        } catch (error) {
          console.error('Error fetching items:', error);
        } finally {
          this.loading = false;
        }
      },
      handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.currentPage = 1; // Reset to the first page on search
      },
      showErrorModal(message) {
        this.errorMessage = message;
        const errorModal = new Modal(document.getElementById('errorModal'));
        errorModal.show();
      },
      handleItemUpdate() {
        this.fetchItems(); // Refresh the item list after update
        this.currentView = 'list'; // Switch back to list view after update
      },
      editItem(equipID) {
        this.selectedEquipID = equipID;
        this.currentView = 'edit';
      },
      getImagePath(equipImgPath) {
        try {
          return `http://localhost:3000/assets/${equipImgPath}`;
        } catch (error) {
          console.error('Error loading image:', error);
          return require('@/assets/defaultImg.png'); // Fallback image
        }
      }
    }
  };
  </script>
  
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
  