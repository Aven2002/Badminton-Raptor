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