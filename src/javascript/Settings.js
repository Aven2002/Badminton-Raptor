import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import { Modal } from 'bootstrap';
import Cookies from 'js-cookie';

export default {
  components: {
    Breadcrumb_Com,
    SuccessModal,
    ErrorModal
  },
  data() {
    return {
      user: {
        username: '',
        fname: '',
        lname: '',
        email: '',
        contactNum: '',
        dob: '',
        gender: '',
        age: '',
        race: '',
        profileImg: ''
      },
      userID: Cookies.get('userID'),
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
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    formattedUserID() {
      const userID = Cookies.get('userID');
      return userID ? `${userID}` : '???';
    }
  },
  mounted() {
    this.checkLoginStatus();
  },
  created() {
    if (this.userID) {
      this.fetchUserInfo(this.userID);
    }
  },
  methods: {
    checkLoginStatus() {
      const userID = Cookies.get('userID');
      if (!userID) {
        this.showErrorModal("You are not logged in");
      } else {
        this.fetchUserInfo(userID);
      }
    },
    async fetchUserInfo(userID) {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/${userID}`);
        let userData = response.data[0] || {}; 
        userData.profileImg = userData.profileImg || require('@/assets/Profile_Img/Profile_Img_Default.png');
        userData.dob = userData.dob ? this.formatDateForInput(userData.dob) : '';
        this.user = userData;
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    formatDateForInput(date) {
      if (!date) return '';
      const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
      return `${year}-${month}-${day}`;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(); 
    },
    async updateProfile() {
      try {
        await axios.put(`http://localhost:3000/api/account/${this.userID}`, this.user);
        this.showSuccessModal('Your profile updated successfully!');
        this.resetEditing();
      } catch (error) {
        this.showErrorModal('An error occurred while updating. Please try again later.');
      }
    },
    selectProfileImage(img) {
      this.user.profileImg = img;
      this.editingProfileImage = false; 
      this.editMode = true; 
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    resetEditing() {
      this.editMode = false;
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
    },
    showErrorModal(message) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
      document.getElementById('errorModal').addEventListener('hidden.bs.modal', () => {
        this.$router.push('/home_view_user');
      });
    }
  }
};
