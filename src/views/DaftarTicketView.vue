<template>
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-bold">Daftar Tiket</h2>
  
      <BaseDataTable
        :data="tickets"
        :columns="ticketColumns"
        :actions="['detail', 'delete']"
        @detail="handleDetail"
        @delete="handleDelete"
      />
    </div>
  </template>
  
  <script setup>
  import BaseDataTable from '@/components/BaseDataTable.vue' // pastikan path ini sesuai dengan struktur folder kamu
  
  // Data dummy tiket (simulasi)
  const tickets = [
    {
      id: 1,
      nama_konser: 'Rock Night 2025',
      stok_tiket: 150,
      harga_tiket: 75000
    },
    {
      id: 2,
      nama_konser: 'Jazz Fest 2025',
      stok_tiket: 80,
      harga_tiket: 120000
    },
    {
      id: 3,
      nama_konser: 'Pop Carnival',
      stok_tiket: 200,
      harga_tiket: 90000
    }
  ]
  
  // Kolom untuk DataTable
  const ticketColumns = [
    { field: 'nama_konser', header: 'Nama Konser' },
    { field: 'stok_tiket', header: 'Stok Tiket' },
    { field: 'harga_tiket', header: 'Harga Tiket' }
  ]
  
  // Fungsi aksi
  function handleDetail(ticket) {
    alert(`Detail tiket konser: ${ticket.nama_konser}`)
  }
  
  function handleDelete(ticket) {
    if (confirm(`Hapus tiket konser "${ticket.nama_konser}"?`)) {
      alert('Tiket dihapus (simulasi).')
    }
  }
  </script>
  