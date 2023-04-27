<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <form class="p-5 border-2 border-blue-600 rounded-lg w-96">
      <h2 class="mb-8 text-3xl font-bold text-center">Вхід</h2>
      <ui-input
        v-model="fields.login"
        class="mb-5"
        label="Логін"
        type="text"
        icon="mdi:email"
      />
      <ui-input
        v-model="fields.password"
        class="mb-5"
        label="Пароль"
        :type="isPasswordRevealed ? 'text' : 'password'"
        icon="mdi:eye"
      >
        <template #icon>
          <Icon
            :name="isPasswordRevealed ? 'mdi:eye-off' : 'mdi:eye'"
            class="w-5 h-5"
            @click="isPasswordRevealed = !isPasswordRevealed"
          /> </template
      ></ui-input>
      <ui-button
        label="Увійти"
        full
        @click.prevent="useAuthStore().login(fields)"
      />

      <p class="mt-5 text-sm text-center">
        Ще не маєте аккаунту?
        <NuxtLink
          class="font-semibold text-blue-600 transition-all hover:underline"
          to="/auth/register"
          >Зареєструйте
        </NuxtLink>
        його
      </p>
    </form>
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
