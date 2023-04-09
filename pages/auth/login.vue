<template>
    <div class="min-h-screen flex justify-center items-center">
        <form class="w-96 border-2 border-blue-600 p-5 rounded-lg">
            <h2 class="text-center text-3xl mb-8 font-bold">Вхід</h2>
            <ui-input
                v-model="credentials.email"
                label="Пошта"
                type="text"
                icon="mdi:email" />
            <ui-input
                v-model="credentials.password"
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
                full />
            <div class="flex items-start mb-6 pl-4">
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
                    class="font-semibold text-blue-600 hover:underline transition-all"
                    to="/auth/register"
                    >Зареєструйте</NuxtLink
                >
                його</p
            >
        </form>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})

const isPasswordRevealed = ref<boolean>(false)

const credentials: { email: string; password: string } = reactive({
    email: '',
    password: '',
})
</script>

<style lang="scss" scoped></style>
