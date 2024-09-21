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
        const payload = {
          priceRange: {
            min: 0,
            max: parseInt(this.formValues.priceRange.max, 10)
          },
          selectedBrands: this.formValues.selectedBrands,
          selectedCategory: this.formValues.selectedCategory
        };
    
        const response = await axios.post('http://localhost:3000/api/chatbot/recommendation', payload);
        this.recommendations = response.data.equipment;
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
        this.messages.push({ 
          text: 'Sorry, there was an error fetching the initial message.'
         });
      }
    },

    async sendMessage() {
      if (this.userMessage.trim() === '') return;

      // Clear chatbox and prepare for new interaction
      this.clearChatbox();

      // Simulate a short delay before sending the message
      setTimeout(async () => {
        this.messages.push({ text: this.userMessage, isUser: true });

        try {
          const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
            userChoice: this.userMessage,
            equipmentName: this.currentState === 'awaitingEquipmentName' ? this.userMessage : null,
            currentState: this.currentState
          });

          this.currentState = response.data.nextState || this.currentState;
          this.userMessage = '';

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
      }, 300); // 300ms delay before sending the message
    },

    clearChatbox() {
      // Clear the chatbox and the displayed messages
      this.messages = [];
      this.recommendations = [];
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
