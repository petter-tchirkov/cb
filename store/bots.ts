import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useAuthStore } from '~/store/auth'
import { IBot } from '~/types/bot'

export const useBotsStore = defineStore('bots', () => {
  const url = useRuntimeConfig().public.baseURL
  const token = useAuthStore().token
  const bots: Ref<IBot[]> = ref([])
  const bot: Ref<IBot> = ref({} as IBot)
  const router = useRouter()
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

  const addBot = async (newBot: IBot) => {
    await useFetch(`${url}/Users/add-bot`, {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: {
        botName: newBot.botName,
        botURI: newBot.botURI,
        token: newBot.token,
      },
      onResponse({ response }) {
        if (response._data.errors) {
          notify({
            text: response?._data.errors[0].error,
            type: 'error',
          })
        } else {
          notify({
            text: `Бота ${response._data.botName} успішно створено`,
            type: 'success',
          })
          setTimeout(() => {
            router.push(`/bots/${response._data.id}`)
            fetchBots()
          }, 1000)
        }
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
        fetchBots()
      },
    })
  }

  const removeBot = async (botParams: IBot) => {
    await useFetch(`${url}/Users/bot/${botParams.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse() {
        notify({
          title: 'Видалення',
          text: `Бота ${botParams.botName} успішно видалено`,
          type: 'success',
        })
        router.push('/')
        fetchBots()
      },
    })
  }

  return { fetchBots, bots, bot, fetchBot, addBot, updateBot, removeBot }
})
