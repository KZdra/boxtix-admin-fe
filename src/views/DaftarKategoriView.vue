<template>
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-bold">Daftar Kategori</h2>
  
      <BaseDataTable
        :data="kategoriList"
        :columns="kategoriColumns"
        :actions="['detail', 'delete']"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </div>
  </template>
  
  <script setup>
  import BaseDataTable from '@/components/BaseDataTable.vue' // Pastikan path sesuai
  import { ref } from 'vue'
  
  // Data kategori dummy
  const kategoriList = ref([
    { id: 1, nama_kategori: 'Konser Musik' },
    { id: 2, nama_kategori: 'Festival Budaya' },
    { id: 3, nama_kategori: 'Komedi Stand-Up' },
    { id: 4, nama_kategori: 'Pameran Seni' }
  ])
  
  // Kolom tabel
  const kategoriColumns = [
    { field: 'nama_kategori', header: 'Nama Kategori' }
  ]
  
  // Event tombol aksi
  function handleDetail(kategori) {
    alert(`Detail kategori: ${kategori.nama_kategori}`)
  }
  
  function handleDelete(kategori) {
    if (confirm(`Yakin mau hapus kategori "${kategori.nama_kategori}"?`)) {
      alert('Kategori dihapus (simulasi).')
    }
  }
  </script>
  