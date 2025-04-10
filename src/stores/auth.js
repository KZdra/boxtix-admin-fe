import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
  // tambahkan field lain sesuai kebutuhan
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    role: null as string | null,
  }),

  actions: {
    login(userData: User) {
      this.user = userData
      this.role = userData.role
    },

    logout() {
      this.user = null
      this.role = null
    },
  },
})
