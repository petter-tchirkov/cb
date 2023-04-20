<template>
  <section class="flex items-center justify-center min-h-screen">
    <form class="p-5 border-2 border-blue-600 rounded-lg w-96">
      <h2 class="mb-8 text-3xl font-bold text-center">Реєстрація</h2>
      <ui-input
        v-model="fields.name"
        label="ПІБ"
        type="text"
        :error="error('name')"
      />
      <ui-input
        v-model="fields.login"
        label="Логін"
        type="text"
        :error="error('login')"
      />
      <ui-input
        v-model="fields.password"
        label="Пароль"
        :type="isPasswordRevealed ? 'text' : 'password'"
        :error="error('password')"
      >
        <template #icon>
          <Icon
            :name="isPasswordRevealed ? 'mdi:eye-off' : 'mdi:eye'"
            class="w-5 h-5"
            @click="isPasswordRevealed = !isPasswordRevealed"
          />
        </template>
      </ui-input>
      <ui-input
        v-model="fields.confirmPassword"
        label="Підтвердження паролю"
        :type="isPasswordRevealed ? 'text' : 'password'"
        :error="error('confirmPassword')"
      >
        <template #icon>
          <Icon
            :name="isPasswordRevealed ? 'mdi:eye-off' : 'mdi:eye'"
            class="w-5 h-5"
            @click="isPasswordRevealed = !isPasswordRevealed"
          />
        </template>
      </ui-input>
      <ui-input
        v-model="fields.accord"
        label="Номер договору"
        type="text"
        :error="error('accord')"
      />
      <ui-button
        label="Зареєструватись"
        @click.prevent="submitForm"
      />
      <p class="mt-5 text-sm text-center">
        Вже маєте аккаунт?
        <NuxtLink
          class="text-sm font-semibold text-blue-900 transition-all hover:text-blue-500"
          to="/auth/login"
          >Увійдіть</NuxtLink
        >
        до його
      </p>
      <ui-toast />
    </form>
  </section>
</template>

<script lang="ts" setup>
  import { useVuelidate } from '@vuelidate/core'
  import { useNotification } from '@kyvg/vue3-notification'
  import { useAuthStore } from '~/store/auth'
  import { useRules } from '~/composables/useRules'

  const { notify } = useNotification()

  definePageMeta({ layout: 'auth' })

  const isPasswordRevealed = ref<boolean>(false)

  const { rules } = useRules()

  const fields: {
    login: string
    password: string
    confirmPassword?: string
    name: string
    accord: string
  } = reactive({
    login: '',
    password: '',
    confirmPassword: '',
    name: '',
    accord: '',
  })

  const v$ = useVuelidate(
    {
      login: rules.value.login,
      password: rules.value.password,
      confirmPassword: rules.value.sameAs,
      name: rules.value.login,
      accord: rules.value.login,
    },
    fields as any
  )

  const error = computed(() => (label: string): string => {
    if (!v$.value[label].$errors || !v$.value[label].$errors.length) {
      return ''
    }
    return v$.value[label].$errors
      .map((er: Record<string, unknown>) => er.$message || '')
      .join('. ')
  })

  const submitForm = async () => {
    const result = await v$.value.$validate()
    if (result) {
      useAuthStore().register(fields)
    } else {
      notify({
        text: 'Помилка реєстрації',
        type: 'error',
      })
    }
  }
</script>

<style lang="scss" scoped></style>
