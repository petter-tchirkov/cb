import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.user || !Object.keys(auth.user).length) {
    await auth.currentUser()
  }
})
