import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue3-toastify/dist/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createApp(App).use(store).use(router).mount("#app");
