<template>
  <header class="bg-sky-800 h-[74px]">
    <nav
      class="flex justify-between items-center px-14 py-0 mx-auto my-0 h-full max-w-[1349px] max-md:px-5 max-md:py-0"
    >
      <h1 class="text-3xl font-bold text-white">
        <router-link to="/" class="p-2.5 text-lg text-white cursor-pointer">
          BoxTix
        </router-link>
      </h1>
      <div class="flex items-center gap-6">
        <button
          class="px-4 py-2.5 text-sm text-blue-800 bg-white rounded cursor-pointer border-[none]"
        >
          Host Your Event
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
