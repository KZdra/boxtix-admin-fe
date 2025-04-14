import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'

export const useTicketStore = defineStore('ticket', () => {
  const state = ref([])

  const fetchTicketByEventId = async (id) => {
    try {
      const res = await apiService.apiGet('/api/tickets', {
        event_id: id,
      })
      state.value = res.data.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const addTicket = async (body) => {
    try {
      await apiService.apiPost('/api/tickets', body)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchTicketByEventId(body.event_id)
    }
  }
  const updateTicket = async (id, body) => {
    try {
      await apiService.apiPut(`/api/tickets/${id}`, body)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchTicketByEventId(body.event_id)
    }
  }
  const deleteTicket = async (id) => {
    try {
      await apiService.apiDelete(`/api/tickets/${id}`)
    } catch (error) {
      errorHandling(error)
    }
  }
  return {
    state,
    fetchTicketByEventId,
    addTicket,
    updateTicket,
    deleteTicket,
  }
})
