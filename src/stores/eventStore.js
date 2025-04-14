import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'
import Swal from 'sweetalert2'

export const useEventStore = defineStore('event', () => {
  const state = ref([])

  const fetchEvents = async () => {
    try {
      const res = await apiService.apiGet('/api/events')
      state.value = res.data.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const fetchOwnEvents = async () => {
    try {
      const res = await apiService.apiGet('/api/events/own')
      state.value = res.data.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const addEvent = async (body) => {
    const formData = new FormData()

    formData.append('title', body.title)
    formData.append('description', body.deskripsi)
    formData.append('location', body.lokasi)
    formData.append('start_date', body.tanggal_main)

    if (body.banner) {
      formData.append('banner', body.banner)
    }
    try {
      await apiService.apiPost('/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
    } finally {
      fetchOwnEvents()
    }
  }
  const updateEvent = async (id, body) => {
    const formData = new FormData();
  
    formData.append('_method', 'PUT'); // <-- triknya di sini!
    formData.append('title', body.title);
    formData.append('description', body.deskripsi);
    formData.append('location', body.lokasi);
    formData.append('start_date', body.tanggal_main);
  
    if (body.banner) {
      formData.append('banner', body.banner);  // file image
    }
  
    try {
      await apiService.apiPost(`/api/events/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error(error);
    } finally {
      fetchOwnEvents();
    }
  };
  
  const deleteEvent = async (id) => {
    try {
      const res = await apiService.apiDelete(`/api/events/${id}`)
      if (res.status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          showConfirmButton: false,
        })
      }
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchEvents()
    }
  }

  return {
    state,
    fetchEvents,
    deleteEvent,
    fetchOwnEvents,
    addEvent,
    updateEvent,
  }
})
