<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Manajemen User</h1>
  
      <BaseDataTable
        :data="userList"
        :columns="userColumns"
        :actions="['detail', 'delete']"
        @detail="handleDetail"
        @delete="handleDelete"
      >
        <template #photo="{ data }">
          <img
            :src="data.photo"
            alt="Foto User"
            class="w-10 h-10 object-cover rounded-full"
          />
        </template>
      </BaseDataTable>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BaseDataTable from '@/components/BaseDataTable.vue'
  
  const userList = ref([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      photo: 'https://i.pravatar.cc/100?img=1'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      photo: 'https://i.pravatar.cc/100?img=2'
    }
    
  ])
  
  const userColumns = [
    { field: 'name', header: 'Nama', sortable: true },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'photo', header: 'Foto', slot: 'photo' }
  ]
  
  const handleDetail = (user) => {
    alert(`Detail user:\nNama: ${user.name}\nEmail: ${user.email}`)
  }
  
  const handleDelete = (user) => {
    const konfirmasi = confirm(`Yakin mau hapus ${user.name}?`)
    if (konfirmasi) {
      userList.value = userList.value.filter(u => u.id !== user.id)
    }
  }
  </script>
  