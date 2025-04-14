<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Daftar Kategori Ticket</h2>

    <!-- Toolbar: Tambah + Filter -->
    <div class="flex flex-col gap-4 mb-4">
      <!-- Tombol Tambah -->
      <div>
        <Button
          label="Tambah Kategori"
          icon="pi pi-plus"
          class="text-blue-500"
          @click="openAddDialog"
        />
      </div>

      <!-- Dropdown Filter -->
      <div>
        <Dropdown
          v-model="selectedFilterKategori"
          :options="dropEventList"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter Kategori"
          class="w-48"
          showClear
        />
      </div>
    </div>

    <!-- Tabel -->
    <BaseDataTable
      :data="filteredTicketcats"
      :columns="kategoriColumns"
      :actions="['edit', 'delete']"
      :searchable="true"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Dialog Tambah/Edit -->
    <Dialog
      v-model:visible="dialogVisible"
      modal
      :header="isEditMode ? 'Edit Kategori' : 'Tambah Kategori'"
      class="w-[90vw] md:w-[25rem]"
    >
      <div class="grid gap-4 mt-2">
        <!-- Dropdown Select -->
        <label class="block text-sm font-medium">Pilih Event</label>
        <select
          v-model="kategoriForm.event_id"
          @change="handleEventChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="" selected>-- Pilih Event --</option>
          <option v-for="event in masterEventList" :key="event.id" :value="event.id">
            {{ event.title }}
          </option>
        </select>

        <!-- Input Nama Kategori -->
        <label class="block text-sm font-medium">Nama Kategori</label>
        <input
          type="text"
          v-model="kategoriForm.category_name"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <template #footer>
        <Button
          label="Batal"
          icon="pi pi-times"
          class="p-button-text"
          @click="dialogVisible = false"
        />
        <Button label="Simpan" icon="pi pi-check" @click="submitKategori" />
      </template>
    </Dialog>

    <!-- Dialog Detail -->
    <Dialog
      v-model:visible="detailDialogVisible"
      modal
      header="Detail Kategori"
      class="w-[90vw] md:w-[25rem]"
    >
      <div v-if="selectedKategori">
        <p><strong>Nama Kategori:</strong> {{ selectedKategori.nama_kategori }}</p>
      </div>
    </Dialog>

    <!-- Dialog Konfirmasi Hapus -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      header="Konfirmasi Hapus"
      class="w-[90vw] md:w-[25rem]"
    >
      <p>
        Apakah Anda yakin ingin menghapus kategori
        <strong>{{ selectedKategori?.nama_kategori }}</strong
        >?
      </p>
      <template #footer>
        <Button label="Batal" class="p-button-text" @click="deleteDialogVisible = false" />
        <Button label="Hapus" icon="pi pi-trash" severity="danger" @click="confirmDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseDataTable from '@/components/BaseDataTable.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useTicketCategoryStore } from '@/stores/ticketCategoryStore'
import { useEventStore } from '@/stores/eventStore'
import Swal from 'sweetalert2'
const EventStore = useEventStore()
const ticketCategoryStore = useTicketCategoryStore()

const ticketcats = computed(() => ticketCategoryStore.state)
const masterEventList = computed(() => EventStore.state)
const dropEventList = computed(() =>
  masterEventList.value.map((event) => ({
    label: event.title,
    value: event.id,
  })),
)
const filteredTicketcats = computed(() => {
  if (!selectedFilterKategori.value) {
    return ticketcats.value
  }
  return ticketcats.value.filter((cat) => cat.event_id === selectedFilterKategori.value)
})
// Kolom Tbel
const kategoriColumns = [
  { field: 'event_name', header: 'Nama Event' },
  { field: 'category_name', header: 'Kategori' },
]

const selectedFilterKategori = ref(null)

// --- Dialog State ---
const dialogVisible = ref(false)
const detailDialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const isEditMode = ref(false)
const selectedKategori = ref(null)

const kategoriForm = ref({
  event_id: '',
  category_name: '',
})

const openAddDialog = async () => {
  try {
    await EventStore.fetchOwnEvents()
    isEditMode.value = false
    kategoriForm.value = { event_id: '', category_name: '' }
    dialogVisible.value = true
  } catch (error) {
    console.log(error)
  }
}

const handleEdit = async (kategori) => {
  try {
    isEditMode.value = true
    kategoriForm.value = { ...kategori }
    dialogVisible.value = true
  } catch (error) {
    console.log(error)
  }
}

const submitKategori = async () => {
  if (!kategoriForm.value.category_name) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Nama kategori wajib diisi.',
    })
    return
  }

  const body = {
    event_id: kategoriForm.value.event_id,
    category_name: kategoriForm.value.category_name,
  }

  if (isEditMode.value) {
    try {
      await ticketCategoryStore.updateTicketCategory(kategoriForm.value.id, body) // misal untuk edit
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kategori berhasil diperbarui.',
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat memperbarui kategori.',
      })
    }
  } else {
    try {
      await ticketCategoryStore.addTicketCategory(body)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Kategori berhasil ditambahkan.',
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menambahkan kategori.',
      })
    }
  }

  dialogVisible.value = false
}

const handleDelete = async (kategori) => {
  await Swal.fire({
    title: `Hapus Kategori: ${kategori.category_name}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await ticketCategoryStore.deleteTicketCategory(kategori.id)
      } catch (error) {
        console.error(error)
      } finally {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Category has been deleted.',
          icon: 'success',
        })
      }
    }
  })
}

onMounted(async () => {
  try {
    await ticketCategoryStore.fetchTicketCategories()
    await EventStore.fetchOwnEvents()
  } catch (error) {
    console.error(error)
  }
})
</script>
