import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from './auth'
import { IRate } from '~/types/rate'
import { IRatesBot } from '~/types/ratesBot'

export const useAdminStore = defineStore('admin', () => {
  const rates: Ref<IRate[]> = ref([])
  const bots: Ref<IRatesBot[]> = ref([])
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
        if (response._data.error) {
          notify({
            text: response._data.errors[0].error,
            type: 'success',
          })
        }
      },
    })
  }

  const getRates = async () => {
    await useFetch(`${url}/Admin/get-rates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        if (response._data) {
          rates.value = response._data
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
            text: response._data.errors[0].error,
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
            text: response._data.errors[0].error,
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

  const deleteRate = async (rate: IRate) => {
    await useFetch(`${url}/Admin/delete-rate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: rate,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            title: 'Видалення',
            text: response._data.errors[0].error,
            type: 'error',
          })
        }
        notify({
          title: 'Видалення',
          text: `Рейт ${rate.botURI} успішно видалено`,
          type: 'success',
        })
        refreshNuxtData()
      },
    })
  }

  const fetchBots = async (path: string, formData: FormData) => {
    await useFetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else {
          bots.value = response._data
          notify({
            text: 'Успішно завантажено',
            type: 'success',
          })
        }
      },
    })
  }

  const importFile = async (path: string, formData: FormData) => {
    await useFetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else {
          notify({
            text: 'Успішно завантажено',
            type: 'success',
          })
        }
      },
    })
  }

  const getBots = async () => {
    await useFetch(`${url}/Admin/get-verif-bots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        if (response._data) {
          bots.value = response._data
        }
      },
    })
  }

  const updateBots = async (updatedBots: IRatesBot[]) => {
    await useFetch(`${url}/Admin/update-verif-bots`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: updatedBots,
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else {
          notify({
            text: 'Завантажено',
            type: 'success',
          })
        }
      },
    })
  }

  return {
    fetchRates,
    rates,
    addRate,
    updateRate,
    getBots,
    bots,
    updateBots,
    fetchBots,
    getRates,
    importFile,
    deleteRate,
  }
})
