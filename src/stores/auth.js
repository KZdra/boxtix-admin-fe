import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    id: 1,
    name: 'indra',
    role_id: 1,
    email: 'admin@x.com',
    email_verified_at: null,
    picture_profile: 'profile_pictures/paham.jpg',
    picture_profile_name: 'paham.jpg',
    created_at: '2025-04-09T13:59:39.000000Z',
    updated_at: null,
    picture_profile_url: 'http://127.0.0.1:8000/storage/picture_profiles/paham.jpg',
    role: 'admin',
  })

  return { user }
})
