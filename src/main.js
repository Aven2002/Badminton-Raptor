import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import stateManagement from './utils/State_management';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@/style/Global_style.css' 

const app = createApp(App);

// Make axios available globally
app.config.globalProperties.$axios = axios;

app.use(router); 
app.use(stateManagement);
app.mount("#app");
