<template>
  <aside
    class="fixed top-[74px] left-0 h-[calc(100vh-74px)] bg-sky-800 text-white shadow-lg rounded-br-3xl transition-all duration-300"
    :class="isExpanded ? 'w-64' : 'w-16'"
    @mouseenter="toggleSidebar"
    @mouseleave="toggleSidebar"
  >
    <nav class="flex flex-col gap-2">
      <RouterLink
        v-for="item in filteredMenu"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-4 px-4 py-3 transition-all duration-300 hover:bg-sky-700"
        :class="$route.path === item.path ? 'bg-sky-700' : ''"
      >
        <font-awesome-icon :icon="item.icon" class="w-5 h-5" />
        <span
          class="transition-opacity duration-300 whitespace-nowrap"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'"
        >
          {{ item.name }}
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const menu = [
  { name: 'Dashboard', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Kategori', path: '/DaftarKategoriView', icon: 'fa-solid fa-tags' },
  { name: 'Events', path: '/DaftarEventView', icon: 'fa-solid fa-calendar-days' },
  { name: 'Ticket', path: '/DaftarTicketView', icon: 'fa-solid fa-ticket' },
  { name: 'Management User', path: '/ManagementUserView', icon: 'fa-solid fa-users-gear' },
]

// Menerima prop isExpanded dari parent
const props = defineProps({
  isExpanded: Boolean,
})

// Menentukan event yang akan dipancarkan untuk memperbarui isExpanded di parent
const emit = defineEmits(['update:isExpanded'])

const toggleSidebar = () => {
  // Memancarkan event untuk memperbarui isExpanded
  emit('update:isExpanded', !props.isExpanded)
}
// Menyesuaikan menu berdasarkan role
const filteredMenu = computed(() => {
  const userRole = authStore.user?.role_id
  if (userRole === 1) {
    return menu.filter((item) => item.name !== 'Kategori' && item.name !== 'Ticket')
  } else {
    return menu.filter((item) => item.name !== 'Management User')
  }
})
</script>

<style scoped>
aside span {
  transition: opacity 0.2s ease-in-out;
}
</style>
