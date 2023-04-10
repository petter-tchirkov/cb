import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  if(!auth.isLogin) {
    return navigateTo('/auth/login')
  }
})