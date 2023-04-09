<template>
    <section class="w-full min-h-screen flex justify-center items-center">
        <form class="w-96 border-2 border-blue-600 p-5 rounded-lg">
            <h2 class="text-center text-3xl mb-8 font-bold">Реєстрація</h2>
            <ui-input
                v-model="credentials.fullName"
                label="Повне ім'я"
                type="text" />
            <ui-input
                v-model="credentials.email"
                label="Пошта"
                type="text" />
            <ui-input
                v-model="credentials.password"
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
                label="Зареєструватись"
                full />
            <p class="text-sm text-center"
                >Вже маєте аккаунт?
                <NuxtLink
                    class="text-blue-900 text-sm hover:text-blue-500 transition-all"
                    to="/auth/register"
                    >Увійдіть</NuxtLink
                >
                до його</p
            >
        </form>
    </section>
</template>

<script lang="ts" setup>
const isPasswordRevealed = ref<boolean>(false)

const credentials: { fullName: string; email: string; password: string } =
    reactive({
        fullName: '',
        email: '',
        password: '',
    })
</script>

<style lang="scss" scoped></style>
