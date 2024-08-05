<template>
  <footer class="footer">
    <!-- Copyright -->
    <div class="footer-content">
      © 2024 Copyright: Badminton Raptor
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer_com",
};
</script>

<style scoped>
.footer {
  background-color: #1e1e1e; /* Dark background for footer */
  color: #ffffff; /* White text for contrast */
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #333; /* Slight border at the top */
}

.footer-content {
  background-color: #2c2c2c; /* Slightly lighter dark background for content area */
  color: #b0b0b0; /* Light gray text for secondary content */
  padding: 10px 20px;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
}

.footer-content a {
  color: #23a7be; /* Bright color for links */
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline; /* Underline links on hover */
}

.footer-content p {
  margin: 0;
  font-size: 14px;
}
</style>
