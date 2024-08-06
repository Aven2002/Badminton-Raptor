<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" aria-label="Previous">
          <i class="fas fa-chevron-left"></i>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" aria-label="Next">
          <i class="fas fa-chevron-right"></i>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
/* Pagination Styles */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow wrapping to prevent overflow */
}

/* Page item styling */
.page-item {
  margin: 0 2px; /* Reduced margin to fit more items */
}

/* Page link styling */
.page-link {
  color: #ffffff; /* White text */
  background-color: #2c2c2c; /* Darker grey background */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 6px 12px; /* Smaller padding for buttons */
  font-size: 0.75rem; /* Smaller font size */
  text-align: center; /* Centered text */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* Prevent text from wrapping */
}

/* Icon styling within page link */
.page-link i {
  font-size: 0.75rem; /* Size of the icons */
}

/* Hover state for page link */
.page-link:hover {
  color: #fff; /* White text on hover */
  background-color: #007bff; /* Blue background on hover */
}

/* Disabled state for page item */
.page-item.disabled .page-link {
  color: #6c757d; /* Gray text for disabled state */
  background-color: #2c2c2c; /* Darker grey background */
}

/* Active state for page item */
.page-item.active .page-link {
  color: #fff; /* White text for active page */
  background-color: #007bff; /* Blue background for active page */
}

/* Responsive adjustments */
@media (max-width: 576px) { /* For extra small screens */
  .page-link {
    font-size: 0.65rem; /* Smaller font size for very small screens */
    padding: 4px 8px; /* Smaller padding for very small screens */
  }

  .page-item {
    margin: 0 1px; /* Further reduced margin for very small screens */
  }
}
</style>
