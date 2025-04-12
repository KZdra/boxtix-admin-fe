<template>
  <div class="p-4">
    <aside
      class="h-[calc(100vh-90px)] bg-sky-800 text-white space-y-6 transition-all duration-300 rounded-xl shadow-lg"
      :class="isExpanded ? 'w-64' : 'w-16'"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
    >
      <div class="p-4">
        <h2 v-if="isExpanded" class="text-2xl font-bold mb-6">Admin Panel</h2>
      </div>

      <nav class="flex flex-col gap-2">
        <RouterLink
          v-for="item in menu"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center gap-4 px-4 py-2 hover:bg-gray-700 transition-all duration-300',
            item.path !== '/' && $route.path === item.path ? 'bg-gray-700' : '',
          ]"
        >
          <font-awesome-icon :icon="item.icon" class="w-5 h-5" />
          <span v-show="isExpanded" class="transition-all duration-300">
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

const menu = [
  { name: 'Dashboard', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Kategori', path: '/DaftarKategoriView', icon: 'fa-solid fa-tags' },
  { name: 'Events', path: '/DaftarEventView', icon: 'fa-solid fa-calendar-days' },
  { name: 'Ticket', path: '/DaftarTicketView', icon: 'fa-solid fa-ticket' },
  { name: 'Management User', path: '/ManagementUserView', icon: 'fa-solid fa-users-gear' },
]
</script>
