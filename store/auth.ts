import { defineStore } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { IUser } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const url = useRuntimeConfig().public.baseURL
  const router = useRouter()
  const token = useCookie('access_token', { default: () => '' })
  const user = ref<IUser | null>(null)
  const { notify } = useNotification()

  const isLogin = computed<boolean>(() => !!token.value)

  const login = async (fields: { login: string; password: string }) => {
    await useFetch(`${url}/Users/get-token`, {
      body: {
        login: fields.login,
        password: fields.password,
      },
      method: 'POST',
      onResponse({ response }) {
        switch (response._data.status) {
          case 401:
            notify({
              title: 'Неавторизовано',
              text: 'Невірний логін або пароль',
              type: 'error',
            })
            break
          default:
            token.value = response._data
            currentUser()
            router.push('/')
        }
      },
    })
  }

  const currentUser = async () => {
    await useFetch(`${url}/Users/user`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      onResponseError() {
        logout()
      },
      onResponse({ response }) {
        user.value = response._data
      },
    })
  }

  const register = async (
    login: string,
    password: string,
    name: string,
    accord: string
  ) => {
    await useFetch(`${url}/Users/signup`, {
      body: {
        login,
        password,
        name,
        accord,
      },
      method: 'POST',
      onResponse({ response }) {
        if (response._data.errors) {
          response._data.errors.forEach((error: Record<string, string>) => {
            notify({
              title: 'Реєстрація',
              text: error.error,
              type: 'error',
            })
          })
        } else {
          notify({
            title: 'Реєстрація',
            text: 'Реєстрація успішна',
            type: 'success',
          })
          setTimeout(() => {
            router.push('/auth/login')
          }, 2000)
        }
      },
    })
  }

  const logout = async () => {
    token.value = ''
    await router.push('/auth/login')
  }

  return { token, login, isLogin, logout, register, user, currentUser }
})
