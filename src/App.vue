<template>
  <div id="app">
    <Header_com />
    <div class="view-container">
      <router-view/>
    </div>
    <Footer_com />
  </div>
</template>

<script>
import Header_com from "./components/Header_com.vue";
import Footer_com from "./components/Footer_com.vue";

export default {
  name: "App",
  components: {
    Header_com,
    Footer_com,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%; /* Ensure body and html occupy full height */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column; /* Align items in a column */
  min-height: 100vh; /* Ensure #app occupies full viewport height */
}

.view-container {
  flex: 1; /* Allow this container to grow and fill available space */
  background-image: url('@/assets/Background/Bg_01.png');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-attachment: fixed;
}
</style>
