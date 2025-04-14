import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import './assets/main.css'
import router from './router'
import { createPinia, getActivePinia } from 'pinia'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "dayjs/locale/id";

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import { useAuthStore } from './stores/authStore'

library.add(fas)

const app = createApp(App)

// Register FontAwesome globally
app.component('font-awesome-icon', FontAwesomeIcon)
const pinia = createPinia()
// Use Pinia store and Router
app.use(pinia)
app.use(router)

// Use PrimeVue and its components
app.use(PrimeVue)
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const pinia = getActivePinia()
    if (pinia) {
      const authStore = useAuthStore(pinia)
      const token = authStore.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use((response) => {
  return response
})
app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)

app.mount('#app')
