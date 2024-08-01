import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import SearchBar_Com from '@/components/Search_bar_com.vue';
import Navbar from '@/components/Navbar_CRUD_com.vue';
import UpdateButton from '@/components/UpdateButton.vue'; // Import the UpdateButton component

export default {
  name: 'Update_Equipment',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    SearchBar_Com,
    Navbar,
    UpdateButton // Register the UpdateButton component
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 6,
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
    getImagePath(equipImgPath) {
      try {
        return `http://localhost:3000/assets/${equipImgPath}`;
      } catch (error) {
        console.error('Error loading image:', error);
        return require('@/assets/defaultImg.png'); // Fallback image
      }
    },
    async handleItemUpdate(equipID, updatedData) {
      try {
        const response = await axios.put(`http://localhost:3000/api/equipment/${equipID}`, updatedData);
        if (response.status === 200) {
          // Optionally, fetch items again to update the list
          await this.fetchItems();
          // Show success message or update the UI accordingly
        }
      } catch (error) {
        console.error('Error updating item:', error);
        this.showErrorModal('Failed to update item. Please try again.');
      }
    }
  }
};