import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref({
    customers: 0,
    events: 0,
    organizers: 0,
  })

  const fetchStats = async () => {
    try {
      const res = await apiService.apiGet('/api/dasdata')
      stats.value.customers = res.data.data.customers_count ?? 0
      stats.value.events = res.data.data.events_count ?? 0
      stats.value.organizers = res.data.data.organizer_count ?? 0
    } catch (error) {
      errorHandling(error)
    }
  }

  return {
    stats,
    fetchStats,
  }
})
