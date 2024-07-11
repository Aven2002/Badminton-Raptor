<template>
  <header>
    <img :src="logo" alt="Logo" class="logo">
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header_com',
  data() {
    return {
      title: 'Badminton Raptor',
      logo: require('../assets/logo.png')
    };
  }
};
</script>

<style scoped>
header {
  background-color: #42b983;
  color: white;
  display:flex;
}

.logo {
  width: 100px;
  margin-bottom: 10px;
}
</style>
