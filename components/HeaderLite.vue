<template>
  <header class="flex items-center justify-between px-5 py-2 border-b border-b-gray-200">
    <span class="text-2xl font-bold">
      <slot name="pageTitle" />
    </span>
    <div class="flex items-center gap-5">
      <span class="flex items-center gap-1 text-xl font-semibold">
        <Icon name="ic:baseline-euro" class="w-5 h-5" />
        {{ user.ballance }}
      </span>
      <div
class="relative flex items-center justify-center w-10 h-10 text-xl font-medium text-white bg-blue-500 rounded-full cursor-pointer" :class="{ 'has-notifications': isNotification }" @click="isNotification = !isNotification">
        <span class="text-sm">{{ getNameAcronym }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.js'
import { IUser } from '~/types/user'
const user = useAuthStore().user as IUser

const isNotification = ref<boolean      >(true)
const getNameAcronym = computed(()=> {
  return user.user_name.split(/\s+/).map((i: string) => i.charAt(0)).join('').toUpperCase()
})
</script>
<style></style>
