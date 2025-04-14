import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { getActivePinia } from 'pinia'
import { errorHandling } from '@/utils/errorHandling'
// Views (lazy-loaded)
const DashboardView = () => import('@/views/DashboardView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')

// Layout
const MainLayout = () => import('@/components/layouts/MainLayout.vue')
const ManagamentUserView = () => import('@/views/ManagamentUserView.vue')
const DaftarEventView = () => import('@/views/DaftarEventView.vue')
const DaftarTicketView = () => import('@/views/DaftarTicketView.vue')
const DaftarKategoriView = () => import('@/views/DaftarKategoriView.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register', // Tambahkan route untuk register
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
        meta: { requiresAuth: true, roles: [1, 2] },
      },
      {
        path: 'ManagementUserView',
        name: 'ManagementUserView',
        component: ManagamentUserView,
        meta: { requiresAdmin: true, roles: [1] },
      },
      {
        path: 'DaftarEventView',
        name: 'DaftarEventView',
        component: DaftarEventView,
        meta: { requiresAuth: true, roles: [1, 2] },
      },
      {
        path: 'DaftarTicketView',
        name: 'DaftarTicketView',
        component: DaftarTicketView,
        meta: { requiresAuth: true, roles: [2] },
      },
      {
        path: 'DaftarKategoriView',
        name: 'DaftarKategoriView',
        component: DaftarKategoriView,
        meta: { requiresAuth: true, roles: [2] },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const pinia = getActivePinia()
  if (pinia) {
    const authStore = useAuthStore(pinia)

    if (authStore.token && !authStore.isAuthenticated) {
      try {
        await authStore.refreshToken()
      } catch (error) {
        errorHandling(error)
        return
      }
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'Login' })
      return
    }

    if (to.name === 'Login' && authStore.isAuthenticated) {
      next('/')
      return
    }

    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRoles = authStore.user.role_id || null
      const hasRole = to.meta.roles.includes(userRoles)

      if (!hasRole) {
        next('/') 
        return
      }
    }

    next()
  } else {
    next()
  }
})

export default router
