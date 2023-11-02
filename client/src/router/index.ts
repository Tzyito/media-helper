import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    redirect: "/download",
    children: [
      {
        path: "/download",
        name: "Download",
        component: () => import("@/pages/Download.vue"),
      },
      {
        path: "/compression",
        name: "Compression",
        component: () => import("@/pages/Compression.vue"),
      },
      {
        path: "/separation",
        name: "Separation",
        component: () => import("@/pages/Separation.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
