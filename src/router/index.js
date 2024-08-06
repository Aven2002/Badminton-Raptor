import { createRouter, createWebHistory } from 'vue-router';

import Home_view_Admin from '@/views/Admin/Home_view_Admin.vue';
import Manage_Account_view from '@/views/Admin/Manage_Account_view.vue';
import Manage_Equipment_view from '@/views/Admin/Manage_Equipment_view.vue';
import Manage_Feedback_view from '@/views/Admin/Manage_Feedback_view.vue';
import Manage_Recommendation_view from '@/views/Admin/Manage_Recommendation_view.vue';
import Create_Equipment_com from '@/components/Create_Equipment_com.vue';
import View_Account_com from '@/components/View_Account_com.vue';
import View_Equipment_com from '@/components/View_Equipment_com.vue';
import View_Feedback_com from '@/components/View_Feedback_com.vue';
import View_Recommendation_com from '@/components/View_Recommendation_com.vue';
import Update_Account_com from '@/components/Update_Account_com.vue';
import Update_Equipment_com from '@/components/Update_Account_com.vue';

import Home_view_User from '@/views/User/Home_view_User.vue';
import Browse_Equipment_view from '@/views/User/Browse_Equipment_view.vue';
import Equipment_Details_view from '@/views/User/Equipment_Details_view.vue';
import Compare_Equipment_view from '@/views/User/Compare_Equipment_view.vue';
import Favorite_List_view from '@/views/User/Favorite_List_view.vue';
import Equipment_Recommendation_view from '@/views/User/Equipment_Recommendation_view.vue';
import Contact_Us_view from '@/views/User/Contact_Us_view.vue';

import Landing_view from '@/views/Landing_view.vue';
import Settings_view from '@/views/Settings_view.vue';
import Log_In_view from '@/views/Log_In_view.vue';
import Sign_Up_view from '@/views/Sign_Up_view.vue';

const routes = [

  //Admin Routes
    { path: '/home_view_admin', component: Home_view_Admin},
    { path: '/manage_equipment_view', component: Manage_Equipment_view },
    { path: '/manage_account_view', component: Manage_Account_view },
    { path: '/manage_feedback_view', component: Manage_Feedback_view },
    { path: '/manage_recommendation_view', component: Manage_Recommendation_view },
  {
    path: '/manage_account_view',component: Manage_Account_view,
    children: [
      { path: 'update_account_com', component: Update_Account_com },
      { path: 'view_account_com', component: View_Account_com }
    ]
  },
  {
    path: '/manage_equipment_view',component: Manage_Equipment_view,
    children: [
      { path: 'create_equipment_com', component: Create_Equipment_com },
      { path: 'update_equipment_com', component: Update_Equipment_com },
      { path: 'view_equipment_com', component: View_Equipment_com }
    ]
  },
  {
    path: '/manage_feedback_view',
    component: Manage_Feedback_view,
    children: [
      { path: 'view_feedback_com', name: 'View_Feedback', component: View_Feedback_com }
    ]
  },
  {
    path: '/manage_recommendation_view',component: Manage_Recommendation_view,
    children: [
      { path: 'view_recommendation_com', component: View_Recommendation_com }
    ]
  },

  //User Routes
  { path: '/home_view_user', component: Home_view_User},
  { path: '/browse_equipment_view', component: Browse_Equipment_view },
  { path: '/equipment/:id', name: 'Equipment_Details_view', component: Equipment_Details_view, props: true },
  { path: '/compare_equipment_view', component: Compare_Equipment_view },
  { path: '/equipment_recommendation_view', component: Equipment_Recommendation_view },
  { path: '/manage_recommendation_view', component: Manage_Recommendation_view },
  { path: '/favorite_list_view', component: Favorite_List_view},
  { path: '/contact_us_view', component: Contact_Us_view },

  //General Routes
  {path: '/', component: Landing_view},
  {path: '/sign_up_view', component: Sign_Up_view},
  {path: '/log_in_view', component: Log_In_view},
  {path: '/settings_view', component: Settings_view},

];

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;
