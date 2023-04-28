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
  const isLoading = ref(false)
  const updatedRates: Ref<IRate[]> = ref([])

  const fetchRates = async (path: string, formData: FormData) => {
    await useFetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      onRequest() {
        isLoading.value = true
      },
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else {
          rates.value = response._data
          notify({
            text: 'Успішно завантажено',
            type: 'success',
          })
        }
        isLoading.value = false
      },
    })
  }

  const getRates = async () => {
    await useFetch(`${url}/Admin/get-rates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else {
          rates.value = response._data
          isLoading.value = false
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

      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },
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
        console.log(response)
      },
    })
    isLoading.value = false
  }

  const updateRate = async (updatedRate: IRate[]) => {
    await useFetch(`${url}/Admin/update-rates`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: updatedRate,
      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response._data.errors[0].error,
            type: 'error',
          })
        }
        notify({
          text: 'Успішно оновлено',
          type: 'success',
        })
        isLoading.value = false
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
      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },

      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            title: 'Видалення',
            text: response._data.errors[0].error,
            type: 'error',
          })
        } else if (response.status === 500) {
          notify({
            title: 'Видалення',
            text: 'Internal Server Error',
            type: 'error',
          })
        } else {
          notify({
            title: 'Видалення',
            text: `Рейт ${rate.botURI} успішно видалено`,
            type: 'success',
          })
          getRates()
          isLoading.value = false
        }
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
      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },
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
          isLoading.value = false
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
      onRequest() {
        isLoading.value = true
      },
      onRequestError() {
        isLoading.value = false
        notify({
          text: 'Internal Server Error',
          type: 'error',
        })
      },
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
          isLoading.value = false
        }
      },
    })
  }

  const getBots = async () => {
    await useFetch(`${url}/Admin/get-verif-bots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onRequest() {
        isLoading.value = true
      },
      onResponse({ response }) {
        if (response._data) {
          bots.value = response._data
          isLoading.value = false
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
      onRequest() {
        isLoading.value = true
      },
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
          isLoading.value = false
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
    isLoading,
    updatedRates,
  }
})
