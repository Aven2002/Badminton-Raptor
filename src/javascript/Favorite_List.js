import axios from 'axios';
  
export default {
  name: 'FavoriteList',
  data() {
    return {
      favoriteItems: [],
      loading: false
    };
  },
  created() {
    this.fetchFavoriteItems();
  },
  methods: {
    async fetchFavoriteItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/favorite');
        this.favoriteItems = response.data;
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      } finally {
        this.loading = false;
      }
    },
    async removeFromFavorites(favoriteID) {
      try {
        await axios.delete(`http://localhost:3000/api/favorite/${favoriteID}`);
        this.favoriteItems = this.favoriteItems.filter(item => item.favoriteID !== favoriteID);
      } catch (error) {
        console.error('Error removing favorite item:', error);
        // Optionally display a user-friendly error message
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