<template>
  <!-- Breadcrumb -->
  <div class="d-flex justify-content-between align-items-center custom-breadcrumb">
        <Breadcrumb_Com
      :homeLink="'/Home_view'"
      :breadcrumbItems="[]"
      :currentItem="'Contact Us'"
    />
      </div>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header">
        <h4>Send us a message</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <!-- Left side with image -->
            <img src='@/assets/contactLogo.png' alt="Contact Image" class="img-fluid mb-3">
            <p class="text-white">Contact Information:</p>
            <ul class="list-unstyled text-white">
              <li>Email: badmintonRaptorSystem@service.com</li>
              <li>Phone: +03-9011-2945</li>
              <li>Address: Badminton Raptor, Jalan Professor Khoo Kay Kim, Seksyen 13, 46200 Petaling Jaya, Selangor</li>
            </ul>
          </div>
          <div class="col-md-6">
            <!-- Right side with form -->
            <form @submit.prevent="submitFeedback">
              <div class="mb-3">
                <label for="feedbackCategory" class="form-label">Category</label>
                <select id="feedbackCategory" v-model="form.feedbackCategory" class="form-control" autocomplete="off">
                  <option value="General">General Inquiry</option>
                  <option value="Bug">Report a Bug or Technical Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required autocomplete="email">
              </div>
              <div class="mb-3">
                <label for="contactNum" class="form-label">Contact Number</label>
                <input type="text" id="contactNum" v-model="form.contactNum" class="form-control" required autocomplete="tel">
                <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
              </div>
              <div class="mb-3">
                <label for="feedbackContent" class="form-label">Feedback</label>
                <textarea id="feedbackContent" v-model="form.feedbackContent" class="form-control" rows="4" required autocomplete="off" @input="updateCharCount"></textarea>
                <div id="charCount" class="text-white">{{ charCount }}/1500 characters</div>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitDisabled">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
    <SuccessModal :successMessage="successMessage" />
  </div>
</template>

<script src='@/javascript/Contact_Us.js'></script>

<style src='@/style/Contact_Us.css' scoped></style>
