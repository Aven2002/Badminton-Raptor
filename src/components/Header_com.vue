<template>
  <header>
    <Navbar_com />
  </header>
</template>

<script>
import Navbar_com from "./Navbar_com.vue";

export default {
  name: "Header_com",
  components: {
    Navbar_com,
  },
};
</script>

<style scoped>
header {
  background-color: #000;
  color: #fff;
}
</style>
