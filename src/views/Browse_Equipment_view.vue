<template>
     <div>
       <h1>Browse Equipment</h1>
       <div v-if="loading">Loading...</div>
       <div v-else-if="filteredItems.length === 0">No items found.</div>
       <ul v-else>
         <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
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
           return this.items.filter(item => item.category === this.filter);
         }
         return this.items;
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
           const response = await axios.get('http://your-api-endpoint/equipment');
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
   