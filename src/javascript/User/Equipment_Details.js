import axios from 'axios';
import Favorite_btn_com from '@/components/Favorite_btn_com.vue';
import BackBtn from '@/components/Back_btn_com.vue';

export default {
  components: {
    Favorite_btn_com,
    BackBtn
  },
  data() {
    return {
      equipment: {},
      details: {},
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchEquipmentDetails();
  },
  methods: {
    async fetchEquipmentDetails() {
      const equipID = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/equipment/${equipID}/details`);
        this.equipment = response.data.equipment;
        this.details = response.data.details;
      } catch (error) {
        console.error('Error fetching equipment details:', error);
        this.error = 'Failed to load equipment details. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    getImagePath(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    },
    getBrandLogo(equipBrand) {
      return require(`@/assets/Brand_Logo/${equipBrand}.png`);
    }    
  }
};
