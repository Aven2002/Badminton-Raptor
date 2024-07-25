import axios from 'axios';
import { Toast, Modal } from 'bootstrap';

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
      ],
      errorMessage: '',
      showUsernameInput: false
    };
  },
  computed: {
    isStep2Valid() {
      return this.form.fname && this.form.lname && this.form.username &&
             this.form.email && this.form.password && this.form.gender &&
             this.form.age && this.form.race && this.form.contactNum && this.form.dob;
    }
  },
  methods: {
    goToStep(step) {
      if (step <= this.step || (step === 2 && this.isStep2Valid) || step === 3) {
        this.step = step;
      }
    },
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    selectProfileImg(img) {
      this.form.profileImg = img;
    },
    async signUp() {
      try {
        const response = await axios.post('http://localhost:3000/api/account', this.form);
        
        if (response.data && response.data.id) {
          // Show success toast and redirect to login
          this.showToast('Account created successfully!', 'success');
          setTimeout(() => {
            this.$router.push('/Login_view');
          }, 2000);
        } else {
          this.errorMessage = 'Error creating account';
        }
      } catch (error) {
        console.log('Error response:', error.response); // Log error response for debugging
        if (error.response && error.response.status == 400) {
            this.errorMessage = 'Username has been taken. Please choose a new username.';
            this.showUsernameInput = true;
            // Show the modal with error message
            const errorModal = new Modal(document.getElementById('errorModal'));
            errorModal.show();
        } else {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          const errorModal = new Modal(document.getElementById('errorModal'));
          errorModal.show();
        }
      }
    },     
    showToast(message, type) {
      const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
      const toastContainer = document.createElement('div');
      toastContainer.innerHTML = toastHTML;
      document.body.appendChild(toastContainer);
      const toast = new Toast(toastContainer.querySelector('.toast'));
      toast.show();
    }
  }
};