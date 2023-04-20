import { required, helpers, minLength } from '@vuelidate/validators'
import { computed } from 'vue'

export const useRules = () => {
  const rules = computed(() => {
    return {
      login: {
        required: helpers.withMessage('Введіть логін', required),
        min: helpers.withMessage(
          'Логін має бути довший за 3 символи',
          minLength(3)
        ),
      },
      password: {
        required: helpers.withMessage('Введіть пароль', required),
        psw: helpers.withMessage(
          'Пароль повинен бути довший за 8 символів, мати хоча б одну буквку і одну цифру',
          (v: string) => {
            return v === ''
              ? true
              : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v)
          }
        ),
      },
    }
  })
  return { rules }
}
