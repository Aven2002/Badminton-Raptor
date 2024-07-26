
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
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
      userID: Cookies.get('userID') || '000',
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
    };
  },
  computed: {
    formattedUserID() {
      // Pad userID to always be 3 digits
      return this.userID.toString().padStart(3, '0');
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/${this.userID}`);
        let userData = response.data[0];
        
        // Format date of birth to yyyy-MM-dd
        userData.dob = this.formatDateForInput(userData.dob);

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
      return new Date(date).toLocaleDateString(); // Format date as desired
    },
    async updateProfile() {
      try {
        await axios.put(`http://localhost:3000/api/account/${this.userID}`, this.user);
        alert('Profile updated successfully!');
        this.resetEditing();
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
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
  }
};