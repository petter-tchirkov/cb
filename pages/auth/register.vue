<template>
    <section class="flex items-center justify-center w-full min-h-screen">
        <form class="p-5 border-2 border-blue-600 rounded-lg w-96">
            <h2 class="mb-8 text-3xl font-bold text-center">Реєстрація</h2>
            <ui-input
                v-model="login"
                label="Пошта"
                type="text" />
            <ui-input
                v-model="password"
                label="Пароль"
                :type="isPasswordRevealed ? 'text' : 'password'">
                <template #icon>
                    <Icon
                        @click="isPasswordRevealed = !isPasswordRevealed"
                        :name="isPasswordRevealed ? 'mdi:eye-off' : 'mdi:eye'"
                        class="w-5 h-5" />
                </template>
            </ui-input>
            <ui-button
            @click.prevent="useAuthStore().register(login, password)"
                label="Зареєструватись"
                full />
            <p class="text-sm text-center"
                >Вже маєте аккаунт?
                <NuxtLink
                    class="text-sm text-blue-900 transition-all hover:text-blue-500"
                    to="/auth/register"
                    >Увійдіть</NuxtLink
                >
                до його</p
            >
        </form>
    </section>
</template>

<script lang="ts" setup>
import { IUser } from '~/types/user';
import { useAuthStore } from '~/store/auth';

definePageMeta({ layout: 'auth', })

const isPasswordRevealed = ref<boolean>(false)

const login = ref('')
const password = ref('')
</script>

<style lang="scss" scoped></style>
