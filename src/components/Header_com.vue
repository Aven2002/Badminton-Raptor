<template>
  <header class="header-com">
    <img :src="logo" alt="Logo" class="logo" />
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header_com",
  data() {
    return {
      title: "Badminton Raptor",
      logo: require("../assets/logo.png"),
    };
  },
};
</script>

<style scoped>
.header-com {
  background-color: #000; 
  color: #fff; 
  display: flex;
  align-items: center; 
  padding: 10px 20px; 
}

.logo {
  width: 120px; 
  margin-right: 10px; 
}

h1 {
  font-size: 32px; 
  margin: 0; 
}
</style>
