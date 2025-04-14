import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'

export const useTicketCategoryStore = defineStore('ticketCategory', () => {
  const state = ref([])

  const fetchTicketCategories = async (param) => {
    try {
      const res = await apiService.apiGet('/api/ticket-categories',param)
      state.value = res.data.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const addTicketCategory = async (body) => {
    try {
      await apiService.apiPost('/api/ticket-categories', body)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchTicketCategories()
    }
  }
  const updateTicketCategory = async (id, body) => {
    try {
      await apiService.apiPut(`/api/ticket-categories/${id}`, body)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchTicketCategories()
    }
  }
  const deleteTicketCategory = async (id) => {
    try {
      await apiService.apiDelete(`/api/ticket-categories/${id}`)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchTicketCategories()
    }
  }
  return {
    state,
    fetchTicketCategories,
    addTicketCategory,
    updateTicketCategory,
    deleteTicketCategory,
  }
})
