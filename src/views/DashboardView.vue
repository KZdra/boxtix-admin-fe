<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl shadow p-4">
        <h2 class="text-lg text-gray-600">Total Users</h2>
        <p class="text-2xl font-bold">{{ stats.users }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow p-4">
        <h2 class="text-lg text-gray-600">Total Events</h2>
        <p class="text-2xl font-bold">{{ stats.events }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow p-4">
        <h2 class="text-lg text-gray-600">Organizers</h2>
        <p class="text-2xl font-bold">{{ stats.organizers }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow p-4">
        <h2 class="text-lg text-gray-600">Revenue</h2>
        <p class="text-2xl font-bold">{{ stats.revenue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'



const stats = ref({
  users: 1023,
  events: 87,
  organizers: 12,
  revenue: '$12,340',
})
</script>
