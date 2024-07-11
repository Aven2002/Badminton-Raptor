<template>
  <div id="app">
    <AppHeader />
    <HelloWorld />
  </div>
</template>

<script>
import AppHeader from './components/Header_com.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
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
