<template>
  <!-- Breadcrumb -->
  <div class="breadcrumb-container mt-3">
    <Breadcrumb_Com
      :homeLink="'/Home_view'"
      :breadcrumbItems="[]"
      :currentItem="'Chatbot'"
    />
  </div>

  <!-- Chat Container -->
  <div class="chat-container">
    <div class="chat-box mt-2">
      <div class="chat-messages" ref="chatMessages">
        <!-- Display messages -->
        <div v-for="(message, index) in messages" :key="index" :class="{'user-message': message.isUser, 'bot-message': !message.isUser}">
          <div v-if="!message.isLink && !message.isEquipment">
            <p>{{ message.text }}</p>
            <div v-if="message.options" class="options-container">
              <div v-for="(option, idx) in message.options" :key="idx" class="option-item">
                <button @click="handleOptionSelection(option)" class="option-button">{{ option }}</button>
              </div>
            </div>
          </div>
          <div v-if="message.isLink">
            <p>{{ message.text }}</p>
            <a :href="message.link.url" target="_blank">{{ message.link.text }}</a>
          </div>
          <div v-if="message.isEquipment" class="equipment-details">
            <p>{{ message.messageText }}</p>
            <div class="equipment-info">
              <img :src="getImageUrl(message.equipmentImgPath)" alt="Equipment Image" class="equipment-img" />
              <div class="equipment-text">
                <p class="equipment-name">{{ message.equipmentName }}</p>
                <p class="equipment-price">Price: {{ message.equipmentPrice }}</p>
                <a :href="message.link.url" class="view-details">{{ message.link.text }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input">
        <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type a message..." :disabled="isInputDisabled" />
        <button @click="sendMessage" :disabled="isInputDisabled">Send</button>
      </div>
    </div>
  </div>
</template>





<script>
import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      options: [], // Add options array to store the options
      currentState: null,
      isInputDisabled: true
    };
  },
  components: {
    Breadcrumb_Com
  },
  created() {
    // Fetch the initial message when the component is created
    this.fetchInitialMessage();
  },
  methods: {
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
          message.options = response.data.options; // Attach options to the message
          this.isInputDisabled = true; // Disable input field while options are presented
        } else {
          this.isInputDisabled = false; // Enable input field if no options
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

    this.messages.push({ text: this.userMessage, isUser: true });

    try {
      const response = await axios.post('http://localhost:3000/api/chatbot/chat', {
        userChoice: this.userMessage,
        equipmentName: this.currentState === 'awaitingEquipmentName' ? this.userMessage : null,
        currentState: this.currentState
      });

      this.currentState = response.data.nextState || this.currentState;

      if (response.data.message) {
        // Add bot message to the chat
        if (response.data.equipmentName && response.data.equipmentImgPath) {
          this.messages.push({
            messageText: response.data.message,
            equipmentName: response.data.equipmentName,
            equipmentPrice: response.data.equipmentPrice,
            equipmentImgPath: response.data.equipmentImgPath,
            link: response.data.link,
            isEquipment: true
          });
        } else if (response.data.link) {
          this.messages.push({
            text: response.data.message,
            link: {
              url: response.data.link.url,
              text: response.data.link.text
            },
            isLink: true
          });
        } else {
          this.messages.push({ text: response.data.message });
        }
      }

      if (response.data.options) {
        this.options = response.data.options;
        this.isInputDisabled = true;
      } else {
        this.isInputDisabled = false;
      }

      this.userMessage = '';

      // Scroll to the bottom after the new message is added
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
</script>




<style scoped>
.option-button {
  border: none;
  background-color: transparent;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color:#333;
  margin-bottom: 20px;
}

.option-button:hover {
  background-color: #f1f1f1;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.option-button:active {
  transform: translateY(0);
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
}

.equipment-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

.equipment-img {
  width: 200px; 
  height: 200px; 
  object-fit: contain;
  margin-bottom: 10px;
  margin: auto;
}

.equipment-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.equipment-name{
  font-weight: 600;
}

.equipment-name, .equipment-price, .view-details {
  margin: 5px 0;
}

.view-details {
  color: #007bff;
  text-decoration: none;
}

.view-details:hover {
  text-decoration: underline;
}

/* Breadcrumb container styling */
.breadcrumb-container {
  margin-bottom: 1rem; 
  margin-left: 50px;
}

/* Container for chat component */
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Chat box styling */
.chat-box {
  width: 100%;
  max-width: 1000px;
  background-color: #444;
  border-radius: 12px;
  border: 1px solid #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow: hidden;
}

/* Messages area */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* User message styling */
.user-message {
  background-color: #d0f0c0;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 8px;
  max-width: 80%;
  align-self: flex-end;
  text-align: right;
  margin-left: auto;
}

/* Bot message styling */
.bot-message {
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 8px;
  max-width: 80%;
  align-self: flex-start;
  text-align: left;
  margin-right: auto;
}

/* Chat input area styling */
.chat-input {
  display: flex;
  padding: 20px;
  border-top: 1px solid #000000;
  background-color: #333;
  align-items: center;
  justify-content: space-between;
}

/* Input field styling */
.chat-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
}

/* Send button styling */
.chat-input button {
  padding: 12px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

/* Button hover effect */
.chat-input button:hover {
  background-color: #0056b3;
}
</style>

