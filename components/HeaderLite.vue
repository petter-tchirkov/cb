<template>
  <header
    class="flex flex-row-reverse items-center justify-between px-4 py-2 border-b lg:px-5 border-b-[#e5e7eb] lg:flex-row">

    <span class="flex items-center gap-2 text-xl font-bold lg:text-2xl">
      <slot name="pageTitle" />
      <div class="flex mt-1 lg:hidden" @click="useUiStore().isSidebarShown = !useUiStore().isSidebarShown">
        <Icon name="game-icons:hamburger-menu" />
      </div>
    </span>
    <div class="flex flex-row-reverse items-center gap-2 lg:gap-5 lg:flex-row">
      <span class="flex items-center gap-1 text-xl font-semibold">
        <Icon name="ic:baseline-euro" class="w-5 h-5" />
        {{ user.ballance }}
      </span>
      <div
        class="relative flex items-center justify-center w-10 h-10 text-xl font-medium text-white bg-indigo-600 rounded-full cursor-pointer"
        :class="{ 'has-notifications': isNotification }" @click="isNotification = !isNotification">
        <span class="text-sm">{{ getNameAcronym }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.js'
import { useUiStore } from '~/store/ui'
import { IUser } from '~/types/user'
const user = useAuthStore().user as IUser

defineEmits<{
  (e: 'showSidebar', value: boolean): void
}>()

const isNotification = ref<boolean>(true)
const getNameAcronym = computed(() => {
  // return user.user_name.split(/\s+/).map((i: string) => i.charAt(0)).join('').toUpperCase()
  return user.user_name.charAt(0).toUpperCase()
})
</script>
<style></style>
