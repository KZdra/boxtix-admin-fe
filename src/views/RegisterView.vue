<template>
  <div class="flex items-center justify-center h-screen  bg-gradient-to-bl from-gsatu via-gdua to-gtiga">
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
          <label for="confirm_password" class="block text-sm">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            v-model="confirm_password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { errorHandling } from '@/utils/errorHandling'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')

const authStore = useAuthStore()

const register = async () => {
  const userData = {
    name: name.value,
    email: email.value,
    password:password.value,
    password_confirmation: confirm_password.value,
    role: 1
  }
  try {
    await authStore.register(userData)
  } catch (error) {
    errorHandling(error)
  }
}
</script>

<style scoped>
input,
select,
button {
  font-size: 1rem;
}
</style>
