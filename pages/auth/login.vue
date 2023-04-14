<template>
    <div class="relative flex items-center justify-center min-h-screen">
        <form class="p-5 border-2 border-blue-600 rounded-lg w-96">
            <h2 class="mb-8 text-3xl font-bold text-center">Вхід</h2>
            <ui-input
                v-model="login"
                label="Пошта"
                type="text"
                icon="mdi:email" />
            <ui-input
                v-model="password"
                label="Пароль"
                :type="isPasswordRevealed ? 'text' : 'password'"
                icon="mdi:eye">
                <template #icon>
                    <Icon
                        @click="isPasswordRevealed = !isPasswordRevealed"
                        :name="isPasswordRevealed ? 'mdi:eye-off' : 'mdi:eye'"
                        class="w-5 h-5" /> </template
            ></ui-input>
            <ui-button
                label="Увійти"
                full @click.prevent="useAuthStore().getToken(login, password)" />
            <div class="flex items-start pl-4 mb-6">
                <div class="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                </div>
                <label
                    for="remember"
                    class="ml-2 text-sm font-medium"
                    >Запам'ятай мене</label
                >
            </div>
            <p class="text-sm text-center"
                >Ще не маєте аккаунту?
                <NuxtLink
                    class="font-semibold text-blue-600 transition-all hover:underline"
                    to="/auth/register"
                    >Зареєструйте</NuxtLink
                >
                його</p
            >
        </form>
        <ui-toast/>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';
import { IUser } from '~/types/user';
definePageMeta({
    layout: 'auth',
  
})

const isPasswordRevealed = ref<boolean>(false)

const login = ref('')
const password = ref('')
</script>

<style lang="scss" scoped></style>
