import { Title } from './../.nuxt/components.d';
import { defineStore } from 'pinia'
import { IUser } from '~/types/user'


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const token = useCookie('access_token', { default: () => '' })
    const user = ref<IUser | null>(null)

    const isLogin = computed<boolean>(() => !!token.value)

    const getToken = async (login: string, password: string) => {
        const response = await useFetch(
            'http://10.0.98.105/Users/get-token',
            {
                body: {
                    login: login,
                    password: password,
                },
                method: 'POST',
            }
        ).then((response) => {
            const resData: Record<string,any> = response.data
            const resError: Record<string,any> = response.error

            if (response.error.value) {
                alert(resError._rawValue);
                return
              }
            if(resData._rawValue) {
                token.value = resData._rawValue
                console.log(123);
                
                router.push('/')
            }
        })
    }

    const test = async () => {
        const response = await useFetch('http://10.0.98.105/Users/test', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
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
            alert(resError._rawValue)
            return
        }
        router.push('/auth/login')
    }

    // const currentUser = async () => {
    //     if (!token.value) {
    //         await logout()
    //         return
    //       }
    // }

    const logout = async () => {
        token.value = ''
        router.push('/auth/login')
    }

    return { token, getToken, test, isLogin, logout, register }
})

