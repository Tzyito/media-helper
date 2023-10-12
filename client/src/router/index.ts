import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Download.vue"),
  },
  {
    path: "/download",
    name: "Download",
    component: () => import("@/pages/Download.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
