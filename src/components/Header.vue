<template>
  <header
    class="fixed top-0 left-0 w-full h-[74px] bg-white z-40 shadow flex items-center justify-between px-6"
  >
    <div class="font-bold text-blue-600"><img src="/logo.png" alt="boxtixlogo" class="h-9" /></div>

    <div v-if="isLoggedIn" class="relative">
      <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none">
        <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
      </button>

      <div
        v-show="dropdownOpen"
        @click.away="dropdownOpen = false"
        class="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
      >
        <button
          @click="handleLogout"
          class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
        >
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="w-4 h-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed } from 'vue'

const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name)
const isLoggedIn = computed(() => authStore.isAuthenticated)

function handleLogout() {
  authStore.logout()
}
</script>
