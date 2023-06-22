<template>
  <section
    class="flex min-h-screen flex-col items-center justify-center p-4 lg:p-0"
  >
    <form class="w-full rounded-lg border-2 border-blue-600 p-4 lg:w-96 lg:p-5">
      <h2 class="mb-8 text-center text-3xl font-bold">Реєстрація</h2>
      <InputText
        v-model="name"
        placeholder="ПІБ"
        class="mb-5 w-full"
      />
      <InputText
        v-model="login"
        placeholder="Логін"
        class="mb-5 w-full"
      />
      <Password
        v-model="password"
        toggle-mask
        placeholder="Пароль"
        class="mb-5 w-full"
      />
      <Password
        v-model="confirmPassword"
        toggle-mask
        placeholder="Підтвердження паролю"
        class="mb-5 w-full"
      />
      <InputText
        v-model="accord"
        placeholder="Номер договоруi"
        class="mb-5 w-full"
      />
      <Button
        label="Зареєструватись"
        @click.prevent="submitForm"
      />
      <p class="mt-5 text-center text-sm">
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
    <div
      class="fixed bottom-0 left-0 flex h-10 w-screen items-center justify-around text-blue-600"
    >
      <NuxtLink to="/tou">Terms of Use</NuxtLink>
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      <NuxtLink to="/dmca">DMCA Agreement</NuxtLink>
      <NuxtLink to="/default-rates">Default Rates</NuxtLink>
    </div>
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
