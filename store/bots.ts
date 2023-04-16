import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from '~/store/auth'
import { IBot } from '~/types/bot'

export const useBotsStore = defineStore('bots', () => {
  const url = useRuntimeConfig().public.baseURL
  const token = useAuthStore().token
  const bots: Ref<IBot[]> = ref([])
  const bot: Ref<IBot> = ref({} as IBot)
  const { notify } = useNotification()

  const fetchBots = async () => {
    await useFetch(`${url}/Users/bots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        bots.value = response._data
      },
    })
  }

  const fetchBot = async (id: string) => {
    await useFetch(`${url}/Users/bot/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        bot.value = response._data as IBot
      },
    })
  }

  const updateBot = async (botParams: IBot) => {
    await useFetch(`${url}/Users/bot/${botParams.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {
        botName: botParams.botName,
        botURI: botParams.botURI,
        token: botParams.token,
        isActive: botParams.isActive,
      },
      onResponse() {
        notify({
          title: 'Редагування',
          text: 'Бота успішно відредаговано',
          type: 'success',
        })
      },
    })
  }

  return { fetchBots, bots, bot, fetchBot, updateBot }
})
