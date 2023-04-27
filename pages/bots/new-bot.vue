<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Новий бот </template>
    </HeaderLite>
    <div class="w-1/2 p-5">
      <ui-input v-model="newBot.botName" type="text" label="Ім'я" class="mb-5" />
      <ui-input v-model="newBot.botURI" type="text" label="URI" class="mb-5" />
      <ui-input v-model="newBot.token" type="text" label="Токен" class="mb-5" />
      <div class="flex justify-end gap-3">
        <ui-button color="light" label="Відміна" size="s" />
        <ui-button label="Cтворити" size="s" @click="useBotsStore().addBot(newBot)" />
      </div>
    </div>
    <ui-toast />
  </section>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots'
import { IBot } from '~/types/bot'
definePageMeta({
  middleware: ['login', 'auth'],
})

const newBot: IBot = reactive({
  botName: '',
  botURI: '',
  token: '',
  isActive: true,
  isVerified: false,
})
</script>

<style scoped></style>
