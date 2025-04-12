<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => !!authStore.user)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-[74px] bg-white z-40 shadow flex items-center justify-between px-6"
  >
    <div class="text-xl font-bold text-blue-600">BoxTix</div>
    <div>
      <button v-if="isLoggedIn" @click="handleLogout" class="text-sm text-red-500 hover:underline">
        Logout
      </button>
      <button v-else @click="router.push('/login')" class="text-sm text-blue-500 hover:underline">
        Login
      </button>
    </div>
  </header>
</template>
