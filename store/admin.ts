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
          notify({
            text: 'Успішно завантажено',
            type: 'success',
          })
        }
      },
    })
  }

  const addRate = async (newRate: IRate) => {
    await useFetch(`${url}/Admin/add-rate`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: newRate,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: 'hello',
            type: 'error',
          })
        }
      },
    })
  }

  const updateRate = async (updatedRate: IRate[]) => {
    await useFetch(`${url}/Admin/update-rates`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: updatedRate,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: 'Error',
            type: 'error',
          })
        }
        notify({
          text: 'Updated',
          type: 'success',
        })
      },
    })
  }

  return { fetchRates, rates, addRate, updateRate }
})
