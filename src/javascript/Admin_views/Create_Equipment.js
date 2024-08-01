import axios from 'axios';
  
  export default {
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
        selectedFile: null
      };
    },
    methods: {
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
    alert('Equipment created successfully');
    this.resetForm();
  } catch (error) {
    console.error('Error creating equipment:', error);
    alert('Failed to create equipment. Please try again.');
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
    }
  };