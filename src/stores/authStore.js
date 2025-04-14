import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import Cookies from 'js-cookie'

import Swal from 'sweetalert2'
import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const token = ref(Cookies.get('token') || '')

  const setToken = (newToken) => {
    token.value = newToken
    Cookies.set('token', newToken)
  }

  const setUser = (newUser) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const clearToken = () => {
    token.value = ''
    Cookies.remove('token')
    localStorage.removeItem('user')
  }

  const login = async (credentials) => {
    try {
      const response = await apiService.apiPost('/api/auth/login', credentials) // Menggunakan apiService.apiPost
      if (response.status == 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Login berhasil',
          text: 'Redirecting...',
          timer: 3000,
          showConfirmButton: false,
        })
      }
      setToken(response.data.access_token)
      setUser(response.data.user)
    } catch (error) {
      errorHandling(error)
    } finally {
      router.push('/')
    }
  }

  const register = async (credentials) => {
    try {
      const res = await apiService.apiPost('/api/auth/register', credentials) // Menggunakan apiService.apiPost
      if (res.status == 201) {
        await Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil!',
          text: 'Redirecting...',
          timer: 3000,
          showConfirmButton: false,
        })
      }
    } catch (error) {
      errorHandling(error)
    } finally {
      await login(credentials)
    }
  }

  const logout = async () => {
    try {
      await apiService.apiPost('/api/auth/logout', {}) // Menggunakan apiService.apiPost
      clearToken()
      router.push({ name: 'Login' })
    } catch (error) {
      errorHandling(error)
    }
  }

  const fetchUser = async () => {
    try {
      const response = await apiService.apiPost('/api/auth/me', {}) // Menggunakan apiService.apiPost
      const { id, name, email, role } = response.data
      setUser({ id, name, email, role })
    } catch (error) {
      errorHandling(error)
      logout()
    }
  }

  const refreshToken = async () => {
    try {
      const response = await apiService.apiPost(
        '/api/auth/refresh',
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      setToken(response.data.access_token)
      setUser(response.data.user)
    } catch (error) {
      errorHandling(error)
      logout()
    }
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    user,
    token,
    login,
    register,
    logout,
    fetchUser,
    refreshToken,
    isAuthenticated,
    clearToken,
  }
})
