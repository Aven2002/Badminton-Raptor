<template>
  <div>
    <h1>Browse Equipment</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="filteredItems.length === 0" class="text-center">No items found.</div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in paginatedItems" :key="item.equipID">
          <div class="card-container">
            <div class="card" @click="goToDetails(item.equipID)">
              <div class="card-front">
                <img class="card-img-top" :src="getImagePath(item.equipImgPath)" alt="Equipment Image">
              </div>
              <div class="card-back">
                <h5 class="card-title">{{ item.equipName }}</h5>
                <p class="card-text">Price: ${{ item.equipPrice }}</p>
              </div>
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
.card-container {
  perspective: 800px; /* Adding perspective to the container */
}

.card {
  position: relative;
  width: 200px; 
  height: 200px; /* Set a fixed height */
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.card-back {
  background-color: #333;
  color: #fff;
  transform: rotateY(180deg);
  text-align: center;
  padding: 20px;
}

.card-front img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the image fits within the card without being cropped */
  object-position: center; /* Center the image within the card */
}

.card:hover {
  transform: rotateY(180deg);
}

/* Pagination Styles */
.pagination {
  margin-top: 20px;
}

.page-item .page-link {
  color: #343a40;
}

.page-item.active .page-link {
  background-color: #343a40;
  border-color: #343a40;
  color: white;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}

</style>
