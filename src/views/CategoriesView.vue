<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref(['Music', 'Technology', 'Business', 'Art'])
</script>
