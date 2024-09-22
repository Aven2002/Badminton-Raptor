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
          <pre>{{ message.text }}</pre>
          <div v-if="!message.isLink && !message.isEquipment && !message.isForm">
            <div v-if="message.options" class="options-container">
              <div v-for="(option, idx) in message.options" :key="idx" class="option-item">
                <button @click="handleOptionSelection(option)" class="option-button">{{ option }}</button>
              </div>
            </div>
          </div>

          <!-- Display a link if message contains a link -->
          <div v-if="message.isLink">
            <a :href="message.link.url" target="_blank">{{ message.link.text }}</a>
          </div>

       <!-- Display equipment details if message contains equipment information -->
        <div v-if="message.isEquipmentDetails" class="equipment-details">
          <div v-for="(equipment, index) in message.equipmentDetails" :key="index" class="equipment-info">
            <img :src="getImageUrl(equipment.equipmentImgPath)" alt="Equipment Image" class="equipment-img" />
            <div class="equipment-text">
              <p class="equipment-name">{{ equipment.equipmentName }}</p>
              <p class="equipment-price">Price: RM {{ equipment.equipmentPrice }}</p>
              <a :href="equipment.link.url" class="view-details">{{ equipment.link.text }}</a>
            </div>
          </div>
        </div>

          <!-- Display form for recommendations if message contains formFields -->
          <div v-if="message.isRecommendationForm">
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

          <div v-if="message.isStringAdviceForm">
            <form @submit.prevent="submitStringAdviceForm" class="string-advice-form">
            <!-- Dropdown for Equipment (filtered to only show Racquet category) -->
            <div v-if="message.formFields.racquet" class="form-group">
              <label for="equipment">Select Equipment:</label>
              <select v-model="formValues.selectedEquipment" class="form-select" required>
                <option disabled value="">Choose your equipment</option>
                <!-- Use racquet names directly from the formFields object -->
                <option v-for="(racquet, index) in message.formFields.racquet" :key="index" :value="racquet">
                  {{ racquet }}
                </option>
              </select>
            </div>

            <!-- Dropdown for Play Style Selection -->
            <div v-if="message.formFields.playStyle" class="form-group">
              <label for="playStyle">Select Play Style:</label>
              <select v-model="formValues.selectedPlayStyle" class="form-select" required>
                <option disabled value="">Choose play style</option>
                <!-- Use play styles directly from the formFields object -->
                <option v-for="(style, index) in message.formFields.playStyle" :key="index" :value="style">
                  {{ style }}
                </option>
              </select>
            </div>
            <!-- Submit Button -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary submit-button">Submit</button>
              </div>
            </form>
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
