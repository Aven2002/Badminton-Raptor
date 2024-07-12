import { createRouter, createWebHistory } from "vue-router";
import Landing_view from "../views/Landing_view.vue";
import Home_view from "../views/Home_view.vue";
import Login_view from "../views/Login_view.vue";
import SignUp_view from "../views/SignUp_view.vue";

const routes = [
  {
    path: "/",
    name: "Landing_view",
    component: Landing_view,
  },
  {
    path: "/Home_view",
    name: "Home_view",
    component: Home_view,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
