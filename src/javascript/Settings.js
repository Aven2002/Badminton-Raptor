import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import { Modal } from 'bootstrap';
import Cookies from 'js-cookie';
import validation from '@/utils/Validation.js';

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
      errors: {}, // For form validation errors
      userID: Cookies.get('userID'),
      profileImages: [
        require('@/assets/Profile_Img/Profile_Img_01.png'),
        require('@/assets/Profile_Img/Profile_Img_02.png'),
        require('@/assets/Profile_Img/Profile_Img_03.png'),
        require('@/assets/Profile_Img/Profile_Img_04.png')
      ],
      fields: [
        { key: 'username', label: 'Username', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'fname', label: 'First Name', type: 'text' },
        { key: 'lname', label: 'Last Name', type: 'text' },
        { key: 'contactNum', label: 'Contact Number', type: 'text' },
        { key: 'dob', label: 'Date of Birth', type: 'date' },
        { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Not Specify'] },
        { key: 'race', label: 'Race', type: 'select', options: ['Chinese', 'Malay', 'Indian', 'Other'] },
      ],
      editingProfileImage: false,
      editMode: false,
      errorMessage: '',
      successMessage: '',
        // Separate state for username and email edit mode
        usernameEditMode: false,
        emailEditMode: false
    };
  },
  computed: {
    formattedUserID() {
      const userID = Cookies.get('userID');
      return userID ? `${userID}` : '???';
    },
    age() {
      return this.calculateAge(this.user.dob);
    }
  },
  watch: {
    'user.dob': function(newDob) {
      this.user.age = this.calculateAge(newDob);
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
    calculateAge(dob) {
      if (!dob) return 0;
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      return age;
    },
    checkLoginStatus() {
      const userID = Cookies.get('userID');
      if (!userID) {
        this.showErrorModal("You are not logged in");
      } else {
        this.fetchUserInfo(userID);
      }
    },
    async validateForm() {
      this.errors = {}; // Clear previous errors
    
      try {
        // Validate fields in the user object
        const passwordError = validation.validatePassword(this.user.password); 
        const fnameError = validation.validateFName(this.user.fname);
        const lnameError = validation.validateLName(this.user.lname);
        const contactNumError = validation.validatePhoneNumber(this.user.contactNum);
        const dobError = validation.validateDOB(this.user.dob);
    
        // Assign errors to their respective fields
        if (passwordError) this.errors.password = passwordError;
        if (fnameError) this.errors.fname = fnameError;
        if (lnameError) this.errors.lname = lnameError;
        if (contactNumError) this.errors.contactNum = contactNumError;
        if (dobError) this.errors.dob = dobError;
    
        // Return true if no errors
        return !Object.keys(this.errors).length;
      } catch (error) {
        console.error('Validation error:', error);
        return false;
      }
    }
    , 
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
      // Call validateForm to check for validation errors
      const isFormValid = await this.validateForm();
      if (!isFormValid) {
        this.showErrorModal('Please fix the validation errors before submitting.');
      }else{
        // Recalculate age before updating profile
         this.user.age = this.calculateAge(this.user.dob);
        try {
          await axios.put(`http://localhost:3000/api/account/${this.userID}`, this.user);
          this.showSuccessModal('Your profile updated successfully!');
          this.resetEditing();
        } catch (error) {
          this.showErrorModal('An error occurred while updating. Please try again later.');
        }
      } 
    }
    ,
    selectProfileImage(img) {
      this.user.profileImg = img;
      this.editingProfileImage = false; 
      this.editMode = true; 
    },
    toggleEditMode() {
      this.editMode = !this.editMode;

      // Set username and email edit mode based on current overall edit mode
      if (this.editMode) {
        this.usernameEditMode = true;
        this.emailEditMode = true;
      } else {
        this.usernameEditMode = false;
        this.emailEditMode = false;
      }
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
    }
  }
};
