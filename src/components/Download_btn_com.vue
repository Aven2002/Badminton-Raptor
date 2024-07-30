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
  padding: 5px 10px; /* Smaller padding */
  font-size: 12px;
  font-weight: bold;
  display: inline-flex;
  align-items: center; /* Center icon and text vertically */
  justify-content: center; /* Center icon and text horizontally */
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 90px; /* Smaller width */
}

.download-btn i {
  margin-right: 4px; /* Smaller margin */
  font-size: 12px; /* Smaller icon size */
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

  