<template>
    <button @click="downloadPDF" class="btn download-btn">
      <i class="fa-solid fa-cloud-arrow-down"></i>
      Download 
    </button>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DownloadButton',
    props: {
      equipID: {
        type: Number,
        required: true
      }
    },
    methods: {
      async downloadPDF() {
        try {
          const response = await axios.get(`http://localhost:3000/api/equipment/${this.equipID}/details/pdf`, {
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `equipment_${this.equipID}.pdf`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error downloading PDF:', error);
          this.$emit('error', 'An error occurred while downloading the PDF. Please try again later.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .download-btn {
    background: transparent;
    border: none;
    color: #007bff;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: bold;
    display: inline-flex;
    transition: background-color 0.3s ease, color 0.3s ease;
    width:120px;
  }
  
  .download-btn i {
    margin-right: 8px;
    font-size: 15px;
  }
  
  .download-btn:hover {
    background-color: #007bff;
    color: #fff;
  }
  
  .download-btn:focus,
  .download-btn:active {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
  </style>
  