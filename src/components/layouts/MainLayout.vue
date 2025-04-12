<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="flex flex-1">
      <div class="shrink-0">
        <Sidebar />
      </div>

      <main class="flex-1 overflow-auto bg-white">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "../Header.vue";
import Sidebar from "../Sidebar.vue";
</script>
