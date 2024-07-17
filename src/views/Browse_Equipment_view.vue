<template>
     <div>
       <h1>Browse Equipment</h1>
       <div v-if="loading">Loading...</div>
       <div v-else-if="filteredItems.length === 0">No items found.</div>
       <ul v-else>
         <li v-for="item in filteredItems" :key="item.productID">
           <h3>{{ item.productName }}</h3>
           <p>Category: {{ item.productCategory }}</p>
           <p>Brand: {{ item.productBrand }}</p>
           <p>Type: {{ item.productType }}</p>
           <p>Price: ${{ item.productPrice }}</p>
           <p>Quantity: {{ item.productQuantity }}</p>
         </li>
       </ul>
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
       };
     },
     computed: {
       filteredItems() {
         if (this.filter) {
           return this.items.filter(item => item.productCategory === this.filter);
         }
         return this.items;
       }
     },
     watch: {
       $route(to) {
         this.filter = to.query.filter || '';
         console.log('Filter updated:', this.filter); // Debugging statement
         this.fetchItems();
       }
     },
     created() {
       this.filter = this.$route.query.filter || '';
       console.log('Initial filter:', this.filter); // Debugging statement
       this.fetchItems();
     },
     methods: {
       async fetchItems() {
         this.loading = true;
         try {
           const response = await axios.get('http://localhost:3000/api/equipment');
           console.log('Fetched items:', response.data); // Debugging statement
           this.items = response.data;
         } catch (error) {
           console.error('Error fetching items:', error);
         } finally {
           this.loading = false;
         }
       }
     }
   };
   </script>
   
   <style scoped>
   /* Add any additional styling here */
   </style>
   