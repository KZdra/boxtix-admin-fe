import { createRouter, createWebHistory } from "vue-router";

// Views (lazy-loaded)
const DashboardView = () => import("@/views/DashboardView.vue");

// Layout
import MainLayout from "@/components/layouts/MainLayout.vue";
import ManagamentUserView from "@/views/ManagamentUserView.vue";
import DaftarEventView from "@/views/DaftarEventView.vue";
import DaftarTicketView from "@/views/DaftarTicketView.vue";
import DaftarKategoriView from "@/views/DaftarKategoriView.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: DashboardView,
      },
      {
        path: "ManagementUserView",
        name: "ManagementUserView",
        component: ManagamentUserView,
      },
      {
        path: "DaftarEventView",
        name: "DaftarEventView",
        component: DaftarEventView,
      },
      {
        path: "DaftarTicketView",
        name: "DaftarTicketView",
        component: DaftarTicketView,
      },
      {
        path: "DaftarKategoriView",
        name: "DaftarKategoriView",
        component: DaftarKategoriView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
