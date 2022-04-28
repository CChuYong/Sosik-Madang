import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import ShopInfoDialog from "@/pages/ShopInfoDialog.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "info/:id",
        component: ShopInfoDialog,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
