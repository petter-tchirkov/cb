import { useAuthStore } from '~/store/auth'
import { useUiStore } from '~/store/ui'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.user || !Object.keys(auth.user).length) {
    await auth.currentUser()
  }

  useUiStore().isSidebarShown = false
})
