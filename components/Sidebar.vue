<template>
    <Transition>
        <aside
            class="sticky top-0 flex flex-col justify-between h-screen px-3 py-4 transition-all duration-75 left-2 bg-gray-50">
            <div class="flex flex-col">
                <NuxtLink
                    to="/"
                    class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100">
                    <Icon
                        name="bxs:dashboard"
                        class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span
                        class="transition-all duration-75"
                        v-show="isSidebarShown"
                        >Дашборд</span
                    >
                </NuxtLink>
                <NuxtLink
                    to="/costs"
                    class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100">
                    <Icon
                        name="bxs:coin-stack"
                        class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span
                        class="transition-all duration-75"
                        v-show="isSidebarShown"
                        >Витрати</span
                    >
                </NuxtLink>
                <NuxtLink
                    to="/bots"
                    class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100">
                    <Icon
                        name="basil:viber-solid"
                        class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span
                        class="transition-all duration-75"
                        v-show="isSidebarShown"
                        >Боти Viber</span
                    >
                </NuxtLink>
                <NuxtLink
                    to="/settings"
                    class="flex items-center gap-2 p-2 font-semibold rounded-lg group hover:bg-gray-100">
                    <Icon
                        name="bxs:cog"
                        class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span
                        class="transition-all duration-75"
                        v-show="isSidebarShown"
                        >Налаштування</span
                    >
                </NuxtLink>
            </div>
            <div class="flex justify-end">
                <Icon
                    class="w-8 h-8 text-gray-500 transition duration-75 cursor-pointer hover:text-gray-900"
                    :class="{ 'rotate-180': !isSidebarShown }"
                    name="ic:baseline-keyboard-double-arrow-left"
                    @click="isSidebarShown = !isSidebarShown" />
            </div>
            <NuxtLink
            @click="useAuthStore().logout()"
                class="flex items-center gap-2 p-2 font-semibold rounded-lg cursor-pointer group hover:bg-gray-100">
                <Icon
                    name="bxs:log-out"
                    class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span v-if="isSidebarShown">Вийти</span>
            </NuxtLink>
        </aside>
    </Transition>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';
const isSidebarShown = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.router-link-exact-active {
    @apply bg-gray-100;
}
</style>
