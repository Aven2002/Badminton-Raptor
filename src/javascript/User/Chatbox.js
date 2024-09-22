import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      options: [], 
      currentState: "initial",
      isInputDisabled: true,
      formValues: {
        priceRange: { min: 0, max: 1000 },
        selectedBrands: [],
        selectedCategory: '',
        selectedEquipment: '',
        selectedPlayStyle: ''
      },
      recommendations: [],
      equipment: []
    };
  },
  components: {
    Breadcrumb_Com
  },
  computed: {
    filteredEquipment() {
      return this.equipment.filter(e => e.category === 'Racquet');
    }
  },
  created() {
    this.fetchInitialMessage();
  },
  methods: {
    async submitRecommendationForm() {
      try {
        const payload = {
          priceRange: {
            min: 0,
            max: parseInt(this.formValues.priceRange.max, 10)
          },
          selectedBrands: this.formValues.selectedBrands,
          selectedCategory: this.formValues.selectedCategory,
          selectedEquipment: this.formValues.selectedEquipment,
          selectedHardcord: this.formValues.selectedPlayStyle,
          currentState: this.currentState 
        };
    
        const response = await axios.post('http://localhost:3000/api/chatbot/chat', payload);
        
        if (response.data.equipment && response.data.equipment.length > 0) {
          this.messages.push({
            text: response.data.message,
            isUser: false,
            isEquipmentDetails: true,
            equipmentDetails: response.data.equipment
          });
        } else {
          this.messages.push({
            text: "No equipment meets your criteria.",
            isUser: false,
            isEquipmentDetails: false // Ensure it's not treated as equipment details
          });
        }
    
        this.currentState = "initial";
        this.userMessage = '';
    
        this.scrollToBottom();
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    },
    
    async fetchInitialMessage() {
      try {
        const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
          userChoice: '',
          currentState: "initial"
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
        this.messages.push({ 
          text: 'Sorry, there was an error fetching the initial message.'
         });
      }
    },

    async sendMessage() {
      if (this.userMessage.trim() === '') return;
    
      // Add user message to the messages array
      this.messages.push({ text: this.userMessage, isUser: true });
    
      try {
        const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
          userChoice: this.userMessage,
          equipmentName: this.currentState === 'awaitingEquipmentName' ? this.userMessage : null,
          currentState: this.currentState
        });
    
        // Log the response to the console
        console.log('Response from server:', response.data);
    
        this.currentState = response.data.nextState || this.currentState;
        this.userMessage = '';
    
        if (response.data.message) {
          let message = { text: response.data.message, isUser: false };
    
            // Check if there are equipment details in the response
            if (response.data.equipmentDetails && response.data.equipmentDetails.length > 0) {
              message.equipmentDetails = response.data.equipmentDetails; 
              message.isEquipmentDetails = true; 
            }

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
          } else // Handle recommendation form
          if (response.data.formFields && response.data.nextState === 'recommendForm') {
            message = {
              ...message,
              formFields: response.data.formFields,
              isRecommendationForm: true // Set this flag for recommendation form
            };
          }
    
          // Handle string advice form
          if (response.data.formFields && response.data.nextState === 'stringAdviceForm') {
            message = {
              ...message,
              formFields: response.data.formFields,
              isStringAdviceForm: true // Set this flag for string advice form
            };
          }      
    
          this.messages.push(message);
        }
    
        if (response.data.options) {
          this.options = response.data.options;
          this.isInputDisabled = true;
        } else {
          this.isInputDisabled = false;
        }
    
        this.scrollToBottom();
    
      } catch (error) {
        console.error('Error sending message:', error);
        this.messages.push({ text: 'Sorry, there was an error. Please try again later.' });
      }
    },
    
    async submitStringAdviceForm() {
      try {
        const payload = {
          equipmentName: this.formValues.selectedEquipment,
          playingStyle: this.formValues.selectedPlayStyle,
          currentState: this.currentState 
        };
    
        const response = await axios.post('http://localhost:3000/api/chatbot/chat', payload);
        
        // Push the response message to messages array
        this.messages.push({
          text: response.data.message,
          isUser: false,
          isEquipmentDetails: false, 
        });
    
        // Reset state after processing
        this.currentState = "initial";
        this.formValues.selectedEquipment = '';
        this.formValues.selectedPlayStyle = ''; 
    
        this.scrollToBottom();
      } catch (error) {
        console.error('Error fetching string advice:', error);
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
      console.log("Message",this.userMessage);
      console.log("State",this.currentState);
      this.sendMessage();
    },

    getImageUrl(imagePath) {
      return `http://localhost:3000/assets/${imagePath}`;
    }
  }
};
