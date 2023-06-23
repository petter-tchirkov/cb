<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Новий бот </template>
    </HeaderLite>
    <div class="p-4">
      <div class="rounded-lg bg-white p-4 shadow-md lg:w-4/12">
        <div class="mb-5 flex flex-col gap-3">
          <InputText
            v-model="newBot.botName"
            placeholder="Ім'я"
          />
          <InputText
            v-model="newBot.botURI"
            placeholder="URI"
          />
          <InputText
            v-model="newBot.token"
            placeholder="Токен"
          />
        </div>
        <div class="flex justify-end gap-3">
          <Button
            label="Відміна"
            severity="warning"
          />
          <Button
            label="Cтворити"
            @click="useBotsStore().addBot(newBot)"
          />
        </div>
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
