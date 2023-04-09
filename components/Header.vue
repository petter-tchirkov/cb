<template>
    <header
        class="border-b border-b-gray-100 px-5 py-2 flex justify-between items-center">
        <span class="text-2xl font-bold"><slot name="pageTitle" /></span>

        <div class="flex items-center gap-5">
            <span class="flex items-center gap-1 text-xl font-semibold">
                <Icon
                    name="bxs:dollar-circle"
                    class="w-5 h-5 text-green-500" />
                {{ user.balance }}</span
            >
            <div
                class="bg-blue-500 text-white font-medium cursor-pointer w-10 h-10 text-xl rounded-full relative flex justify-center items-center"
                :class="{ 'has-notifications': isNotification }"
                @click="isNotification = !isNotification">
                <span class="text-sm">{{ getUserAcronym }}</span>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/user'
const user = useUserStore().user

const isNotification = ref<boolean>(true)

const getUserAcronym = computed(() => {
    let userName: string = `${user.firstName} ${user.lastName}`
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
