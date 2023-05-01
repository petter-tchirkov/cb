import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  const token = auth.token
  if (!auth.isLogin || !useAuthStore().token || token === '') {
    return auth.logout()
  }
})
