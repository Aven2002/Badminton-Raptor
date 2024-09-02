import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_feedback_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';
import FeedbackModal from '@/components/Feedback_Details_modal_com.vue';

export default {
  name: 'View_Feedback',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    RemoveButton,
    Pagination,
    FeedbackModal
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 9,
      selectedFeedback: null
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
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    }
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/feedback');
        this.items = response.data.map(item => {
          item.rowStyle = item.status === 0 ? { backgroundColor: '#555' } : {};
          return item;
        });
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
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
    async removeFeedbackFromList(feedbackID) {
      try {
        await axios.delete(`http://localhost:3000/api/feedback/${feedbackID}`);
        this.items = this.items.filter(item => item.feedbackID !== feedbackID);
      } catch (error) {
        console.error('Error removing feedback:', error);
      }
    },
    async showFeedbackModal(feedback) {
      this.selectedFeedback = feedback;
      await this.updateFeedbackStatus(feedback.feedbackID);
      const feedbackModal = new Modal(document.getElementById('feedbackDetailsModal'));
      feedbackModal.show();
    },
    async updateFeedbackStatus(feedbackID) {
      try {
        await axios.put(`http://localhost:3000/api/feedback/${feedbackID}`);
        const feedback = this.items.find(item => item.feedbackID === feedbackID);
        if (feedback) feedback.status = 1;
        await this.fetchItems();
      } catch (error) {
        console.error('Error updating feedback status:', error);
      }
    }
  }
};