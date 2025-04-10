<template>
  <div>
    <h1>Settings</h1>
    <ul>
      <li>Theme: {{ settings.theme }}</li>
      <li>Language: {{ settings.language }}</li>
      <li>Notifications: {{ settings.notifications ? 'On' : 'Off' }}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive({
  theme: 'Dark Mode',
  language: 'English',
  notifications: true
})
</script>
