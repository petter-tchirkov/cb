<template>
  <section class="flex items-center justify-center min-h-screen">
    <form class="p-5 border-2 border-blue-600 rounded-lg w-96">
      <h2 class="mb-8 text-3xl font-bold text-center">Реєстрація</h2>
      <ui-input
        v-model="name"
        class="mb-5"
        label="ПІБ"
        type="text"
        :error="error('name')"
      />
      <ui-input
        v-model="login"
        class="mb-5"
        label="Логін"
        type="text"
        :error="error('login')"
      />
      <ui-input
        v-model="password"
        class="mb-5"
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
        v-model="confirmPassword"
        class="mb-5"
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
        v-model="accord"
        class="mb-5"
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
  import { sameAs, helpers } from '@vuelidate/validators'
  import { useAuthStore } from '~/store/auth'
  import { useRules } from '~/composables/useRules'

  const { notify } = useNotification()

  definePageMeta({ layout: 'auth' })

  const isPasswordRevealed = ref<boolean>(false)

  const { rules } = useRules()

  const login = ref('')
  const name = ref('')
  const password = ref('')
  const accord = ref('')
  const confirmPassword = ref('')

  const v$ = useVuelidate(
    {
      login: rules.value.login,
      password: rules.value.password,
      confirmPassword: {
        sameAsPassword: helpers.withMessage(
          'Паролі не співпадають',
          sameAs(password)
        ),
      },
      name: rules.value.login,
      accord: rules.value.login,
    },
    { login, password, name, accord, confirmPassword }
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
      useAuthStore().register(
        login.value,
        password.value,
        name.value,
        accord.value
      )
    } else {
      notify({
        text: 'Помилка реєстрації',
        type: 'error',
      })
    }
  }
</script>

<style lang="scss" scoped></style>
