import axios from 'axios';

export default {
    async validateUsername(username) {
        const minLength = 4;
        const maxLength = 15;
        
        // Check length
        if (username.length < minLength || username.length > maxLength) {
          return `Username must be between ${minLength} and ${maxLength} characters.`;
        }
    
        // Check if username is taken
        try {
          const response = await axios.get('http://localhost:3000/api/account/');
          const existingUsernames = response.data.map(user => user.username);
          
          if (existingUsernames.includes(username)) {
            return 'Username is already taken.';
          }
        } catch (error) {
          console.error('Error checking username:', error);
          return 'Unable to validate username. Please try again later.';
        }
      },
  
    async validateEmail(email) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return 'Please enter a valid email address.';
        }
    
        // Check if email is already taken
        try {
          const response = await axios.get('http://localhost:3000/api/account/');
          const existingEmails = response.data.map(user => user.email);
    
          if (existingEmails.includes(email)) {
            return 'Email is already taken.';
          }
        } catch (error) {
          console.error('Error checking email:', error);
          return 'Unable to validate email. Please try again later.';
        }
      },

    validatePassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return 'Password must be at least 8 characters long and include at least one letter and one number.';
      }
    },

    validateFName(fname) {
        const hasDigit = /\d/.test(fname);
        if (hasDigit) {
          return 'First name cannot contain digits.';
        }
      },

      validateLName(lname) {
        const hasDigit = /\d/.test(lname);
        if (hasDigit) {
          return 'Last name cannot contain digits.';
        }
      },
  
    validatePhoneNumber(contactNum) {
      const phoneRegex = /^\d{10}$/; // Example for a 10-digit phone number
      if (!phoneRegex.test(contactNum)) {
        return 'Please enter a valid 10-digit phone number.';
      }
    },
  
    validateDOB(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 7) {
        return 'You must be at least 7 years old.';
      }
    },
  };
  