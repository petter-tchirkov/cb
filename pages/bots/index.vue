<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Боти Viber </template>
    </HeaderLite>
    <div class="flex p-5">
      <ui-button
        label="Додати бота"
        @click="isAddBotModalVisible = true"
      />
      <ui-modal
        :is-modal-visible="isAddBotModalVisible"
        @modal-close="isAddBotModalVisible = false"
      >
        <template #modalHeading>Новий бот</template>
        <template #modalBody>
          <ui-input
            label="Назва"
            type="text"
            :model-value="botInput"
          />
          <ui-input
            label="in Session Non Billable Bot"
            type="text"
            :model-value="botInput"
          />
          <ui-input
            label="in Session For Billable Bot"
            type="text"
            :model-value="botInput"
          />
        </template>
        <template #modalFooter>
          <ui-button label="Додати" />
          <ui-button
            label="Очистити"
            color="warning"
            warning
          />
        </template>
      </ui-modal>
    </div>
    <div class="flex flex-wrap gap-3 px-5">
      <BotCard
        v-for="bot in botsStore.bots"
        :key="bot.botName"
        @click.stop="router.push(`/bots/${bot.id}`)"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ bot.botName }}
        </h5>
        <ul class="text-xs font-normal text-gray-700">
          <li class="mb-1">
            Billing Status:
            <span class="font-bold">{{ bot.billingStatuses }}</span>
          </li>
          <li class="mb-1">
            Bot URI:
            <span class="font-bold">{{ bot.botURI }}</span>
          </li>
          <li class="mb-1">
            Created Date:
            <span class="font-bold">{{ bot.createdDate }}</span>
          </li>
          <li class="mb-1">
            Bot ID:
            <span class="font-bold">{{ bot.id }}</span>
          </li>
          <ui-button
            label="Видалити"
            size="xs"
            color="danger"
            @click.stop="isBotDeleteModalVisible = true"
          />
        </ul>
        <ui-modal
          :is-modal-visible="isBotDeleteModalVisible"
          @modal-close="isBotDeleteModalVisible = false"
        >
          <template #modalHeading>Видалення бота</template>
          <template #modalBody
            >Ви впевнені, що хочете видалити бота
            <span class="font-bold">{{ bot.botName }}</span>
          </template>
          <template #modalFooter>
            <ui-button
              label="Видалити"
              color="danger"
              @click.stop="isBotDeleteModalVisible = false"
            />
            <ui-button
              label="Відміна"
              color="light"
              @click.stop="isBotDeleteModalVisible = false"
            />
          </template>
        </ui-modal>
      </BotCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useBotsStore } from '~/store/bots'
  const router = useRouter()
  const botsStore = useBotsStore()
  await botsStore.fetchBots()

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const isAddBotModalVisible = ref(false)
  const isBotDeleteModalVisible = ref(false)

  const botInput = ref('')
</script>

<style scoped></style>
