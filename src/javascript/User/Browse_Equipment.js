import axios from 'axios';
import Breadcrumb_Com from '@/components/Breadcrumb_com.vue';
import SearchBar_Com from '@/components/Search_Bar_com.vue';

export default {
  name: 'Browse_Equipment_view',
  components: {
    Breadcrumb_Com,
    SearchBar_Com
  },
  data() {
    return {
      items: [],
      filter: '',
      searchQuery: '',
      selectedBrand: '',
      priceRange: 0,
      minPrice: 0,
      maxPrice: 1000,
      brands: [],
      categories: [],
      loading: false,
      currentPage: 1,
      itemsPerPage: 6,
      sortOrder: 'highest'
    };
  },
  computed: {
    filteredItems() {
      let items = this.items;
      if (this.filter) {
        items = items.filter(item => item.equipCategory === this.filter);
      }
      if (this.selectedBrand) {
        items = items.filter(item => item.equipBrand === this.selectedBrand);
      }
      if (this.searchQuery) {
        const searchQueryLower = this.searchQuery.toLowerCase();
        items = items.filter(item => item.equipName.toLowerCase().includes(searchQueryLower));
      }
      items = items.filter(item => item.equipPrice <= Math.ceil(this.priceRange));

      // Sort items by price
      if (this.sortOrder === 'highest') {
        items.sort((a, b) => b.equipPrice - a.equipPrice);
      } else if (this.sortOrder === 'lowest') {
        items.sort((a, b) => a.equipPrice - b.equipPrice);
      }
      return items;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    ceilPriceRange() {
      return Math.ceil(this.priceRange);
    },
    adjustedMinPrice() {
      return Math.ceil(this.minPrice);
    }
  },
  watch: {
    $route(to) {
      this.filter = to.query.filter || '';
      this.fetchItems();
    },
    priceRange(newVal) {
      this.priceRange = Math.max(newVal, this.adjustedMinPrice);
    },
    searchQuery() {
      this.currentPage = 1; // Reset to the first page when the search query changes
    }
  },
  created() {
    this.filter = this.$route.query.filter || '';
    this.fetchItems();
    this.fetchBrands();
    this.fetchCategories();
  },
  methods: {
    formattedPrice(price) {
      return price.toFixed(2);
    },
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/equipment');
        this.items = response.data;
        this.updatePriceRange();
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchBrands() {
      try {
        const response = await axios.get('http://localhost:3000/api/equipment');
        this.brands = [...new Set(response.data.map(item => item.equipBrand))];
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/equipment');
        this.categories = [...new Set(response.data.map(item => item.equipCategory))];
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    updatePriceRange() {
      const prices = this.items.map(item => item.equipPrice);
      this.minPrice = Math.ceil(Math.min(...prices));
      this.maxPrice = Math.max(...prices);
      this.priceRange = this.maxPrice;
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToDetails(productID) {
      this.$router.push({ name: 'Equipment_Details_view', params: { id: productID } });
    },
    getImagePath(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    }
  }
};