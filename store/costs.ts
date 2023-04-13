import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { ICosts } from '~/types/costs'

export const useCostsStore = defineStore('costs', () => {
    const costs: Ref<Record<string, any> | undefined> = ref()
    const pages = ref(1)
    
    const getCosts = async (filterParams: ICosts ) => {
        const {refresh} = await useFetch(() => 'http://10.0.98.105/Users/costs', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            },
            params: {
                id: filterParams.id,
                page: filterParams.page,
                per_page: filterParams.per_page,
                bot_name: filterParams.bot_name,
                country: filterParams.country?.toLowerCase(),
                date_from: filterParams.date_from,
                date_to: filterParams.date_to,
            },
            onResponse({ response }) {
                pages.value = response._data.count_recorded
                costs.value = response._data.data
            },
        })
    }
        
    return { getCosts, costs, pages } 
})
