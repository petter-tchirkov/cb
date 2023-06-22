import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const token = useAuthStore().token
  if (!useAuthStore().isLogin || !useAuthStore().token || token === '') {
    return useAuthStore().logout()
  }
})
