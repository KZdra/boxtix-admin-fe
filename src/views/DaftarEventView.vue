<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Daftar Events</h2>

    <Button
      v-if="role_id == 2"
      label="Tambah Event"
      icon="pi pi-plus"
      class="mb-4 text-blue-500"
      @click="openAddDialog"
    />

    <BaseDataTable
      :data="eventList"
      :columns="eventColumns"
      :actions="['detail', ...(role_id == 2 ? ['edit'] : []), 'delete']"
      @detail="handleDetail"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #banner="{ data }">
        <img :src="data.banner_url" alt="banner" class="w-24 h-16 object-cover rounded-md" />
      </template>
    </BaseDataTable>

    <!-- Dialog Tambah / Edit Event -->
    <Dialog
      v-model:visible="openDialog"
      modal
      :header="isEditMode ? 'Edit Event' : 'Tambah Event'"
      :style="{ width: '30rem' }"
    >
      <div class="grid gap-4">
        <div>
          <label for="title" class="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            id="title"
            v-model="newEvent.title"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="deskripsi" class="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            id="deskripsi"
            v-model="newEvent.deskripsi"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label for="lokasi" class="block text-sm font-medium mb-1">Lokasi</label>
          <input
            type="text"
            id="lokasi"
            v-model="newEvent.lokasi"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="tanggal_main" class="block text-sm font-medium mb-1">Tanggal Main</label>
          <input
            type="date"
            id="tanggal_main"
            v-model="newEvent.tanggal_main"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="banner" class="block text-sm font-medium mb-1">Upload Banner</label>
          <input
            type="file"
            id="banner"
            @change="handleFileUpload"
            accept="image/*"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <template #footer>
        <Button
          label="Batal"
          icon="pi pi-times"
          class="p-button-text"
          @click="openDialog = false"
        />
        <Button label="Simpan" icon="pi pi-check" @click="saveEvent" />
      </template>
    </Dialog>

    <!-- Dialog Detail Event -->
    <Dialog
      v-model:visible="detailDialogVisible"
      modal
      header="Detail Event"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div v-if="selectedEvent" class="space-y-4">
        <div><strong>Judul:</strong> {{ selectedEvent.title }}</div>
        <div><strong>Deskripsi:</strong> {{ selectedEvent.description }}</div>
        <div><strong>Lokasi:</strong> {{ selectedEvent.location }}</div>
        <div><strong>Tanggal Main:</strong> {{ formatDate(selectedEvent.start_date) }}</div>
        <div>
          <strong>Banner:</strong><br />
          <img
            :src="selectedEvent.banner_url"
            alt="Banner"
            class="w-full max-w-md rounded-md mt-2"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import BaseDataTable from '@/components/BaseDataTable.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import dayjs from 'dayjs'
import { useEventStore } from '@/stores/eventStore'
import { formatDate } from '@/utils/format'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const EventStore = useEventStore()
// Dialog control dan form data
const openDialog = ref(false)
const isEditMode = ref(false)
const detailDialogVisible = ref(false)
const selectedEvent = ref(null)
const editedEventId = ref(null)

const newEvent = ref({
  title: '',
  deskripsi: '',
  lokasi: '',
  tanggal_main: '',
  banner: '',
})

const role_id = computed(() => {
  const userRole = authStore.user?.role_id
  return userRole
})
// Event list
const rawE = computed(() => EventStore.state)

const eventList = computed(() =>
  rawE.value.map((e) => ({
    ...e,
    formatted_date: e.start_date ? formatDate(e.start_date) : null,
  })),
)

const eventColumns = [
  { field: 'title', header: 'Judul' },
  { field: 'description', header: 'Deskripsi' },
  { field: 'location', header: 'Lokasi' },
  { field: 'formatted_date', header: 'Tanggal Main' },
  { field: 'banner', header: 'Banner', slot: 'banner' },
]
const reset = () => {
  newEvent.value = {
    title: '',
    deskripsi: '',
    lokasi: '',
    tanggal_main: '',
    banner: '',
  }
}
// Tambah Event
const openAddDialog = () => {
  isEditMode.value = false
  editedEventId.value = null
  reset()
  openDialog.value = true
}

// Simpan atau Edit Event
const saveEvent = async () => {
  const { title, deskripsi, lokasi, tanggal_main, banner } = newEvent.value

  if (title && deskripsi && lokasi && tanggal_main ) {
    try {
      if (isEditMode.value && editedEventId.value !== null) {
        // Mode edit
        try {
          const resz = await EventStore.updateEvent(editedEventId.value, {
            title,
            deskripsi,
            lokasi,
            tanggal_main,
            banner,
          })
          if ((resz.status = 200)) {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        // Tambah event baru
        try {
          const ress = await EventStore.addEvent({
            title,
            deskripsi,
            lokasi,
            tanggal_main,
            banner,
          })
          if (ress.status == 201) {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }

      openDialog.value = false
      resetForm()
    } catch (error) {
      console.error('Gagal menyimpan event:', error)
    }
  } else {
    alert('Semua field wajib diisi!')
  }
}

// Edit event
const handleEdit = (event) => {
  isEditMode.value = true
  editedEventId.value = event.id
  newEvent.value = { 
    title: event.title,
    deskripsi: event.description,
    lokasi: event.location,
    tanggal_main: dayjs(event.start_date).format('YYYY-MM-DD'),
    banner:''
   }
  openDialog.value = true
}

// File upload handler
const handleFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    newEvent.value.banner = file
  } else {
    Swal.fire('Oops!', 'File harus berupa gambar!', 'warning')
  }
}

// Reset form
function resetForm() {
  newEvent.value = {
    title: '',
    deskripsi: '',
    lokasi: '',
    tanggal_main: '',
    banner: '',
  }
  isEditMode.value = false
  editedEventId.value = null
}

// Detail dan Delete
function handleDetail(event) {
  selectedEvent.value = event
  detailDialogVisible.value = true
}

const handleDelete = async (event) => {
  await Swal.fire({
    title: `Hapus event: ${event.title}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await EventStore.deleteEvent(event.id)
      } catch (error) {
        console.error(error)
      } finally {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Event has been deleted.',
          icon: 'success',
        })
      }
    }
  })
}
onMounted(async () => {
  resetForm()
  try {
    if (role_id.value == 1) {
      await EventStore.fetchEvents()
    } else {
      await EventStore.fetchOwnEvents()
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
