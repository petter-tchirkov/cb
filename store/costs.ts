import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useDateStore } from './date'
import { ICostsItem } from '~/types/costsItem'
import { ICosts } from '~/types/costs'

export const useCostsStore = defineStore('costs', () => {
  const url = useRuntimeConfig().public.baseURL
  const costs: Ref<ICostsItem[]> = ref([])
  const countRecorded = ref(1)
  const totalCharged = ref(1)
  const pages = computed(() => {
    return Math.ceil(countRecorded.value / 10)
  })

  const getCosts = async (filterParams: ICosts) => {
    await useFetch(`${url}/Users/costs`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      params: {
        id: filterParams.id,
        page: filterParams.page,
        per_page: filterParams.per_page,
        bot_name: filterParams.bot_name,
        country: filterParams.country,
        date: useDateStore().chosenDatesSerialized,
        show_all: filterParams.show_all,
      },
      onResponse({ response }) {
        countRecorded.value = response._data.count_recorded
        totalCharged.value = response._data.total_charged
        costs.value = response._data.data
      },
    })
  }

  return { getCosts, costs, pages, totalCharged, countRecorded }
})
