import axios from 'axios';
import { Modal } from 'bootstrap';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import RemoveButton from '@/components/Remove_account_btn_com.vue';
import Navbar from '@/components/Navbar_CRUD_com.vue'
import SignUp_view from '@/views/User_views/SignUp_view.vue'

export default {
  name: 'Manage_Account',
  components: {
    Breadcrumb_Com,
    ErrorModal,
    RemoveButton,
    Navbar,
    SignUp_view
  },
  data() {
    return {
      items: [],
      loading: false,
      errorMessage: '',
      currentPage: 1,
      itemsPerPage: 6,
      navItems: [
        { view: 'View', label: 'Manage Accountt', icon: 'fa-solid fa-eye', routeName: 'Manage_Account_view' },
        { view: 'Add', label: 'Create Account', icon: 'fa-solid fa-circle-plus', routeName: 'SignUp_view' },
        { view: 'Update', label: 'Update Account', icon: 'fa-solid fa-pen', routeName: 'Update_Account_view' }
      ]
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
        const response = await axios.get('http://localhost:3000/api/account');
        this.items = response.data;
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
  }
};