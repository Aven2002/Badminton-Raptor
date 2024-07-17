import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

// Make axios available globally
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount("#app");
