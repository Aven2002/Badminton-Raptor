import { createRouter, createWebHistory } from "vue-router";
import Landing_view from '@/views/Landing_view.vue';
import Home_view from '@/views/Home_view.vue';
import Login_view from '@/views/Login_view.vue';
import SignUp_view from '@/views/SignUp_view.vue';
import Browse_Equipment_view from '@/views/Browse_Equipment_view.vue';
import Compare_Equipment_view from '@/views/Compare_Equipment_view.vue';
import Personalized_Recommendation_view from '@/views/Personalized_Recommendation_view.vue';
import Settings_view from '@/views/Settings_view.vue';
import Favorite_List_view from '@/views/Favorite_List_view.vue';
import Feedback_view from '@/views/Feedback_view.vue';
import Reset_Password_view from '@/views/Reset_Password_view.vue';

const routes = [
  {
    path: "/",
    name: "Landing_view",
    component: Landing_view,
  },
  {
    path: "/Login_view",
    name: "Login_view",
    component: Login_view,
  },
  {
    path: "/SignUp_view",
    name: "SignUp_view",
    component: SignUp_view,
  },
  {
    path: "/Home_view",
    name: "Home_view",
    component: Home_view,
  },
  {
    path: "/Browse_Equipment_view",
    name: "Browse_Equipment_view",
    component: Browse_Equipment_view,
  },
  {
    path: "/Compare_Equipment_view",
    name: "Compare_Equipment_view",
    component: Compare_Equipment_view,
  },
  {
    path: "/Personalized_Recommendation_view",
    name: "Personalized_Recommendation_view",
    component: Personalized_Recommendation_view,
  },
  {
    path: "/Settings_view",
    name: "Settings_view",
    component: Settings_view,
  },
  {
    path: "/Favorite_List_view",
    name: "Favorite_List_view",
    component: Favorite_List_view,
  },
  {
    path: "/Feedback_List_view",
    name: "Feedback_List_view",
    component: Feedback_view,
  },
  {
    path: "/Reset_Password_view",
    name: "Reset_Password_view",
    component: Reset_Password_view,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
