import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from './auth'
import { IRate } from '~/types/rate'

export const useAdminStore = defineStore('admin', () => {
  const rates: Ref<IRate[]> = ref([])
  const url = useRuntimeConfig().public.baseURL
  const { notify } = useNotification()
  const token = useAuthStore().token

  const fetchRates = async (path: string, formData: FormData) => {
    await useFetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      onResponse({ response }) {
        if (response._data) {
          rates.value = response._data
        }

        notify({
          text: 'Успішно завантажено',
          type: 'success',
        })
      },
    })
  }
  return { fetchRates, rates }
})
