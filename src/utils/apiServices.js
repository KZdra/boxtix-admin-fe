import axios from 'axios'
import { errorHandling } from '@/utils/errorHandling'

const API = import.meta.env.VITE_APIURL

const apiService = {
  apiGet: async (uri, params = {}) => {
    try {
      let res = await axios.get(API + uri, { params: params })

      return res
    } catch (error) {
      errorHandling(error)
    }
  },
  apiPost: async (uri, body, options = {}) => {
    try {
      let res = await axios.post(API + uri, body, options)

      return res
    } catch (error) {
      errorHandling(error)
    }
  },
  apiPut: async (uri, body) => {
    try {
      let res = await axios.put(API + uri, body)

      return res
    } catch (error) {
      errorHandling(error)
    }
  },
  apiDelete: async (uri, data) => {
    try {
      let res = await axios.delete(API + uri, { data })

      return res
    } catch (error) {
      errorHandling(error)
    }
  },
}

export { apiService }
