import axios from 'axios';
import SuccessModal from '@/components/Success_modal_com.vue';
import ErrorModal from '@/components/Error_modal_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';
import { Toast, Modal } from 'bootstrap';
import validation from '@/utils/Validation.js';

export default {
  name: 'Sign_Up_view',
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
        age: 0,
        race: '',
        contactNum: '',
        dob: '',
        securityQuestions: ['', '', ''],
        answers: ['', '', '']
      },
      errors: {}, // For form validation errors
      securityQuestions: [],
      profileImgs: [
        require('@/assets/Profile_Img/Profile_Img_01.png'),
        require('@/assets/Profile_Img/Profile_Img_02.png'),
        require('@/assets/Profile_Img/Profile_Img_03.png'),
        require('@/assets/Profile_Img/Profile_Img_04.png')
      ],
      successMessage: '',
      errorMessage: '',
      showPassword: false
    };
  },
  computed: {
    isStep2Valid() {
      return this.form.fname && this.form.lname && this.form.username &&
             this.form.email && this.form.password && this.form.gender &&
             this.form.race && this.form.contactNum && this.form.dob;
    },
    isStep4Valid() {
      return this.form.securityQuestions.every(q => q) && this.form.answers.every(a => a);
    },
    age() {
      if (!this.form.dob) return 0;
      const dob = new Date(this.form.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    },
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordToggleIcon() {
      return this.showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    }
  },
  methods: {
    goToStep(step) {
      if (step <= this.step || (step === 2 && this.isStep2Valid) || step === 3) {
        this.step = step;
      }
    },
    async nextStep() {
      try {
        if (this.step === 2) {
          const isValid = await this.validateForm(); // Ensure validateForm() completes
          if (isValid) {
            this.step++;
          } else {
            console.log('Validation failed. Current errors:', this.errors); // Debugging
          }
        } else if (this.step === 4) {
          if (this.isStep4Valid) { // Ensure this is calculated correctly
            this.step++;
          } else {
            this.showErrorModal('Please fill in all security questions and answers.');
          }
        } else if (this.step < 4) {
          this.step++;
        }
      } catch (error) {
        console.error('Error during step transition:', error);
        this.showErrorModal('An error occurred during step transition.');
      }
    },    
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    selectProfileImg(img) {
      this.form.profileImg = img;
    },
    async validateForm() {
      this.errors = {}; // Clear previous errors
    
      try {
        const usernameError = await validation.validateUsername(this.form.username);
        const emailError = await validation.validateEmail(this.form.email);
        const passwordError = validation.validatePassword(this.form.password);
        const fnameError = validation.validateFName(this.form.fname);
        const lnameError = validation.validateLName(this.form.lname);
        const contactNumError = validation.validatePhoneNumber(this.form.contactNum);
        const dobError = validation.validateDOB(this.form.dob);
    
        if (usernameError) this.errors.username = usernameError;
        if (emailError) this.errors.email = emailError;
        if (passwordError) this.errors.password = passwordError;
        if (fnameError) this.errors.fname = fnameError;
        if (lnameError) this.errors.lname = lnameError;
        if (contactNumError) this.errors.contactNum = contactNumError;
        if (dobError) this.errors.dob = dobError;
    
        return !Object.keys(this.errors).length;
      } catch (error) {
        console.error('Validation error:', error);
        return false;
      }
    },    
    async signUp() {
      // Format security answers for API
      const securityAnswers = this.form.securityQuestions.map((question, index) => ({
        questionID: this.securityQuestions.find(q => q.question === question)?.id || null,
        answer: this.form.answers[index]
      }));
      
      const payload = {
        ...this.form,
        age: this.age, 
        securityAnswers
      };

      try {
        const response = await axios.post('http://localhost:3000/api/account/createAccount', payload);
  
        if (response.data && response.data.id) {
          this.showToast('Account created successfully!', 'success');
          this.showSuccessModal('Your account has been created successfully! Please log in with your credentials.');
        } else {
          this.showErrorModal('An error occurred while submitting. Please try again later.');
        }
      } catch (error) {
        console.log('Error response:', error.response); // Log error response for debugging
        
        if (error.response && error.response.status === 400) {
          this.showErrorModal('Username has been taken. Please choose a new username.', false);
          this.step--; // Revert to the previous step if the username is taken
        } else {
          console.error('Error:', error);
          this.showErrorModal('An error occurred while submitting. Please try again later.');
        }
      }
    },
    async fetchSecurityQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/api/security/security-questions');
        console.log('Fetched questions:', response.data); // Check the structure here
        this.securityQuestions = response.data.map(q => ({ id: q.id, question: q.question }));
      } catch (error) {
        console.error('Error fetching security questions:', error);
      }
    },
    
    getAvailableQuestions(currentIndex) {
      // Extract selected questions from the form, excluding the current dropdown's question
      const selectedQuestions = this.form.securityQuestions.filter((q, index) => index !== currentIndex && q);
  
      // Return available questions, excluding selected ones and allowing the current question to be selected again
      return this.securityQuestions.filter(option => option.question && !selectedQuestions.includes(option.question));
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
      setTimeout(() => {
        document.body.removeChild(toastContainer); // Clean up the toast container
      }, 5000); // Adjust the timeout to match the toast duration
    },
    showSuccessModal(message) {
      this.successMessage = message;
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
      
      // Add event listener for the modal hidden event
      successModal._element.addEventListener('hidden.bs.modal', () => {
        this.$router.push('/log_in_view');
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
    }
  },
  created() {
    this.fetchSecurityQuestions();
  }
};
