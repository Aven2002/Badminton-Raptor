<template>
  <div class="landing">
    <h1>Welcome to the Landing Page</h1>
    <p>This is the landing page content.</p>

    <!-- Main content section -->
    <div class="content">
      <h2>Experience the Power of Badminton Raptor</h2>
      <p>
        Encounter the Swiftness, Accuracy, and Simplicity of Badminton Raptor.
        Whether delving into singular equipment alternatives or researching
        contemporary gear trends, empower your decision-making prowess.
      </p>
      <h3>Key Features:</h3>
      <text>🌐 Streamlined Equipment Exploration</text>
      <text>⏱️ Personalized Equipment Recommendations</text>
      <text>💼 Comprehensive Equipment Database</text>
      <text>🌍 Facilitate Informed Decision-making</text>
    </div>

    <div class="button mt-4">
      <router-link to="/Login_view" class="btn btn-primary me-2"
        >Login</router-link
      >
      <router-link to="/SignUp_view" class="btn btn-success"
        >Sign Up</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing_view",
};
</script>

<style>
.content {
  max-width: 800px; /* Adjust as needed */
  margin: auto;
  padding: 20px;
  text-align: left;
}
</style>
