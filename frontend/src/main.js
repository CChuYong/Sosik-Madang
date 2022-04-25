import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/plugins/router";

import "normalize.css";
import "@/styles/main.scss";

createApp(App)
  .use(router)
  .mount("#app");
