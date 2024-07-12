<template>
  <div id="app">
    <Header_com />
    <router-link to="/Landing_view" class="text-reset">Landing</router-link>
    <router-link to="/Home_view" class="text-reset">Home</router-link>
    <router-view></router-view>
    <Footer_com />
  </div>
</template>

<script>
import Header_com from './components/Header_com.vue';
import Footer_com from './components/Footer_com.vue';

export default {
  name: 'App',
  components: {
    Header_com,
    Footer_com
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
