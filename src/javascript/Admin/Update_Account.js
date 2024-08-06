import axios from 'axios';
import SearchBar_Com from '@/components/Search_Bar_com.vue';
import UpdateButton from '@/components/Update_account_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';

export default {
  components: {
    SearchBar_Com,
    UpdateButton,
    Pagination,
    ErrorModal
  },
  data() {
    return {
      items: [],
      loading: true,
      errorMessage: '',
      currentPage: 1,
      totalPages: 1,
      searchQuery: '',
      itemsPerPage: 10 // Added itemsPerPage
    };
  },
  created() {
    this.fetchItems();
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.username.toLowerCase().includes(this.searchQuery));
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
        this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage); // Update totalPages based on filtered items
      } catch (error) {
        console.error('Error fetching items:', error);
        this.errorMessage = 'Error fetching data';
      } finally {
        this.loading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query.toLowerCase();
      this.currentPage = 1; // Reset to the first page on search
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage); // Update totalPages on search
    },
    handleUserUpdated(updatedUser) {
        const index = this.items.findIndex(user => user.userID === updatedUser.userID);
        if (index !== -1) {
          // Directly update the item
          this.items[index] = updatedUser;
        }
      },
    handlePageChange(page) {
      this.currentPage = page;
    }
  }
};