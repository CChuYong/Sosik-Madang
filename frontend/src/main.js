import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/plugins/router";
import store from "./plugins/store";

import "normalize.css";
import "@/styles/main.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
