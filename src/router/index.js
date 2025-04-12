import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views (lazy-loaded)
const DashboardView = () => import('@/views/DashboardView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')

// Layout
import MainLayout from '@/components/layouts/MainLayout.vue'
import ManagamentUserView from '@/views/ManagamentUserView.vue'
import DaftarEventView from '@/views/DaftarEventView.vue'
import DaftarTicketView from '@/views/DaftarTicketView.vue'
import DaftarKategoriView from '@/views/DaftarKategoriView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
    {
    path: '/register',  // Tambahkan route untuk register
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'ManagementUserView',
        name: 'ManagementUserView',
        component: ManagamentUserView,
        meta: { requiresAdmin: true },  // Hanya untuk admin
      },
      {
        path: 'DaftarEventView',
        name: 'DaftarEventView',
        component: DaftarEventView,
      },
      {
        path: 'DaftarTicketView',
        name: 'DaftarTicketView',
        component: DaftarTicketView,
      },
      {
        path: 'DaftarKategoriView',
        name: 'DaftarKategoriView',
        component: DaftarKategoriView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Route Guard untuk memeriksa role
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.user

  // Jika rute membutuhkan akses admin dan user bukan admin
  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    return next('/login')  // Redirect ke halaman login
  }

  // Lanjutkan ke rute berikutnya
  next()
})

export default router
