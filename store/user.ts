import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        firstName: 'Юзер',
        lastName: 'Тестовченко',
        balance: 42000,
    }) as Record<string, any>

    return { user }
})
