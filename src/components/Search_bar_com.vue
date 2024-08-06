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
        :placeholder="placeholderText"
        class="form-control search-input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    searchType: {
      required: true,
      validator: function (value) {
        return ['username', 'equipname'].includes(value);
      }
    }
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    placeholderText() {
      if (this.searchType === 'username') {
        return 'Search by username ...';
      } else if (this.searchType === 'equipname') {
        return 'Search by equipment name ...';
      }
      return 'Search ...'; // default fallback
    }
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
  width: 450px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.input-group {
  max-width: 800px;
  width: 100%;
  border-radius: 30px; /* Round the corners */
  overflow: hidden; /* Prevent overflow from affecting rounded corners */
  background-color: #1e1e1e; /* Dark background */
  border: 1px solid #444; /* Slightly lighter border */
}

.input-group-text {
  background-color: #1e1e1e; /* Dark background for icon */
  border: none; /* No border */
  color: #fff; /* White text */
  border-radius: 30px 0 0 30px; /* Round left corners */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px; /* Add some padding */
}

.search-input {
  background-color: #2c2c2c; /* Darker background for input */
  border: none; /* Remove border */
  color: #fff; /* White text */
  font-size: 15px; /* Slightly larger font size */
  padding: 10px 20px;
  border-radius: 0 30px 30px 0; /* Round right corners */
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transitions */
}

.search-input::placeholder {
  color: #bbb; /* Lighter color for placeholder text */
}

.search-input:focus {
  background-color: #333; /* Slightly lighter background on focus */
  border: 1px solid #007bff; /* Blue border on focus */
  box-shadow: none; /* Remove default box-shadow */
  color: #fff; /* White text on focus */
}

@media (max-width: 300px) { /* For small screens */
  .input-group {
    border-radius: 25px; /* Medium radius for small screens */
  }

  .input-group-text {
    padding: 9px 12px; /* Adjust padding for small screens */
  }

  .search-input {
    font-size: 14px; /* Smaller font size for small screens */
    padding: 9px 18px; /* Adjust padding for small screens */
  }
}
</style>
