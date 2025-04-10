import { createRouter, createWebHistory } from "vue-router";

// Views (lazy-loaded)
const DashboardView = () => import("@/views/DashboardView.vue");
const EventsView = () => import("@/views/EventsView.vue");
const OrganizersView = () => import("@/views/OrganizersView.vue");
const UsersView = () => import("@/views/UsersView.vue");
const TransactionsView = () => import("@/views/TransactionsView.vue");
const CategoriesView = () => import("@/views/CategoriesView.vue");
const SettingsView = () => import("@/views/SettingsView.vue");

// Layout
import MainLayout from "@/components/layouts/MainLayout.vue";

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
        path: "events",
        name: "events",
        component: EventsView,
      },
      {
        path: "organizers",
        name: "organizers",
        component: OrganizersView,
      },
      {
        path: "users",
        name: "users",
        component: UsersView,
      },
      {
        path: "transactions",
        name: "transactions",
        component: TransactionsView,
      },
      {
        path: "categories",
        name: "categories",
        component: CategoriesView,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
