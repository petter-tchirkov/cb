<template>
  <section>
    <HeaderLite>
      <template #pageTitle>
        <span
          :class="[
            useBotsStore().bot.isVerified
              ? 'text-green-500 lg:text-gray-900'
              : 'text-red-500 lg:text-gray-900',
          ]"
          >{{ nameBot }}</span
        >
        <Tag
          class="hidden lg:block"
          :value="
            useBotsStore().bot.isVerified ? 'Верифіковано' : 'Не верифіковано'
          "
          :severity="useBotsStore().bot.isVerified ? 'success' : 'danger'"
        />
      </template>
    </HeaderLite>
    <div class="h-auto px-4">
      <div class="flex w-full flex-col py-4 lg:flex-row">
        <div class="rounded-lg bg-white p-4 shadow-md lg:w-1/2">
          <InputText
            v-model="botParams.botName"
            :disabled="!isEdit"
            placeholder="Ім'я"
            class="mb-5 w-full"
          />
          <InputText
            v-model="botParams.botURI"
            disabled
            placeholder="URI Бота"
            class="mb-5 w-full"
          />
          <InputText
            v-model="botParams.token"
            :disabled="!isEdit"
            placeholder="Токен"
            class="mb-5 w-full"
          />

          <div
            class="flex flex-col items-center justify-between gap-4 lg:flex-row"
          >
            <ui-toggle
              v-model="botParams.isActive"
              :default-check="botParams.isActive"
              label="Активний"
              :disabled="!isEdit"
            />
            <div class="flex gap-3">
              <Button
                :label="isEdit ? 'Зберегти' : 'Редагувати'"
                @click="initBotUpdate"
              />
              <Button
                label="Видалити"
                severity="danger"
                @click="isDelete = !isDelete"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-lg bg-white p-4 shadow-md">
        <ui-table
          :items="[]"
          :headers="headers"
        />
      </div>
      <ui-modal :is-modal-visible="isDelete">
        <template #modalHeading> Видалення бота </template>
        <template #modalBody>
          Ви впевнені, що хочете видалити бота
          <span class="font-semibold">{{ botParams.botName }}</span>
        </template>
        <template #modalFooter>
          <ui-button
            label="Видалити"
            size="s"
            color="danger"
            @click="initBotRemove"
          >
          </ui-button>
          <ui-button
            label="Відміна"
            color="light"
            size="s"
            @click="isDelete = !isDelete"
          />
        </template>
      </ui-modal>
    </div>
    <ui-toast />
  </section>
</template>

<script setup lang="ts">
  import { useBotsStore } from '~/store/bots'

  const botId = useRoute().params.bot as string
  await useBotsStore().fetchBot(botId)
  const botParams = useBotsStore().bot
  const nameBot = ref(botParams.botName)

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const headers = ['Сума', 'Тип', 'Дата', 'Статус']

  const isEdit = ref<boolean>(false)
  const isDelete = ref<boolean>(false)

  const initBotUpdate = () => {
    if (isEdit.value === true) {
      useBotsStore().updateBot(botParams)
      isEdit.value = false
      useBotsStore().fetchBot(botParams.id as string)
      nameBot.value = botParams.botName
    } else {
      isEdit.value = true
    }
  }

  const initBotRemove = () => {
    useBotsStore().removeBot(botParams)
    isDelete.value = false
  }
</script>

<style scoped></style>
