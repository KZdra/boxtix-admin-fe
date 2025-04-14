<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Daftar Tiket</h2>

    <!-- Filter Dropdown & Tombol Tambah -->
    <div class="flex flex-col md:flex-row items-start gap-4">
      <Dropdown
        v-model="selectedEvent"
        :options="dropEventList"
        optionLabel="label"
        optionValue="value"
        placeholder="Filter berdasarkan event"
        showClear
        class="w-64"
      />

      <Button
        label="Tambah Tiket"
        icon="pi pi-plus"
        class="p-button-success"
        @click="openAddDialog"
      />
    </div>

    <!-- Tabel Tiket -->
    <BaseDataTable
      :data="filteredTickets"
      :columns="ticketColumns"
      :actions="['edit', 'delete']"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Dialog Tambah/Edit -->
    <Dialog
      v-model:visible="dialogVisible"
      modal
      :header="isEditMode ? 'Edit Tiket' : 'Tambah Tiket'"
      class="w-[90vw] md:w-[25rem]"
    >
      <div class="space-y-4 mt-2">
        <div>
          <label class="block text-sm font-medium mb-1">Nama Event</label>
          <select
            v-model="ticketForm.event_id"
            class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">Pilih Event</option>
            <option :value="ev.value" v-for="ev in dropEventList">{{ ev.label }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Kategori</label>
          <select
            v-model="ticketForm.category_id"
            class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">Pilih Kategori</option>
            <option :value="tk.id" v-for="tk in mTkate">{{ tk.category_name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Stok Tiket</label>
          <input
            type="number"
            v-model="ticketForm.stock"
            class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Harga Tiket</label>
          <input
            type="number"
            v-model="ticketForm.price"
            class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select
            v-model="ticketForm.status"
            class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">Pilih status</option>
            <option value="on_sale">On Sale</option>
            <option value="comingsoon">Coming Soon</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button
          @click="dialogVisible = false"
          class="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
        >
          Batal
        </button>
        <button
          @click="submitTicket"
          class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Simpan
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BaseDataTable from '@/components/BaseDataTable.vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useTicketStore } from '@/stores/ticketStore'
import { useEventStore } from '@/stores/eventStore'
import { useTicketCategoryStore } from '@/stores/ticketCategoryStore'
import Swal from 'sweetalert2'
import { formatRupiah } from '@/utils/format'

const ticketStore = useTicketStore()
const EventStore = useEventStore()
const ticketCategoryStore = useTicketCategoryStore()

const tickets = computed(() => ticketStore.state)
const mTkate = computed(() => ticketCategoryStore.state)
// Kolom
const ticketColumns = [
  { field: 'event_name', header: 'Nama Event' },
  { field: 'ticket_name', header: 'Nama Tiket' },
  { field: 'stock', header: 'Stock' },
  { field: 'formatted_price', header: 'Harga' },
  { field: 'status', header: 'Status' },
]

// Filter by event
const selectedEvent = ref(null)
const masterEventList = computed(() => EventStore.state)
const dropEventList = computed(() =>
  masterEventList.value.map((event) => ({
    label: event.title,
    value: event.id,
  })),
)
const eventList = computed(() =>
  rawE.value.map((e) => ({
    ...e,
    formatted_date: e.start_date ? formatDate(e.start_date) : null,
  })),
)
const filteredTickets = computed(() => {
  if (!selectedEvent.value) return tickets.value
  return tickets.value
    .map((ticket) => ({
      ...ticket,
      formatted_price: formatRupiah(ticket.price),
    }))
    .filter((ticket) => ticket.event_id === selectedEvent.value)
})

watch(selectedEvent, async (newEventId) => {
  if (newEventId) {
    await ticketStore.fetchTicketByEventId(newEventId)
  }
})

// Dialog state
const dialogVisible = ref(false)
const detailDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const isEditMode = ref(false)
const selectedTicket = ref(null)

const ticketForm = ref({
  id: null,
  event_id: '',
  category_id: '',
  status: '',
  price: '',
  status: '',
  stock: '',
})
watch(
  () => ticketForm.value.event_id,
  async (newEventId) => {
    if (newEventId) {
      // Simulasi fetch data, bisa ganti axios/fetch API juga
      await ticketCategoryStore.fetchTicketCategories({ event_id: newEventId })
    }
  },
)
// Tambah/Edit
const openAddDialog = async () => {
  try {
    isEditMode.value = false
    ticketForm.value = {
      id: null,
      event_id: '',
      category_id: '',
      status: '',
      price: '',
      status: '',
      stock: '',
    }
    dialogVisible.value = true
  } catch (error) {
    console.log(error)
  }
}

const handleEdit = async (ticket) => {
  try {
    isEditMode.value = true
    ticketForm.value = { ...ticket }
    await ticketCategoryStore.fetchTicketCategories({ event_id: selectedEvent.value })
    dialogVisible.value = true
  } catch (err) {
    console.log(err)
  }
}

const submitTicket = async () => {
  const form = ticketForm.value

  if (!form.event_id || !form.category_id || !form.price || !form.status || !form.stock) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Semua field wajib diisi.',
    })
    return
  }

  const body = {
    event_id: form.event_id,
    category_id: form.category_id,
    stock: form.stock,
    price: form.price,
    status: form.status,
  }

  if (isEditMode.value) {
    try {
      await ticketStore.updateTicket(form.id, body) // misal untuk update data
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Tiket berhasil diperbarui.',
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat memperbarui tiket.',
      })
    }
  } else {
    try {
      await ticketStore.addTicket(body) // misal untuk tambah data baru
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Tiket berhasil ditambahkan.',
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menambahkan tiket.',
      })
    }
  }

  dialogVisible.value = false
}

// Delete
const handleDelete = async (ticket) => {
  console.log(ticket)
  await Swal.fire({
    title: `Hapus Tiket: ${ticket.ticket_name}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await ticketStore.deleteTicket(ticket.id)
      } catch (error) {
        console.error(error)
      } finally {
        await ticketStore.fetchTicketByEventId(selectedEvent.value)
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
    await EventStore.fetchOwnEvents()
  } catch (error) {
    console.error(error)
  }
})
</script>
