<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-semibold">Dashboard</h1>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 bg-white shadow rounded-2xl" v-if="role_id == 1">
        <h2 class="text-lg text-gray-600">Total Customers</h2>
        <p class="text-2xl font-bold">{{ stats.customers ?? 'Tidak Ada Data' }}</p>
      </div>
      <div class="p-4 bg-white shadow rounded-2xl">
        <h2 class="text-lg text-gray-600">Total Events</h2>
        <p class="text-2xl font-bold">{{ stats.events ?? 'Tidak Ada Data' }}</p>
      </div>
      <div class="p-4 bg-white shadow rounded-2xl" v-if="role_id == 1">
        <h2 class="text-lg text-gray-600">Organizers</h2>
        <p class="text-2xl font-bold">{{ stats.organizers ?? 'Tidak Ada Data' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useDashboardStore } from '@/stores/dashboardStore'
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const stats = computed(() => dashboardStore.stats)
const role_id = computed(() => {
  const userRole = authStore.user?.role_id
  return userRole
})
onMounted(async()=>{
  try {
    await dashboardStore.fetchStats()
  } catch (error) {
   console.log(error) 
  }
})
</script>
