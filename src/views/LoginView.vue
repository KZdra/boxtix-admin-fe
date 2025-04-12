<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
      <h2 class="mb-4 text-2xl font-semibold">Login</h2>
      <form @submit.prevent="login">
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
        <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded">Login</button>
      </form>
      <div class="mt-4 text-sm text-center">
        <span>Don't have an account? </span>
        <router-link to="/register" class="text-blue-600">Register here</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  // Proses login, misalnya menggunakan Pinia atau logic login lainnya
  router.push('/') // Redirect to dashboard
}
</script>

<style scoped>
input,
button {
  font-size: 1rem;
}
</style>
