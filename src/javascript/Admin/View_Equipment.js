import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import SearchBar_Com from '@/components/Search_Bar_com.vue';
import RemoveButton from '@/components/Remove_equipment_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';

export default {
  name: 'View_Equipment',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    SearchBar_Com,
    RemoveButton,
    Pagination
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
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
    async handleItemRemoved(equipID) {
      try {
        await axios.delete(`http://localhost:3000/api/equipment/${equipID}`);
        this.items = this.items.filter(item => item.equipID !== equipID);
      } catch (error) {
        console.error('Error deleting item:', error);
        this.showErrorModal('Failed to delete item. Please try again.');
      }
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    getImagePath(equipImgPath) {
      try {
         return `http://localhost:3000/assets/${equipImgPath}`
      } catch (error) {
        console.error('Error loading image:', error);
        return require('@/assets/Icon/Default_Img_Icon.png'); // Fallback image
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    }
  }
};