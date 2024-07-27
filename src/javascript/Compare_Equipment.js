import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      equipmentNames: [],
      selectedCategory: '',
      selectedEquipment: {
        Left: null,
        Right: null,
      },
      equipmentDetails: {
        Left: null,
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
        Racquet: {
          flex: 'Flex',
          frame: 'Frame',
          shaft: 'Shaft',
          joint: 'Joint',
          length: 'Length',
          weight: 'Weight',
          stringAdvice: 'String Advice',
          color: 'Color',
          madeIn: 'Made In'
        },
        Shuttlecock: {
          quantityPerTube: 'Quantity Per Tube',
          description: 'Description'
        },
        Bags: {
          color: 'Color',
          size: 'Size',
          description: 'Description'
        },
        Footwear: {
          color: 'Color',
          upper: 'Upper',
          midsole: 'Midsole',
          outsole: 'Outsole',
          description: 'Description'
        },
        Apparel: {
          color: 'Color',
          material: 'Material'
        },
        Accessories: {
          description: 'Description'
        },
      };
      return Object.keys(dynamicKeys[this.selectedCategory]).reduce((acc, key) => {
        if (details[key] !== undefined) {
          acc[dynamicKeys[this.selectedCategory][key]] = details[key];
        }
        return acc;
      }, {});
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedEquipment.Left = null;
      this.selectedEquipment.Right = null;
      this.equipmentNames = [];
      this.equipmentDetails.Left = null;
      this.equipmentDetails.Right = null;
      this.fetchEquipmentNames();
    },
    getCategoryImage(category) {
      return require(`@/assets/Icon/${category}_Icon.png`);
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

