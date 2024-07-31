import { createRouter, createWebHistory } from 'vue-router';
import stateManagement from '@/State_management';

// Import views
import Landing_view from '@/views/User_views/Landing_view.vue';
import Home_view_user from '@/views/User_views/Home_view_user.vue';
import Login_view from '@/views/User_views/Login_view.vue';
import SignUp_view from '@/views/User_views/SignUp_view.vue';
import Browse_Equipment_view from '@/views/User_views/Browse_Equipment_view.vue';
import Compare_Equipment_view from '@/views/User_views/Compare_Equipment_view.vue';
import Personalized_Recommendation_view from '@/views/User_views/Personalized_Recommendation_view.vue';
import Settings_view from '@/views/User_views/Settings_view.vue';
import Favorite_List_view from '@/views/User_views/Favorite_List_view.vue';
import Contact_Us_view from '@/views/User_views/Contact_Us_view.vue';
import Reset_Password_view from '@/views/User_views/Reset_Password_view.vue';
import Equipment_Details_view from '@/views/User_views/Equipment_Details_view.vue';

import Home_view_admin from '@/views/Admin_views/Home_view_admin.vue';
import Manage_Equipment_view from '@/views/Admin_views/Manage_Equipment_view.vue';
import Manage_Account_view from '@/views/Admin_views/Manage_Account_view.vue';
import Manage_Feedback_view from '@/views/Admin_views/Manage_Feedback_view.vue';
import Manage_Recommendation_view from '@/views/Admin_views/Manage_Recommendation_view.vue';

const routes = [
  // Define routes
  { path: "/", name: "Landing_view", component: Landing_view },
  { path: "/Login_view", name: "Login_view", component: Login_view },
  { path: "/SignUp_view", name: "SignUp_view", component: SignUp_view },
  { path: "/Home_view_user", name: "Home_view_user", component: Home_view_user, meta: { requiresUser: true } },
  { path: "/Browse_Equipment_view", name: "Browse_Equipment_view", component: Browse_Equipment_view },
  { path: "/Compare_Equipment_view", name: "Compare_Equipment_view", component: Compare_Equipment_view },
  { path: "/Personalized_Recommendation_view", name: "Personalized_Recommendation_view", component: Personalized_Recommendation_view },
  { path: "/Settings_view", name: "Settings_view", component: Settings_view },
  { path: "/Favorite_List_view", name: "Favorite_List_view", component: Favorite_List_view },
  { path: "/Contact_Us_view", name: "Contact_Us_view", component: Contact_Us_view, meta: { requiresUser: true } },
  { path: "/Reset_Password_view", name: "Reset_Password_view", component: Reset_Password_view },
  { path: '/equipment/:id', name: 'Equipment_Details_view', component: Equipment_Details_view, props: true },

  { path: "/Home_view_admin", name: "Home_view_admin", component: Home_view_admin, meta: { requiresAdmin: true } },
  { path: "/Manage_Equipment_view", name: "Manage_Equipment_view", component: Manage_Equipment_view },
  { path: "/Manage_Account_view", name: "Manage_Account_view", component: Manage_Account_view },
  { path: "/Manage_Feedback_view", name: "Manage_Feedback_view", component: Manage_Feedback_view },
  { path: "/Manage_Recommendation_view", name: "Manage_Recommendation_view", component: Manage_Recommendation_view }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Fetch user role before navigation
  await stateManagement.dispatch('fetchUserRole');
  
  const isAdmin = stateManagement.getters.isAdmin;
  
  if (to.meta.requiresAdmin && !isAdmin) {
    next('/'); // Redirect to home or login page if not admin
  } else if (to.meta.requiresUser && isAdmin) {
    next('/'); // Redirect to home or login page if admin tries to access user-only page
  } else {
    next(); // Allow navigation
  }
});

export default router;
