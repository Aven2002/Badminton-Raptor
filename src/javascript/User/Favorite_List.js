import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import SearchBar_Com from '@/components/Search_Bar_com.vue';
import DownloadButton from '@/components/Download_btn_com.vue';
import RemoveButton from '@/components/Remove_favorite_btn_com.vue';
import Cookies from 'js-cookie';
import Pagination from '@/components/Pagination_com.vue';

export default {
  name: 'FavoriteList',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    SearchBar_Com,
    DownloadButton,
    RemoveButton,
    Pagination
  },
  data() {
    return {
      favoriteItems: [],
      filteredFavoriteItems: [], // Added this line
      loading: false,
      errorMessage: '',
      searchQuery: '',
      userID: Cookies.get('userID') || '000',
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.fetchFavoriteItems();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredFavoriteItems.length / this.itemsPerPage); // Updated to use filteredFavoriteItems
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredFavoriteItems.slice(start, end); // Updated to use filteredFavoriteItems
    },
  },  
  methods: {
    async fetchFavoriteItems() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/api/favorite/${this.userID}`);
        this.favoriteItems = response.data;
        this.filteredFavoriteItems = response.data; // Initialize filtered items
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      } finally {
        this.loading = false;
      }
    },
    goToDetails(productID) {
      this.$router.push({ name: 'Equipment_Details_view', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    },
    handleSearch(query) {
      this.searchQuery = query.toLowerCase();
      this.filteredFavoriteItems = this.favoriteItems.filter(item =>
        item.equipName.toLowerCase().includes(this.searchQuery)
      );
      this.currentPage = 1; // Reset to first page after search
    },
    handleError(errorMessage) {
      this.errorMessage = errorMessage;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    handleItemRemoved(favoriteID) {
      this.favoriteItems = this.favoriteItems.filter(item => item.favoriteID !== favoriteID);
      this.filteredFavoriteItems = this.filteredFavoriteItems.filter(item => item.favoriteID !== favoriteID);
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    formattedPrice(price) {
      return price.toFixed(2);
    },
    handlePageChange(page) {
      this.currentPage = page;
    }
  }
};