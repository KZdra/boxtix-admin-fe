<template>
    <div>
      <Header/>
      <main class="w-full">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import Header from "../Header.vue";
  </script>