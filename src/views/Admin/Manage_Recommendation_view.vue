<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Manage_Feedback_view',
  mounted() {
    this.$router.replace({ name: 'View_Recommendation' });
  }
};
</script>

