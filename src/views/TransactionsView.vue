<template>
  <div>
    <h1>Transactions</h1>
    <ul>
      <li v-for="tx in transactions" :key="tx.id">
        {{ tx.user }} beli tiket {{ tx.event }} seharga {{ tx.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const transactions = ref([
  { id: 1, user: 'Dapa', event: 'Music Fest', amount: '$50' },
  { id: 2, user: 'Nisa', event: 'Tech Conference', amount: '$80' }
])
</script>
