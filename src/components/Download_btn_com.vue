<template>
    <button @click="downloadPDF" class="custom-button-primary mt-2">
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
    
    