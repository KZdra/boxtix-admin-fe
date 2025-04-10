<template>
  <div>
    <h1>Organizers</h1>
    <ul>
      <li v-for="org in organizers" :key="org.id">
        {{ org.name }} - {{ org.contact }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const organizers = ref([
  { id: 1, name: 'EventPro', contact: 'eventpro@mail.com' },
  { id: 2, name: 'MegaEvent', contact: 'megaevent@mail.com' }
])
</script>
