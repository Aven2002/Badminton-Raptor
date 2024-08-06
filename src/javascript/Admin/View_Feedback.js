import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_feedback_btn_com.vue';
import Pagination from '@/components/Pagination_com.vue';

export default {
  name: 'View_Feedback',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    RemoveButton,
    Pagination
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 9,
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
        this.items = response.data;
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
    removeFeedbackFromList(feedbackID) {
      this.items = this.items.filter(item => item.feedbackID !== feedbackID);
    },
  }
};
