<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
      <h2 class="mb-4 text-2xl font-semibold">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm">Role</label>
          <select
            id="role"
            v-model="role"
            class="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="admin">Admin</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded">Register</button>
      </form>
      <div class="mt-4 text-sm text-center">
        <span>Already have an account? </span>
        <router-link to="/login" class="text-blue-600">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('admin')

const authStore = useAuthStore()
const router = useRouter()

const register = () => {
  // Simulasi pendaftaran pengguna tanpa API
  const userData = {
    id: Date.now(), // Simulasi ID pengguna
    name: name.value,
    email: email.value,
    role: role.value, // Ganti role sesuai dengan yang dipilih
  }

  // Simpan user di store Pinia
  authStore.login(userData)

  // Redirect ke halaman dashboard setelah register
  router.push('/')
}
</script>

<style scoped>
input,
select,
button {
  font-size: 1rem;
}
</style>
