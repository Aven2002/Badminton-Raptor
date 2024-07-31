import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import stateManagement from './State_management';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from 'js-cookie';

const app = createApp(App);

// Make axios available globally
app.config.globalProperties.$axios = axios;

// Example of setting a cookie
Cookies.set('exampleCookie', 'cookieValue', { expires: 7 }); // Expires in 7 days

// Example of getting a cookie
const userID = Cookies.get('userID');
console.log('User ID from cookie:', userID);

app.use(router); 
app.use(stateManagement);
app.mount("#app");
