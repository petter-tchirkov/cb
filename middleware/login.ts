import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  const token = useCookie('access_token', { default: () => '' })
  if (!auth.isLogin || !token) {
    return auth.logout()
  }
})
