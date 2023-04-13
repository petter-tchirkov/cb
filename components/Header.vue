<template>
    <header
        class="flex items-center justify-between px-5 py-2 border-b border-b-gray-100">
        <span class="text-2xl font-bold"><slot name="pageTitle" /></span>

        <div class="flex items-center gap-5">
            <span class="flex items-center gap-1 text-xl font-semibold">
                <Icon
                    name="bxs:dollar-circle"
                    class="w-5 h-5 text-green-500" />
                {{user.ballance}}</span
            >
            <div
                class="relative flex items-center justify-center w-10 h-10 text-xl font-medium text-white bg-blue-500 rounded-full cursor-pointer"
                :class="{ 'has-notifications': isNotification }"
                @click="isNotification = !isNotification">
                <span class="text-sm">{{ user.user_id }}</span>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.js'
import { IUser } from '~/types/user';
const user = useAuthStore().user as IUser


const isNotification = ref<boolean>(true)

const getUserAcronym = computed(() => {
    let userName: string = 'User Userov'
    let words = userName.split(' ')
    let acronym: string = words
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    return acronym
})
</script>

<style lang="scss" scoped>
.has-notifications {
    @apply after:animate-pulse after:absolute after:w-3 after:h-3 after:bg-red-500 after:rounded-full after:top-0 after:right-0;
}
</style>
