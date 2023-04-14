import { defineStore } from 'pinia'
import { IUser } from '~/types/user'
import { useNotification } from '@kyvg/vue3-notification'


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const token = useCookie('access_token', { default: () => '' })
    const user = ref<IUser | null>(null)
    const { notify } = useNotification()

    const isLogin = computed<boolean>(() => !!token.value)

    const getToken = async (login: string, password: string) => {
        const {data, error} = await useFetch(
            'http://10.0.98.105/Users/get-token',
            {
                body: {
                    login: login,
                    password: password,
                },
                method: 'POST',
            }
        )
        const resData = data?.value as string
        const resError = error?.value as Record<string,any>
            if (resError) {                
                notify({
                    title: 'Authorization',
                    text: resError.data.title,
                    type: 'error'
                  })
              }
            if(resData) {
                token.value = resData
                currentUser()
                router.push('/')
            }
    }

    const currentUser = async () => {
        const {data, error } = await useFetch('http://10.0.98.105/Users/user', {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        const resData = data?.value as IUser
        const resError = error?.value as Record<string,any>
        
        if(resData) {            
            user.value = resData
        }
    }

    const register = async (login: string, password: string) => {
        const {data, error} = await useFetch('http://10.0.98.105/Users/signup', {
            body: {
                login: login,
                password: password
            }, 
            method: 'POST'
        })

        const resError = error?.value as Record<string,any>
        if(error?.value) {
            resError.data.errors.forEach((error: any) => {
                notify({
                    title: 'Authorization',
                    text: error.error,
                    type: 'error'
                  })
            });
            return
        }
        notify({
            title: 'Authorization',
            text: 'Successfully registered',
            type: 'success'
          })
        router.push('/auth/login')
    }

    const logout = async () => {
        token.value = ''
        router.push('/auth/login')
    }

    return { token, getToken, isLogin, logout, register, user, currentUser }
})

