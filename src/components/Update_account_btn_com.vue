<template>
    <div>
      <button class="custom-button-success mt-2" @click="showModal">
        <i class="fa-solid fa-pen"></i>
        <span class="button-text">UPDATE</span>
      </button>
  
      <!-- Bootstrap Modal -->
      <div class="modal fade" :id="`updateModal-${userID}`" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="`updateModalLabel-${userID}`">Update User Info</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Left Side: Profile Image -->
              <div class="row">
                <div class="col-md-4 text-center mb-4">
                  <div class="profile-img-container">
                    <img :src="user.profileImg || require('@/assets/Profile_Img/Profile_Img_Default.png')" class="img-fluid rounded-circle" alt="Profile Image" />
                  </div>
                  <button v-if="!editingProfileImage" type="button" class="btn btn-outline-light mt-3" @click="editingProfileImage = true">Edit Profile Image</button>
                  <div v-if="editingProfileImage">
                    <div v-for="img in profileImages" :key="img" class="profile-img-option" @click="selectProfileImage(img)">
                      <img :src="img" class="img-thumbnail" alt="Profile Image Option" />
                    </div>
                    <button type="button" class="btn btn-secondary mt-3" @click="editingProfileImage = false">Cancel</button>
                  </div>
                </div>
  
                <!-- Right Side: User Info -->
                <div class="col-md-8">
                  <form @submit.prevent="updateUser">
                    <div class="row">
                      <div class="col-md-6 mb-3" v-for="(field, index) in fields" :key="index">
                        <label :for="field.key" class="form-label">{{ field.label }}:</label>
                        <template v-if="field.type === 'select'">
                          <select :id="field.key" class="form-select" v-model="user[field.key]">
                            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                          </select>
                        </template>
                        <template v-else>
                          <input :type="field.type" :id="field.key" class="form-control" v-model="user[field.key]" />
                        </template>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bootstrap Toast for Notifications -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast" :id="`updateToast-${userID}`" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'UpdateButton',
    props: {
      userID: {
        type: Number,
        required: true
      },
      userData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        user: { ...this.userData },
        profileImages: [
          require('@/assets/Profile_Img/Profile_Img_01.png'),
          require('@/assets/Profile_Img/Profile_Img_02.png'),
          require('@/assets/Profile_Img/Profile_Img_03.png'),
          require('@/assets/Profile_Img/Profile_Img_04.png')
        ],
        fields: [
          { key: 'username', label: 'Username', type: 'text' },
          { key: 'fname', label: 'First Name', type: 'text' },
          { key: 'lname', label: 'Last Name', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'contactNum', label: 'Contact Number', type: 'text' },
          { key: 'dob', label: 'Date of Birth', type: 'date' },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Not Specify'] },
          { key: 'race', label: 'Race', type: 'select', options: ['Chinese', 'Malay', 'Indian', 'Other'] },
          { key: 'age', label: 'Age', type: 'number' },
        ],
        editingProfileImage: false,
        editMode: false,
        toastMessage: ''
      };
    },
    methods: {
      showModal() {
        this.fetchUserInfo();
        const modal = new Modal(document.getElementById(`updateModal-${this.userID}`));
        modal.show();
      },
      async fetchUserInfo() {
        try {
          const response = await axios.get(`http://localhost:3000/api/account/${this.userID}`);
          let userData = response.data[0] || {};
          userData.profileImg = userData.profileImg || require('@/assets/Profile_Img/Profile_Img_Default.png');
          userData.dob = userData.dob ? this.formatDateForInput(userData.dob) : '';
          this.user = userData;
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      formatDateForInput(date) {
        return new Date(date).toISOString().split('T')[0];
      },
      async updateUser() {
  try {
    const response = await axios.put(`http://localhost:3000/api/account/${this.userID}`, this.user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Update successful:', response.data);
    const modal = Modal.getInstance(document.getElementById(`updateModal-${this.userID}`));
    modal.hide();
    this.$emit('user-updated', this.user);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server response error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    console.error('Axios error config:', error.config);
  }
}
,
      selectProfileImage(img) {
        this.user.profileImg = img;
        this.editingProfileImage = false;
        this.editMode = true;
      },
    }
  };
  </script>
  
  <style scoped>
  .btn-update {
    background-color: #42f566;
    border: none;
    color: #1e5c1f;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 90px;
    border-radius: 10px;
  }
  
  .btn-update:hover {
    background-color: #7cde9a;
    border: solid #1e5c1f 1px;
  }

  /* Dark theme for the Bootstrap modal */
.modal-content {
  background-color: #343a40; /* Dark background for the modal */
  color: #ffffff; /* White text color */
}

.modal-header {
  border-bottom: 1px solid #6c757d; /* Slightly lighter border */
}

.modal-title {
  color: #ffffff; /* White title text */
}

.modal-body {
  color: #e9ecef; /* Light gray text color */
}

.btn-close {
  filter: invert(100%); /* Invert colors for the close button to fit the dark theme */
}

.modal-footer {
  border-top: 1px solid #6c757d; /* Slightly lighter border */
}

.btn-primary {
  background-color: #007bff; /* Primary button background color */
  border: none; /* Remove border */
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker shade for hover effect */
}

.form-control,
.form-select {
  background-color: #495057; /* Dark background for input fields */
  color: #ffffff; /* White text color */
  border: 1px solid #6c757d; /* Light border */
}

.form-control::placeholder,
.form-select option {
  color: #adb5bd; /* Light gray placeholder text */
}

  </style>
  