import axios from 'axios';
import { Modal } from 'bootstrap';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';

  export default {
    components: {
      SuccessModal,
      ErrorModal
    },
    data() {
      return {
        equipment: {
          equipName: '',
          equipCategory: '',
          equipBrand: '',
          equipImgPath: '',
          equipPrice: null
        },
        details: {},
        selectedFile: null,
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      showSuccessModal(message) {
        this.successMessage = message;
        const successModal = new Modal(document.getElementById('successModal'));
        successModal.show();
        successModal._element.addEventListener('hidden.bs.modal', this.resetForm);
      },
      showErrorModal(message) {
        this.errorMessage = message;
        const errorModal = new Modal(document.getElementById('errorModal'));
        errorModal.show();
        errorModal._element.addEventListener('hidden.bs.modal', this.resetForm);
      },
        handleImageUpload(event) {
  this.selectedFile = event.target.files[0];
},
      async handleSubmit() {
  const formData = new FormData();
   // Ensure equipCategory is included
   formData.append('equipCategory', this.equipment.equipCategory);
  formData.append('equipment', JSON.stringify(this.equipment));
  formData.append('details', JSON.stringify(this.details));
  formData.append('detailTable', this.getDetailTable());
  formData.append('equipImgPath', this.selectedFile);
  
  try {
    await axios.post('http://localhost:3000/api/equipment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    this.showSuccessModal('Equipment created successfully');
    this.resetForm();
  } catch (error) {
    console.error('Error creating equipment:', error);
    this.showErrorModal('Failed to create equipment. Please try again.');
  }
},
      getDetailTable() {
        switch (this.equipment.equipCategory) {
          case 'Racquet':
            return 'racquet';
          case 'Shuttlecock':
            return 'shuttlecock';
          case 'Bags':
            return 'bags';
          case 'Footwear':
            return 'footwear';
          case 'Apparel':
            return 'apparel';
          case 'Accessories':
            return 'accessories';
          default:
            return '';
        }
      },
      resetForm() {
        this.equipment = {
          equipName: '',
          equipCategory: '',
          equipBrand: '',
          equipImgPath: '',
          equipPrice: null
        };
        this.details = {};
        this.selectedFile = null;
      }
    },
  };