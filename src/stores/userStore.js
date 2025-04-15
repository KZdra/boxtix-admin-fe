import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiService } from '@/utils/apiServices'
import { errorHandling } from '@/utils/errorHandling'

export const useUserStore = defineStore('user', () => {
  const state = ref([])
  const roles = ref([])

  const fetchUsers = async () => {
    try {
      const res = await apiService.apiGet('/api/users')
      state.value = res.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const fetchRoles = async () => {
    try {
      const res = await apiService.apiGet('/api/users/roles')
      roles.value = res.data.data
    } catch (error) {
      errorHandling(error)
    }
  }
  const addUser = async (body) => {
    const formData = new FormData()

    formData.append('name', body.name)
    formData.append('email', body.email)
    formData.append('role_id', body.role_id)
    if (body.password) {
      formData.append('password', body.password)
      formData.append('password_confirmation', body.password_confirmation)
    }

    if (body.picture_profile) {
      formData.append('picture_profile', body.picture_profile) // file image
    }

    try {
      await apiService.apiPost(`/api/users`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchUsers()
    }
  }
  const deleteUser = async (id) => {
    try {
      const res = await apiService.apiDelete(`/api/users/${id}`)
    } catch (error) {
      errorHandling(error)
    } finally {
      fetchUsers()
    }
  }
  const updateUser = async (id, body) => {
    const formData = new FormData()

    formData.append('_method', 'PUT') // <-- triknya di sini!
    formData.append('name', body.name)
    formData.append('email', body.email)
    formData.append('role_id', body.role_id)
    if (body.password) {
      formData.append('password', body.password)
      formData.append('password_confirmation', body.password_confirmation)
    }

    if (body.picture_profile) {
      formData.append('picture_profile', body.picture_profile) // file image
    }

    try {
      await apiService.apiPost(`/api/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.error(error)
    } finally {
      fetchUsers()
    }
  }
  return {
    state,
    roles,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  }
})
