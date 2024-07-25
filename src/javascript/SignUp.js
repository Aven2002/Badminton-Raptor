import axios from 'axios';

export default {
  data() {
    return {
      step: 1,
      form: {
        profileImg: require('@/assets/Profile_Img/Profile_Img_Default.png'),
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        race: '',
        contactNum: '',
        dob: ''
      },
      profileImgs: [
        require('@/assets/Profile_Img/Profile_Img_01.png'),
        require('@/assets/Profile_Img/Profile_Img_02.png'),
        require('@/assets/Profile_Img/Profile_Img_03.png'),
        require('@/assets/Profile_Img/Profile_Img_04.png')
      ]
    };
  },
  methods: {
    selectProfileImg(img) {
      this.form.profileImg = img;
    },
    nextStep() {
      this.step = 2;
    },
    async signUp() {
      try {
        const response = await axios.post('http://localhost:3000/api/account', this.form);

        if (response.data && response.data.id) {
          alert('Account Created Successfully');
        } else {
          this.errorMessage = 'Error to create account';
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Server Error:', error.response.data);
          this.errorMessage = `Error: ${error.response.data.message || 'An error occurred'}`;
        } else if (error.request) {
          // No response was received from the server
          console.error('No response received:', error.request);
          this.errorMessage = 'No response from the server. Please try again later.';
        } else {
          // An error occurred while setting up the request
          console.error('Error setting up request:', error.message);
          this.errorMessage = 'Error setting up the request. Please try again later.';
        }
      }
      console.log('Signup button clicked');
      console.log('Form Data:', this.form);
    },
  }
};