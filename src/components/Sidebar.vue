<template>
  <aside
    class="fixed top-[74px] left-0 h-[calc(100vh-74px)] bg-boxblue text-white shadow-lg rounded-br-3xl transition-all duration-300"
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
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const props = defineProps({
  isExpanded: Boolean,
})

const emit = defineEmits(['update:isExpanded'])

const toggleSidebar = () => {
  emit('update:isExpanded', !props.isExpanded)
}

const menu = [
  { name: 'Dashboard', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Events', path: '/DaftarEventView', icon: 'fa-solid fa-calendar-days' },
  { name: 'Kategori Tiket', path: '/DaftarKategoriView', icon: 'fa-solid fa-tags' },
  { name: 'Ticket', path: '/DaftarTicketView', icon: 'fa-solid fa-ticket' },
  { name: 'Management User', path: '/ManagementUserView', icon: 'fa-solid fa-users-gear' },
]

const filteredMenu = computed(() => {
  const userRole = authStore.user?.role_id
  if (userRole === 1) {
    return menu.filter((item) => item.name !== 'Kategori Tiket' && item.name !== 'Ticket')
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
