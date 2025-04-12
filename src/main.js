import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import './assets/main.css'
import router from './router'
import { createPinia } from 'pinia'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.mount('#app')
