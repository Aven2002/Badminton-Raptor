import { createRouter, createWebHistory } from 'vue-router';
import Landing_view from '../views/Landing_view.vue';

const routes = [
  {
    path: '/Landing_view',
    name: 'Landing_view',
    component: Landing_view
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
