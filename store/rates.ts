import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useRatesStore = defineStore('rates', () => {
  const rates = ref([])
  const url = useRuntimeConfig().public.baseURL
  interface IDefaultRates {
    baseRate: number
    countriesRates: { country: string; rate: number }[]
  }
  const countriesRates: Ref<IDefaultRates> = ref({})
  const baseRate: Ref<number> = ref(0)

  const getUserRates = async () => {
    await useFetch(`${url}/Users/rates`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      onResponse({ response }) {
        rates.value = response._data
      },
    })
  }
  const getBaseRates = async () => {
    await useFetch(`${url}/Home/get-rates`, {
      onResponse({ response }) {
        countriesRates.value = response._data.countriesRates
        baseRate.value = response._data.baseRate
      },
    })
  }
  return { rates, getUserRates, getBaseRates, countriesRates, baseRate }
})
