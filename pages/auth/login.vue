<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center p-4 lg:p-0"
  >
    <form class="w-full rounded-lg bg-white p-4 shadow-lg lg:w-96 lg:p-5">
      <h2 class="mb-8 text-center text-3xl font-bold">Вхід</h2>
      <div class="w-full">
        <InputText
          v-model="fields.login"
          placeholder="Логін"
          class="mb-5 w-full"
        />
        <InputText
          v-model="fields.password"
          placeholder="Пароль"
          class="mb-5 w-full"
        />
      </div>

      <Button
        label="Увійти"
        class="w-full"
        @click.prevent="useAuthStore().login(fields)"
      />

      <p class="mt-5 text-center text-sm">
        Ще не маєте аккаунту?
        <NuxtLink
          class="font-semibold text-blue-600 transition-all hover:underline"
          to="/auth/register"
          >Зареєструйте
        </NuxtLink>
        його
      </p>
    </form>
    <div
      class="fixed bottom-0 left-0 flex h-10 w-screen items-center justify-around border-t text-blue-600"
    >
      <NuxtLink to="/tou">Terms of Use</NuxtLink>
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      <NuxtLink to="/dmca">DMCA Agreement</NuxtLink>
      <NuxtLink to="/default-rates">Default Rates</NuxtLink>
    </div>
    <ui-toast />
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  definePageMeta({
    layout: 'auth',
  })

  const isPasswordRevealed = ref<boolean>(false)

  const fields: { login: string; password: string } = reactive({
    login: '',
    password: '',
  })
</script>

<style lang="scss" scoped></style>
