import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_recommendation_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';
import RecommendationModal from '@/components/Recommendation_Details_modal_com.vue';

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
    },
    truncatedItems() {
      return this.items.map(item => {
        // Truncate equipment_ids if length exceeds 10 characters
        const maxLength = 10;
        const truncatedEquipmentIds = item.equipment_ids.length > maxLength
          ? item.equipment_ids.substring(0, maxLength) + '...'
          : item.equipment_ids;
        return { ...item, equipment_ids: truncatedEquipmentIds };
      });
    },
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
      this.$nextTick(() => {
        const errorModal = new Modal(document.getElementById('errorModal'));
        errorModal.show();
      });
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
    selectRecommendation(recommendation) {
      this.selectedRecommendation = recommendation;
      this.$nextTick(() => {
        const recommendationModal = new Modal(document.getElementById('recommendationModal'));
        recommendationModal.show();
      });
    }
  }
};