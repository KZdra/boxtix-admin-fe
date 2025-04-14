<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Manajemen User</h1>

    <!-- Tombol Tambah User -->
    <Button
      label="Tambah User"
      icon="pi pi-plus"
      class="mb-4 text-blue-500"
      @click="openAddDialog"
    />

    <!-- Dialog Tambah/Edit -->
    <Dialog
      v-model:visible="dialogVisible"
      modal
      :closable="false"
      class="w-[90vw] md:w-[30rem] rounded-xl"
    >
      <template #header>
        <h2 class="text-lg font-semibold text-gray-800">
          {{ isEditMode ? 'Edit Akun' : 'Tambah Akun' }}
        </h2>
      </template>

      <div class="space-y-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <Dropdown
            v-model="form.role"
            :options="roles"
            optionLabel="label"
            optionValue="value"
            placeholder="Pilih Role"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Upload Foto</label>
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2 pt-4">
          <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
          <Button
            :label="isEditMode ? 'Update' : 'Save'"
            icon="pi pi-check"
            @click="submitForm"
          />
        </div>
      </template>
    </Dialog>

    <!-- Dialog Detail -->
    <Dialog
      v-model:visible="detailDialogVisible"
      modal
      header="Detail Pengguna"
      class="w-[90vw] md:w-[30rem] rounded-xl"
    >
      <div v-if="selectedUser" class="space-y-4">
        <div class="flex items-center gap-4">
          <img :src="selectedUser.photo" class="w-16 h-16 rounded-full object-cover" />
          <div>
            <div class="font-bold text-lg">{{ selectedUser.name }}</div>
            <div class="text-gray-600 text-sm">{{ selectedUser.email }}</div>
          </div>
        </div>
        <div>
          <strong>Role:</strong> {{ selectedUser.role }}
        </div>
      </div>
    </Dialog>

    <!-- Dialog Delete -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      header="Konfirmasi Hapus"
      class="w-[90vw] md:w-[25rem] rounded-xl"
    >
      <div v-if="userToDelete">
        <p>Apakah Anda yakin ingin menghapus <strong>{{ userToDelete.name }}</strong>?</p>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2 pt-4">
          <Button label="Batal" icon="pi pi-times" severity="secondary" @click="cancelDelete" />
          <Button label="Hapus" icon="pi pi-trash" severity="danger" @click="confirmDelete" />
        </div>
      </template>
    </Dialog>

    <!-- Tabel User -->
    <BaseDataTable
      :data="userList"
      :columns="userColumns"
      :actions="['detail', 'edit', 'delete']"
      @detail="handleDetail"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #photo="{ data }">
        <img :src="data.photo" alt="Foto User" class="w-10 h-10 object-cover rounded-full" />
      </template>
    </BaseDataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataTable from '@/components/BaseDataTable.vue'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

// Dummy data
const userList = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    photo: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin Event',
    photo: 'https://i.pravatar.cc/100?img=2',
  },
])

const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Admin Event', value: 'Admin Event' },
]

const userColumns = [
  { field: 'name', header: 'Nama' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Role' },
  { field: 'photo', header: 'Foto', slot: 'photo' },
]

// Form state
const dialogVisible = ref(false)
const isEditMode = ref(false)
const form = ref({
  id: null,
  name: '',
  email: '',
  role: '',
  photo: '',
})

// Detail state
const detailDialogVisible = ref(false)
const selectedUser = ref(null)

// Delete dialog state
const deleteDialogVisible = ref(false)
const userToDelete = ref(null)

// Dialog handlers
const openAddDialog = () => {
  resetForm()
  dialogVisible.value = true
}

const closeDialog = () => {
  resetForm()
  dialogVisible.value = false
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    email: '',
    role: '',
    photo: '',
  }
  isEditMode.value = false
}

const submitForm = () => {
  if (isEditMode.value) {
    const index = userList.value.findIndex((u) => u.id === form.value.id)
    if (index !== -1) {
      userList.value[index] = { ...form.value }
    }
  } else {
    const newId = Date.now()
    userList.value.push({ ...form.value, id: newId })
  }
  closeDialog()
}

const handleEdit = (user) => {
  form.value = { ...user }
  isEditMode.value = true
  dialogVisible.value = true
}

const handleDetail = (user) => {
  selectedUser.value = user
  detailDialogVisible.value = true
}

const handleDelete = (user) => {
  userToDelete.value = user
  deleteDialogVisible.value = true
}

const confirmDelete = () => {
  if (userToDelete.value) {
    userList.value = userList.value.filter((u) => u.id !== userToDelete.value.id)
  }
  userToDelete.value = null
  deleteDialogVisible.value = false
}

const cancelDelete = () => {
  userToDelete.value = null
  deleteDialogVisible.value = false
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped></style>
