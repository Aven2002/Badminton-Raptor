import axios from 'axios';
import { Toast } from 'bootstrap';
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
      itemsPerPage: 10,
      toastMessage: ''
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
 // In your script
methods: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/account');
        this.items = response.data;
        this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
      } catch (error) {
        console.error('Error fetching items:', error);
        this.errorMessage = 'Error fetching data';
      } finally {
        this.loading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query.toLowerCase();
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    handleUserUpdated(updatedUser) {
      const index = this.items.findIndex(user => user.userID === updatedUser.userID);
      if (index !== -1) {
        this.items[index] = updatedUser;
        this.showToast('User information updated successfully.');
      } else {
        this.showToast('Failed to update user information.');
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    showToast(message) {
      this.toastMessage = message;
      this.$nextTick(() => {
        const toastElement = document.getElementById('updateToast');
        if (toastElement) {
          const toast = new Toast(toastElement.querySelector('.toast'));
          toast.show();
          setTimeout(() => {
            this.toastMessage = '';
          }, 3000);
        } else {
          console.error('Toast element not found');
        }
      });
    }
  }  
};
