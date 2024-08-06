import axios from 'axios';
import { Modal } from 'bootstrap';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_account_btn_com.vue';
import SearchBar_Com from '@/components/Search_Bar_com.vue';
import Pagination from '@/components/Pagination_com.vue';

export default {
  name: 'Manage_Account',
  components: {
    ErrorModal,
    SearchBar_Com,
    RemoveButton,
    Pagination
  },
  data() {
    return {
      items: [],
      filteredItems: [],
      loading: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 9,
      searchData: ''
    };
  },
  created() {
    this.fetchItems();
  },
  computed: {
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
        const response = await axios.get('http://localhost:3000/api/account');
        this.items = response.data;
        this.filteredItems = this.items;
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
    async handleItemRemoved(userID) {
      try {
        await axios.delete(`http://localhost:3000/api/account/${userID}`);
        this.items = this.items.filter(item => item.userID !== userID);
        this.filteredItems = this.filteredItems.filter(item => item.userID !== userID);
      } catch (error) {
        console.error('Error deleting item:', error);
        this.showErrorModal('Failed to delete account. Please try again.');
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSearch(searchQuery) {
      const query = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.username.toLowerCase().includes(query)
      );
      this.currentPage = 1; // Reset to first page after search
    }
  }  
};