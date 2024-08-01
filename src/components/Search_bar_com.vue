<template>
  <div class="search-bar">
    <div class="input-group">
      <span class="input-group-text">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        type="text"
        v-model="searchQuery"
        @input="emitSearch"
        placeholder="Search by equipment name ..."
        class="form-control search-input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
.search-bar {
  width: 100%;
  margin-bottom: 20px;
}

.input-group {
  max-width: 350px;
  width: 100%;
}

.input-group-text {
  background-color: #23a7be;
  border: 1px solid #23a7be;
  color: white;
}

.search-input {
  background-color: #f5f5f5;
  border: 1px solid #23a7be;
  color: #000;
  font-size: 14px;
  padding: 10px 20px;
  transition: all 0.3s;
}

.search-input::placeholder {
  color: #999;
}

.search-input:focus {
  background-color: #e0e0e0;
  border-color: #23a7be;
  box-shadow: none;
  color: #333;
}
</style>
