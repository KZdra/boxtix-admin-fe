<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'Dapa', email: 'dapa@mail.com' },
  { id: 2, name: 'Nisa', email: 'nisa@mail.com' }
])
</script>
