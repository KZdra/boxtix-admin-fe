<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <div class="flex pt-[74px]">
      <Sidebar :isExpanded="computedIsExpanded" @update:isExpanded="updateIsExpanded" />
      <main
        :class="['transition-all duration-300 p-6', isExpanded ? 'ml-64' : 'ml-16']"
        class="w-full"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

// State untuk kontrol sidebar
const isExpanded = ref(false)

// Properti computed untuk mengontrol isExpanded
const computedIsExpanded = computed({
  get() {
    return isExpanded.value
  },
  set(value: boolean) {
    isExpanded.value = value
  },
})

// Fungsi untuk menangani pembaruan isExpanded yang dipancarkan oleh child
const updateIsExpanded = (value: boolean) => {
  isExpanded.value = value
}
</script>
