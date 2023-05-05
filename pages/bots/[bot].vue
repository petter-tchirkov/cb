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
        <span
          class="hidden text-xs lg:block"
          :class="
            useBotsStore().bot.isVerified ? 'text-green-500' : 'text-red-500'
          "
          >{{
            useBotsStore().bot.isVerified ? 'Верифікований' : 'Не верифікований'
          }}</span
        >
      </template>
    </HeaderLite>
    <div class="h-auto">
      <div class="flex flex-col w-full p-4 lg:p-5 lg:flex-row">
        <div class="lg:w-1/2">
          <ui-input
            v-model="botParams.botName"
            type="text"
            :disabled="!isEdit"
            label="Ім'я"
            class="mb-5"
          />
          <ui-input
            v-model="botParams.botURI"
            type="text"
            disabled
            label="URI"
            class="mb-5"
          />
          <ui-input
            v-model="botParams.token"
            type="text"
            :disabled="!isEdit"
            label="Токен"
            class="mb-5"
          />
          <div
            class="flex flex-col items-center justify-between gap-4 lg:gap-0 lg:flex-row"
          >
            <ui-toggle
              v-model="botParams.isActive"
              :default-check="botParams.isActive"
              label="Активний"
              :disabled="!isEdit"
            />
            <div class="flex gap-3">
              <ui-button
                :label="isEdit ? 'Зберегти' : 'Редагувати'"
                size="s"
                @click="initBotUpdate"
              >
                <template #prependIcon>
                  <Icon
                    name="bxs:edit"
                    class="w-5 h-5"
                  />
                </template>
              </ui-button>
              <ui-button
                label="Видалити"
                size="s"
                color="danger"
                @click="isDelete = !isDelete"
              >
                <template #prependIcon>
                  <Icon
                    name="bxs:trash"
                    class="w-5 h-5"
                  />
                </template>
              </ui-button>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5">
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
