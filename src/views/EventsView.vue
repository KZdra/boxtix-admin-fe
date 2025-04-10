<template>
  <div>
    <h1>Events</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.name }} - {{ event.date }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const events = ref([
  { id: 1, name: 'Music Fest', date: '2025-05-12' },
  { id: 2, name: 'Tech Conference', date: '2025-06-22' },
  { id: 3, name: 'Startup Meetup', date: '2025-07-05' }
])
</script>
