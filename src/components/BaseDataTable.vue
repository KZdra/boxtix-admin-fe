<template>
  <div class="space-y-4">
    <div v-if="searchable" class="flex justify-end">
      <input
        v-model="globalFilter"
        type="text"
        placeholder="Cari..."
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>

    <DataTable
      class="w-full border border-collapse border-gray-300"
      :value="data"
      stripedRows
      responsiveLayout="scroll"
      :paginator="true"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      :globalFilterFields="columns.map((col) => col.field)"
      :filters="filters"
      filterDisplay="row"
    >
      <!-- Loop Kolom -->
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      >
        <template v-if="col.slot" #body="slotProps">
          <slot :name="col.slot" :data="slotProps.data" />
        </template>
      </Column>

      <!-- Kolom Aksi -->
      <Column v-if="actions.length" header="Aksi">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              v-if="actions.includes('detail')"
              icon="pi pi-search"
              class="p-button-sm p-button-info"
              @click="$emit('detail', slotProps.data)"
            />
            <Button
              v-if="actions.includes('edit')"
              icon="pi pi-pencil"
              class="p-button-sm p-button-warning"
              @click="$emit('edit', slotProps.data)"
            />
            <Button
              v-if="actions.includes('delete')"
              icon="pi pi-trash"
              class="p-button-sm p-button-danger"
              @click="$emit('delete', slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

const props = defineProps({
  data: Array,
  columns: Array,
  actions: {
    type: Array,
    default: () => [],
  },
  searchable: {
    type: Boolean,
    default: true,
  },
})

const filters = ref({
  global: { value: null, matchMode: 'contains' },
})

const globalFilter = ref('')

// update global filter secara reaktif
watch(globalFilter, (val) => {
  filters.value.global.value = val
})
</script>
