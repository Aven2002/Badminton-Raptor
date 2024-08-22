import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_recommendation_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';
import RecommendationModal from '@/components/Recommendation_modal_com.vue';

export default {
  name: 'View_Recommendation',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    RemoveButton,
    Pagination,
    RecommendationModal
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 9,
      selectedRecommendation: null
    };
  },
  created() {
    this.fetchItems();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.items.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/recommendation');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        this.loading = false;
      }
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    async removeRecommendationFromList(recommendationID) {
      try {
        await axios.delete(`http://localhost:3000/api/recommendation/${recommendationID}`);
        this.items = this.items.filter(item => item.recommendationID !== recommendationID);
      } catch (error) {
        console.error('Error removing recommendation:', error);
      }
    },
    async showRecommendationModal(item) {
        this.selectedRecommendation = item;
        try {
          const response = await axios.get(`http://localhost:3000/api/recommendation/${item.recommendationID}`);
          this.selectedRecommendation = response.data;
      
          this.$nextTick(() => {
            const modalElement = document.getElementById('recommendationModal');
            if (modalElement) {
              const recommendationModal = new Modal(modalElement);
              recommendationModal.show();
            } else {
              console.error('Modal element not found');
            }
          });
        } catch (error) {
          console.error('Error fetching recommendation details:', error);
        }
      }
      
  }
};