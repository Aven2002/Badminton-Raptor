import axios from 'axios';
import { Modal } from 'bootstrap';
import ErrorModal from '@/components/Error_modal_com.vue';
import SearchBar_Com from '@/components/Search_Bar_com.vue';
import RemoveButton from '@/components/Remove_equipment_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';
import EquipmentDetailsModal from '@/components/Equipment_Details_modal_com.vue';

export default {
  name: 'View_Equipment',
  components: {
    ErrorModal,
    SearchBar_Com,
    RemoveButton,
    Pagination,
    EquipmentDetailsModal
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      selectedEquipment: null
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
    },
    async selectEquipment(equipment) {
      this.selectedEquipment = equipment;
    
      if (this.selectedEquipment) {
        try {
          const response = await axios.get(`http://localhost:3000/api/equipment/${this.selectedEquipment.equipID}/details`);
    
          this.selectedEquipment = { ...this.selectedEquipment, ...response.data };
        } catch (error) {
          console.error('Error fetching additional details:', error);
        }
      }
    
      this.$nextTick(() => {
        const modalElement = document.getElementById('equipmentDetailsModal');
    
        if (modalElement) {
          const equipmentDetailsModal = Modal.getInstance(modalElement) || new Modal(modalElement);
          equipmentDetailsModal.show();
        } else {
          console.error("Modal element not found!");
        }
      });
    }
    
  }
};