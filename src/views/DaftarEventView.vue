<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Daftar Events</h2>
  
      <BaseDataTable
        :data="eventList"
        :columns="eventColumns"
        :actions="['detail', 'delete']"
        @detail="handleDetail"
        @delete="handleDelete"
      >
        <!-- Slot custom untuk kolom banner -->
        <template #banner="{ data }">
          <img :src="data.banner" alt="banner" class="w-24 h-16 object-cover rounded-md" />
        </template>
      </BaseDataTable>
    </div>
  </template>
  
  <script setup>
  import BaseDataTable from '@/components/BaseDataTable.vue'
  
  // Dummy data event (simulasi dari API)
  const eventList = [
    {
      id: 1,
      title: 'Konser Rock Malam Minggu',
      deskripsi: 'Konser seru bareng band lokal.',
      lokasi: 'Stadion Utama',
      tanggal_main: '2025-06-20',
      banner: 'https://marketplace.canva.com/EAF5lNLq7TQ/1/0/1131w/canva-poster-gigs-konser-musik-ilustrasi-hitam-merah-y25eREbnR5k.jpg'
    },
    {
      id: 2,
      title: 'Festival Jazz Kemerdekaan',
      deskripsi: 'Menikmati musik jazz & kuliner lokal.',
      lokasi: 'Taman Kota',
      tanggal_main: '2025-08-17',
      banner: 'https://via.placeholder.com/150x100?text=Jazz+Fest'
    }
  ]
  
  // Kolom datatable
  const eventColumns = [
    { field: 'title', header: 'Judul' },
    { field: 'deskripsi', header: 'Deskripsi' },
    { field: 'lokasi', header: 'Lokasi' },
    { field: 'tanggal_main', header: 'Tanggal Main' },
    { field: 'banner', header: 'Banner', slot: 'banner' } // pakai slot untuk img
  ]
  
  // Aksi saat klik tombol
  function handleDetail(event) {
    alert(`Detail event: ${event.title}`)
  }
  
  function handleDelete(event) {
    if (confirm(`Hapus event: ${event.title}?`)) {
      alert('Event dihapus (simulasi).')
    }
  }
  </script>
  