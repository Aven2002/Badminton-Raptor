<template>
  <div class="landing">
    <div class="body d-flex justify-content-center align-items-center">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing_view",
};
</script>

<style src='@/style/Landing.css' scoped></style>


