import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (!auth.isLogin) {
    return navigateTo('/auth/login')
  }
})
