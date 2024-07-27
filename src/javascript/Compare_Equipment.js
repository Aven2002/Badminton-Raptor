import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      equipmentNames: [],
      selectedCategory: '',
      selectedEquipment: {
        Left: null,
        Center: null,
        Right: null,
      },
      equipmentDetails: {
        Left: null,
        Center: null,
        Right: null,
      },
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/equipment');
        this.categories = [...new Set(response.data.map(item => item.equipCategory))];
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchEquipmentNames() {
      try {
        const response = await axios.get(`http://localhost:3000/api/equipment/${this.selectedCategory}`);
        this.equipmentNames = response.data;
      } catch (error) {
        console.error('Error fetching equipment names:', error);
      }
    },
    async fetchEquipmentDetails(side) {
      const equipID = this.selectedEquipment[side];
      if (!equipID) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/equipment/${equipID}/details`);
        const equipment = response.data.equipment;
        const details = response.data.details;
        this.equipmentDetails[side] = { ...equipment, ...details };
      } catch (error) {
        console.error(`Error fetching ${side.toLowerCase()} equipment details:`, error);
      }
    },
    dynamicDetails(details) {
      const dynamicKeys = {
        Racquet: ['flex', 'frame', 'shaft', 'joint', 'length', 'weight', 'stringAdvice', 'color', 'madeIn'],
        Shuttlecock: ['quantityPerTube', 'description'],
        Bags: ['color', 'size', 'description'],
        Footwear: ['color', 'upper', 'midsole', 'outsole', 'description'],
        Apparel: ['color', 'material'],
        Accessories: ['description'],
      };
      return dynamicKeys[this.selectedCategory].reduce((acc, key) => {
        if (details[key] !== undefined) {
          acc[key] = details[key];
        }
        return acc;
      }, {});
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedEquipment.Left = null;
      this.selectedEquipment.Center = null;
      this.selectedEquipment.Right = null;
      this.equipmentNames = [];
      this.equipmentDetails.Left = null;
      this.equipmentDetails.Center = null;
      this.equipmentDetails.Right = null;
      this.fetchEquipmentNames();
    },
    getCategoryImage(category) {
      return require(`@/assets/Icon/${category}_Icon.png`);
    },
    getImageURL(equipImgPath) {
      return `http://localhost:3000/assets/${equipImgPath}`;
    },
    formatPrice(price) {
      return `RM ${price.toFixed(2)}`;
    }
  },
  watch: {
    selectedCategory(newCategory) {
      if (newCategory) {
        this.fetchEquipmentNames();
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
