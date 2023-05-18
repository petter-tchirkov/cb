import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from './auth'
import { IClientDeposit } from '~/types/client-deposit'

export const useDepositsStore = defineStore('deposits', () => {
  const url = useRuntimeConfig().public.baseURL
  const token = useAuthStore().token
  const clientsDeposits: Ref<IClientDeposit[]> = ref([])
  const isLoading = ref(false)
  const { notify } = useNotification()
  const updatedDeposits: Ref<IClientDeposit[]> = ref([])

  const getClientsDeposits = async () => {
    await useFetch(`${url}/Admin/get-clients-deposits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        clientsDeposits.value = response._data
      },
    })
  }

  const updateDeposits = async (updatedDeposit: IClientDeposit[]) => {
    await useFetch(`${url}/Admin/update-clients-deposits`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: updatedDeposit,
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

  return {
    getClientsDeposits,
    clientsDeposits,
    updateDeposits,
    updatedDeposits,
  }
})
