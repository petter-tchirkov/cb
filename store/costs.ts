import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useCostsStore = defineStore('costs', () => {
    const costs: Ref<Record<string,any>[]> = ref([])
    
    const getCosts = async (id: number,page: number, bot_name?: string, country?: string, from?: string, to?: string ) => {
        const {data, error} = useFetch('http://10.0.98.105/Users/costs', {
            headers: {
                'Authorization': `Bearer ${useAuthStore().token}`
            },
            params: {
                id: id,
                page: page,
                bot_name: bot_name,
                country: country,
                from: from,
                to: to,
            },
            onResponse({ request, response, options }) {
                costs.value = response._data
                console.log(123);
              },
        })
        
    }
        
    return {  getCosts, costs }
})
