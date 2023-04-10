import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((from,to) => {
  const auth = useAuthStore()

  if(auth.isLogin) {
    navigateTo(to.fullPath)
  } 
  navigateTo('/auth/login')
})