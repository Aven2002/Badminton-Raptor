import axios from 'axios';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';
import { Toast, Modal } from 'bootstrap';

export default {
  name:'Sign_Up_view',
  components: {
    SuccessModal,
    ErrorModal,
    BackBtn
  },
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
      successMessage: '',
      errorMessage: ''
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
          this.showToast('Account created successfully!', 'success');
          this.showSuccessModal('Your account created successfully! Kindly use your credential to login');
        } else {
          this.showErrorModal('An error occurred while submitting. Please try again later.');
        }
      } catch (error) {
        console.log('Error response:', error.response); // Log error response for debugging
        
        if (error.response && error.response.status == 400) {
          this.showErrorModal('Username has been taken. Please choose a new username.', false);
          this.step--; // Revert to the previous step if the username is taken
        } else {
          console.error('Error:', error);
          this.showErrorModal('An error occurred while submitting. Please try again later.');
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
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
      
      // Add event listener for the modal hidden event
      successModal._element.addEventListener('hidden.bs.modal', () => {
        this.$router.push('/Login_view');
      });
    },
    showErrorModal(message, redirect = true) {
      this.errorMessage = message;
      const errorModal = new Modal(document.getElementById('errorModal'));
      errorModal.show();
  
      // Only add the event listener for redirection if `redirect` is true
      if (redirect) {
        errorModal._element.addEventListener('hidden.bs.modal', () => {
          this.$router.push('/');
        });
      }
    },
  }
};
