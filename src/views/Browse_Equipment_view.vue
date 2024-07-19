<template>
  <div>
    <h1>Browse Equipment</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="filteredItems.length === 0" class="text-center">No items found.</div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in paginatedItems" :key="item.equipID">
          <div class="card h-100" @click="goToDetails(item.equipID)" style="cursor: pointer;">
            <img class="card-img-top" :src="getImagePath(item.equipImgPath)" alt="Equipment Image">
            <div class="card-body">
              <h5 class="card-title">{{ item.equipName }}</h5>
              <p class="card-text">Price: ${{ item.equipPrice }}</p>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Browse_Equipment_view',
  data() {
    return {
      items: [],
      filter: '',
      loading: false,
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  computed: {
    filteredItems() {
      if (this.filter) {
        return this.items.filter(item => item.equipCategory === this.filter);
      }
      return this.items;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    }
  },
  watch: {
    $route(to) {
      this.filter = to.query.filter || '';
      this.fetchItems();
    }
  },
  created() {
    this.filter = this.$route.query.filter || '';
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/equipment');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToDetails(productID) {
      this.$router.push({ name: 'ProductDetails', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    }
  }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
