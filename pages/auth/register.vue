<template>
  <section
    class="flex min-h-screen flex-col items-center justify-center p-4 lg:p-0"
  >
    <form class="w-full rounded-lg border-2 border-blue-600 p-4 lg:w-96 lg:p-5">
      <h2 class="mb-8 text-center text-3xl font-bold">Реєстрація</h2>
      <small
        v-if="v$.name.$error"
        class="p-error"
        >{{ v$.name.$errors[0].$message }}</small
      >
      <InputText
        v-model="name"
        placeholder="ПІБ"
        class="mb-5 w-full"
        :class="{ 'p-invalid': v$.name.$errors.length }"
      />
      <small
        v-if="v$.login.$error"
        class="p-error"
        >{{ v$.login.$errors[0].$message }}</small
      >
      <InputText
        v-model="login"
        placeholder="Логін"
        class="mb-5 w-full"
        :class="{ 'p-invalid': v$.login.$errors.length }"
      />
      <small
        v-if="v$.password.$error"
        class="p-error text-xs"
        >{{ v$.password.$errors[0].$message }}</small
      >
      <Password
        v-model="password"
        toggle-mask
        :feedback="false"
        placeholder="Пароль"
        class="mb-5 w-full"
        :class="{ 'p-invalid': v$.password.$errors.length }"
      />
      <small
        v-if="v$.confirmPassword.$error"
        class="p-error text-xs"
        >{{ v$.confirmPassword.$errors[0].$message }}</small
      >
      <Password
        v-model="confirmPassword"
        :feedback="false"
        toggle-mask
        placeholder="Підтвердження паролю"
        class="mb-5 w-full"
        :class="{ 'p-invalid': v$.confirmPassword.$errors.length }"
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
          >Увійдіть
        </NuxtLink>
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
      name: rules.value.name,
      accord: rules.value.login,
    },
    { login, password, name, accord, confirmPassword }
  )

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
