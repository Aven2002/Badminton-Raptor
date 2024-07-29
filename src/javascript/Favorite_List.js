import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/BreadCrumb.vue';
import ConfirmationModal from '@/components/Confirmation_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import SearchBar_Com from '@/components/Search_bar_com.vue';
import Cookies from 'js-cookie';

export default {
  name: 'FavoriteList',
  components: {
    Breadcrumb_Com,
    ConfirmationModal,
    ErrorModal,
    SearchBar_Com
  },
  data() {
    return {
      favoriteItems: [],
      filteredFavoriteItems: [],
      loading: false,
      confirmationMessage: '',
      errorMessage: '',
      itemToRemove: null,
      searchQuery: '',
      userID: Cookies.get('userID') || '000'
    };
  },  
  created() {
    this.fetchFavoriteItems();
  },
  methods: {
    async fetchFavoriteItems() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/api/favorite/${this.userID}`);
        this.favoriteItems = response.data;
        this.filteredFavoriteItems = response.data;
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      } finally {
        this.loading = false;
      }
    },    
    confirmRemoveFromFavorites(favoriteID) {
      this.itemToRemove = favoriteID;
      this.showConfirmationModal('Are you sure you want to remove it from your favorite list?');
    },
    async handleConfirm() {
      if (this.itemToRemove) {
        await this.removeFromFavorites(this.itemToRemove);
        this.itemToRemove = null;
        
        // Close the confirmation modal
        const confirmationModalElement = document.getElementById('confirmationModal');
        const confirmationModal = Modal.getInstance(confirmationModalElement) || new Modal(confirmationModalElement);
        confirmationModal.hide();
      }
    },
    async removeFromFavorites(favoriteID) {
      try {
        await axios.delete(`http://localhost:3000/api/favorite/${favoriteID}`);
        this.favoriteItems = this.favoriteItems.filter(item => item.favoriteID !== favoriteID);
        this.filteredFavoriteItems = this.filteredFavoriteItems.filter(item => item.favoriteID !== favoriteID);
      } catch (error) {
        this.showErrorModal('An error occurred while removing the equipment. Please try again later.');
      }
    },
    goToDetails(productID) {
      this.$router.push({ name: 'Equipment_Details_view', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    },
    showConfirmationModal(message) {
      this.confirmationMessage = message;
      const confirmationModal = new Modal(document.getElementById('confirmationModal'));
      confirmationModal.show();
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    handleSearch(query) {
      this.searchQuery = query.toLowerCase();
      this.filteredFavoriteItems = this.favoriteItems.filter(item =>
        item.equipName.toLowerCase().includes(this.searchQuery)
      );
    }
  }
};
