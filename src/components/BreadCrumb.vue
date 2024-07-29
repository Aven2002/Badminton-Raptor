<template>
  <nav aria-label="breadcrumb" class="breadcrumb-custom mb-1">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a :href="homeLink">Home</a></li>
      <li v-for="(item, index) in breadcrumbItems" :key="index" class="breadcrumb-item">
        <a v-if="item.link" :href="item.link">{{ item.text }}</a>
        <span v-else>{{ item.text }}</span>
      </li>
      <li v-if="currentItem" class="breadcrumb-item active" aria-current="page">{{ currentItem }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    homeLink: {
      type: String,
      required: true
    },
    breadcrumbItems: {
      type: Array,
      required: true
    },
    currentItem: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  background-color: transparent;
}
.breadcrumb-item a {
  color: #007bff;
}
.breadcrumb-item.active {
  color: #6c757d;
}
</style>
