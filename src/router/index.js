import { createRouter, createWebHistory } from 'vue-router';
import Landing_view from '../views/Landing_view.vue';
import Home_view from '../views/Home_view.vue';

const routes = [
  {
    path: '/Landing_view',
    name: 'Landing_view',
    component: Landing_view
  },
  {
    path: '/Home_view',
    name: 'Home_view',
    component: Home_view
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
