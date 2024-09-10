import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      options: [], 
      currentState: null,
      isInputDisabled: true,
      formValues: {
        priceRange: { min: 0, max: 1000 },
        selectedBrands: [],
        selectedCategory: ''
      },
      recommendations: [],
    };
  },
  components: {
    Breadcrumb_Com
  },
  created() {
    this.fetchInitialMessage();
  },
  methods: {
    async submitRecommendationForm() {
      try {
        // Prepare the request payload
        const payload = {
          priceRange: {
            min: 0, // Assuming min is always zero or you can dynamically set it
            max: parseInt(this.formValues.priceRange.max, 10) // Convert to integer
          },
          selectedBrands: Array.isArray(this.formValues.selectedBrands) ? this.formValues.selectedBrands : [], // Ensure this is an array
          selectedCategory: this.formValues.selectedCategory || '' // Default to empty string if not provided
        };
    
        // Log the payload to check the data being sent
        console.log('Submitting recommendation form with payload:', payload);
    
        // Make the API call
        const response = await axios.post('http://localhost:3000/api/chatbot/recommendation', payload);

        // Update recommendations with the received data
        this.recommendations = response.data.equipment;
    
        // Log the response for debugging
        console.log('Received response:', response.data);
    
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    },    
      
  async fetchInitialMessage() {
    try {
      const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
        userChoice: '',
        currentState: null
      });
      
      this.currentState = response.data.nextState || this.currentState;

      if (response.data.message) {
        const message = {
          text: response.data.message,
          isBot: true
        };

        if (response.data.options) {
          message.options = response.data.options; 
          this.isInputDisabled = true; 
        } else {
          this.isInputDisabled = false; 
        }

        this.messages.push(message);
      }
    } catch (error) {
      console.error('Error fetching initial message:', error);
      this.messages.push({ text: 'Sorry, there was an error fetching the initial message.' });
    }
  },
async sendMessage() {
  if (this.userMessage.trim() === '') return;

  // Add user message to the chat
  this.messages.push({ text: this.userMessage, isUser: true });

  try {
    const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
      userChoice: this.userMessage,
      equipmentName: this.currentState === 'awaitingEquipmentName' ? this.userMessage : null,
      currentState: this.currentState
    });

    // Update the current state
    this.currentState = response.data.nextState || this.currentState;

    // Clear user message input
    this.userMessage = '';

    // Process bot response
    if (response.data.message) {
      let message = { text: response.data.message };

      if (response.data.equipmentName && response.data.equipmentImgPath) {
        message = {
          ...message,
          messageText: response.data.message,
          equipmentName: response.data.equipmentName,
          equipmentPrice: response.data.equipmentPrice,
          equipmentImgPath: response.data.equipmentImgPath,
          link: response.data.link,
          isEquipment: true
        };
      } else if (response.data.link) {
        message = {
          ...message,
          link: {
            url: response.data.link.url,
            text: response.data.link.text
          },
          isLink: true
        };
      } else if (response.data.formFields) {
        message = {
          ...message,
          formFields: response.data.formFields,
          isForm: true
        };
      } else {
        message = { text: response.data.message };
      }

      this.messages.push(message);
    }

    if (response.data.options) {
      this.options = response.data.options;
      this.isInputDisabled = true;
    } else {
      this.isInputDisabled = false;
    }

    // Scroll to the bottom
    this.scrollToBottom();

  } catch (error) {
    console.error('Error sending message:', error);
    this.messages.push({ text: 'Sorry, there was an error. Please try again later.' });
  }
},
  scrollToBottom() {
    this.$nextTick(() => {
      const chatMessages = this.$refs.chatMessages;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  },
  handleOptionSelection(option) {
    this.userMessage = option;
    this.sendMessage();
  },
  getImageUrl(imagePath) {
    return `http://localhost:3000/assets/${imagePath}`;
  }
}
};