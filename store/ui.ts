import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isSidebarShown = ref(false)

  return { isSidebarShown }
})
