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
        <div class="button mt-5">
          <router-link to="/log_in_view" class="btn btn-primary me-2">Login</router-link>
          <router-link to="/sign_up_view" class="btn btn-success">Sign Up</router-link>
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

<style scoped>
.content {
  padding: 80px 20px;
  max-width: 1200px;
  text-align: left;
  background: transparent;
}

.feature-list {
  list-style-type: none;
  padding-left: 0;
  font-size: 16px;
  margin: 20px 0;
}

.feature-list li {
  margin: 10px 0;
}

h2 {
  font-family:'Times New Roman', Times, serif;
  font-size: 3.0em;
  margin-bottom: 20px;
  color: #333; /* Darker text color for contrast */
  font-weight:600;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #333333; 
}

.button {
  margin-top: 20px;
  display: flex;
  gap: 15px; /* Gap between the buttons */
}

.btn {
  font-size: 1.1em;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  color: white;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease-in-out;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  z-index: 0;
}

.btn-primary:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.btn-primary:hover,
.btn-primary:focus {
  background: linear-gradient(45deg, #0056b3, #007bff);
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.6);
  transform: translateY(-3px);
}

.btn-success {
  background: linear-gradient(45deg, #28a745, #218838);
  box-shadow: 0 6px 12px rgba(40, 167, 69, 0.4);
}

.btn-success::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease-in-out;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  z-index: 0;
}

.btn-success:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.btn-success:hover,
.btn-success:focus {
  background: linear-gradient(45deg, #218838, #28a745);
  box-shadow: 0 8px 16px rgba(40, 167, 69, 0.6);
  transform: translateY(-3px);
}
</style>



