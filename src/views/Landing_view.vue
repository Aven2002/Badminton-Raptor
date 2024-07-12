<template>
  <div class="landing">
    <div class="body">
      <!-- Main content section -->
      <div class="content">
        <h2>Experience the Power of Badminton Raptor</h2>
        <p>
          Encounter the Swiftness, Accuracy, and Simplicity of Badminton Raptor.
          Whether delving into singular equipment alternatives or researching
          contemporary gear trends, empower your decision-making prowess.
        </p>
        <ul class="feature-list">
          <li>🌐 Streamlined Equipment Exploration</li>
          <li>⏱️ Personalized Equipment Recommendations</li>
          <li>💼 Comprehensive Equipment Database</li>
          <li>🌍 Facilitate Informed Decision-making</li>
        </ul>
        <div class="button mt-4">
          <router-link to="/Login_view" class="btn btn-primary me-2">Login</router-link>
          <router-link to="/SignUp_view" class="btn btn-success">Sign Up</router-link>
        </div>
      </div>

      <!-- Image on the right side -->
      <div class="image-container">
        <img src="../assets/background/Bg_logo.png" alt="background_logo">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing_view",
};
</script>

<style>
.body {
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
}

.landing {
  margin: auto; 
  background-color: black; 
}
.feature-list {
  list-style-type: none; 
  padding-left:0;
}
.content {
  max-width: 1000px; 
  text-align: left;
  color: white; 
}

.image-container img {
  max-width: 100%; 
}
</style>
