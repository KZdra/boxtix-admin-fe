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
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <Dropdown
            v-model="form.role_id"
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
            @change="handleFileUpload"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2 pt-4">
          <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
          <Button :label="isEditMode ? 'Update' : 'Save'" icon="pi pi-check" @click="submitForm" />
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
          <img
            :src="selectedUser.profile_picture_url"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div class="font-bold text-lg">{{ selectedUser.name }}</div>
            <div class="text-gray-600 text-sm">{{ selectedUser.email }}</div>
          </div>
        </div>
        <div><strong>Role:</strong> {{ selectedUser.role_name }}</div>
      </div>
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
        <img
          :src="data.profile_picture_url"
          alt="Foto User"
          class="w-10 h-10 object-cover rounded-full"
        />
      </template>
    </BaseDataTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseDataTable from '@/components/BaseDataTable.vue'
import Swal from 'sweetalert2'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Dummy data
const userList = computed(() => userStore.state)

const roles = [
  { label: 'Admin', value: 1 },
  { label: 'Admin Event', value: 2 },
]

const userColumns = [
  { field: 'name', header: 'Nama' },
  { field: 'email', header: 'Email' },
  { field: 'role_name', header: 'Role' },
  { field: 'profile_picture_url', header: 'Foto', slot: 'photo' },
]

// Form state
const dialogVisible = ref(false)
const isEditMode = ref(false)
const form = ref({
  id: null,
  name: '',
  email: '',
  role_id: '',
  password: '',
  password_confirmation: '',
  picture_profile: '',
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
    role_id: '',
    password: '',
    password_confirmation: '',
    picture_profile: '',
  }
  isEditMode.value = false
}

const submitForm = async () => {
  const { name, email, password, password_confirmation, role_id, picture_profile } = form.value
  if (name && email && role_id) {
    // validasi simple, pastikan data wajib diisi
    try {
      if (isEditMode.value && form.value.id !== null) {
        // Mode edit
        try {
          const response = await userStore.updateUser(form.value.id, {
            name,
            email,
            role_id,
            password,
            password_confirmation,
            picture_profile,
          })
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Data berhasil diupdate!',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          console.error('Gagal update user:', error)
        }
      } else {
        // Tambah user baru
        try {
          const response = await userStore.addUser({
            name,
            email,
            role_id,
            password,
            password_confirmation,
            picture_profile,
          })
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Data berhasil ditambahkan!',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          console.error('Gagal menambahkan user:', error)
        }
      }
      resetForm()
      closeDialog()
    } catch (error) {
      console.error('Error saat submit form:', error)
    }
  } else {
    alert('Semua field wajib diisi!')
  }
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

const handleDelete = async (user) => {
  userToDelete.value = user
  deleteDialogVisible.value = true
  await Swal.fire({
    title: `Hapus User: ${user.name}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await userStore.deleteUser(user.id)
      } catch (error) {
        console.error(error)
      } finally {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your User has been deleted.',
          icon: 'success',
        })
      }
    }
  })
}

const handleFileUpload = (e) => {
  const file = e.target.files?.[0]

  if (!file) {
    Swal.fire('Oops!', 'Tidak ada file yang dipilih!', 'warning')
    return
  }

  if (!file.type.startsWith('image/')) {
    Swal.fire('Oops!', 'File harus berupa gambar!', 'warning')
    return
  }

  form.value.picture_profile = file
}

onMounted(async () => {
  try {
    await userStore.fetchUsers()
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped></style>
