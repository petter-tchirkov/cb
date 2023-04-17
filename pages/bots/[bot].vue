<template>
  <section>
    <HeaderLite>
      <template #pageTitle> {{ nameBot }} </template>
    </HeaderLite>
    <div class="flex w-full p-5">
      <div class="w-1/2">
        <ui-input
          v-model="botParams.botName"
          type="text"
          :disabled="!isEdit"
          label="Ім'я"
        />
        <ui-input
          v-model="botParams.botURI"
          type="text"
          :disabled="!isEdit"
          label="URI"
        />
        <ui-input
          v-model="botParams.token"
          type="text"
          :disabled="!isEdit"
          label="Токен"
        />
        <div class="flex items-center justify-between">
          <ui-toggle
            v-model="botParams.isActive"
            :disabled="!isEdit"
            label="Ативний"
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
