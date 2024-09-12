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
          <div v-if="!message.isLink && !message.isEquipment && !message.isForm">
            <p>{{ message.text }}</p>
            <div v-if="message.options" class="options-container">
              <div v-for="(option, idx) in message.options" :key="idx" class="option-item">
                <button @click="handleOptionSelection(option)" class="option-button">{{ option }}</button>
              </div>
            </div>
          </div>

          <!-- Display a link if message contains a link -->
          <div v-if="message.isLink">
            <p>{{ message.text }}</p>
            <a :href="message.link.url" target="_blank">{{ message.link.text }}</a>
          </div>

          <!-- Display equipment details if message contains equipment information -->
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

          <!-- Display form for recommendations if message contains formFields -->
          <div v-if="message.isForm">
            <p>{{ message.text }}</p>
            <form @submit.prevent="submitRecommendationForm" class="recommendation-form">
              <!-- Price Range Slider -->
              <div v-if="message.formFields.priceRange" class="form-group">
                <label for="priceRange">Price Range:</label>
                <div class="price-range-container">
                  <input 
                    type="range" 
                    v-model="formValues.priceRange.max" 
                    :min="0" 
                    :max="message.formFields.priceRange.max" 
                    class="range-slider" 
                  />
                </div>
                <p class="price-range-display"> 0 - {{ formValues.priceRange.max }} </p>
              </div>

              <!-- Brand Checkboxes -->
              <div v-if="message.formFields.brands" class="form-group">
                <label for="brands">Prefer brand:</label>
                <div class="brand-checkboxes">
                  <div v-for="brand in message.formFields.brands" :key="brand" class="form-check">
                    <input 
                      type="checkbox" 
                      :id="brand" 
                      v-model="formValues.selectedBrands" 
                      :value="brand" 
                      class="form-check-input"
                    />
                    <label :for="brand" class="form-check-label">{{ brand }}</label>
                  </div>
                </div>
              </div>

              <!-- Category Radio Buttons -->
              <div v-if="message.formFields.categories" class="form-group">
                <label for="categories">Category:</label>
                <div class="category-radios">
                  <div v-for="category in message.formFields.categories" :key="category" class="form-check">
                    <input 
                      type="radio" 
                      :id="category" 
                      v-model="formValues.selectedCategory" 
                      :value="category" 
                      class="form-check-input"
                    />
                    <label :for="category" class="form-check-label">{{ category }}</label>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-group">
                <button type="submit" class="btn btn-primary submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>

       <!-- Display bot-style recommendations if available -->
      <div v-if="recommendations.length" class="bot-message mt-2">
        <p>Here are your recommendations:</p> 
        <div v-for="(item, index) in recommendations" :key="index" class="recommendation-item">
          <img :src="getImageUrl(item.equipImgPath)" alt="Equipment Image" class="equipment-img" />
          <div class="equipment-text">
            <p class="equipment-name">{{ item.equipName }}</p>
            <a v-if="item.url" :href="item.url" class="view-details">View Details</a>
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


<script src='@/javascript/User/Chatbox.js'></script>

<style src='@/style/User/Chatbot.css' scoped></style>

