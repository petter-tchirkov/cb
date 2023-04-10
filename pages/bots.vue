<template>
    <section class="w-full">
        <Header>
            <template #pageTitle> Боти Viber </template>
        </Header>
        <div class="flex p-5">
            <ui-button
                label="Додати бота"
                @click="isAddBotModalVisible = true" />
            <ui-modal
                @modal-close="isAddBotModalVisible = false"
                :is-modal-visible="isAddBotModalVisible">
                <template #modalHeading>Додавання бота</template>
                <template #modalBody>
                    <ui-input
                        label="Назва"
                        type="text"
                        :modelValue="botInput" />
                    <ui-input
                        label="in Session Non Billable Bot"
                        type="text"
                        :modelValue="botInput" />
                    <ui-input
                        label="in Session For Billable Bot"
                        type="text"
                        :modelValue="botInput" />
                </template>
                <template #modalFooter>
                    <ui-button label="Додати" />
                    <ui-button
                        label="Очистити"
                        color="warning"
                        warning />
                </template>
            </ui-modal>
        </div>
        <div class="flex flex-wrap gap-3 px-5">
            <Card
                v-for="bot in bots"
                :key="bot.name">
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                    >{{ bot.botName }}</h5
                >
                <ul class="text-xs font-normal text-gray-700">
                    <li class="mb-1"
                        >Free: <span class="font-bold">{{ bot.free }}</span></li
                    >
                    <li class="mb-1"
                        >in Session Non Billable Bot:
                        <span class="font-bold">{{
                            bot.inSessionNonBillableBot
                        }}</span></li
                    >
                    <li class="mb-1"
                        >in Session For Billable Bot:
                        <span class="font-bold">{{
                            bot.inSessionForBillableBot
                        }}</span></li
                    >
                    <li class="mb-1"
                        >out Of Session Free Message Non Billable Bot:
                        <span class="font-bold">{{
                            bot.outOfSessionFreeMessageNonBillableBot
                        }}</span></li
                    >
                    <li class="mb-1"
                        >out Of Session Free Message For Billable Bot:
                        <span class="font-bold">{{
                            bot.outOfSessionFreeMessageForBillableBot
                        }}</span></li
                    >
                    <li class="mb-7"
                        >out Of Session Billed Messages:
                        <span class="font-bold">{{
                            bot.outOfSessionBilledMessages
                        }}</span></li
                    >
                    <ui-button
                        label="Видалити"
                        size="xs"
                        @click="isBotDeleteModalVisible = true"
                        color="danger" />
                </ul>
                <ui-modal
                    :is-modal-visible="isBotDeleteModalVisible"
                    @modal-close="isBotDeleteModalVisible = false">
                    <template #modalHeading>Видалення бота</template>
                    <template #modalBody
                        >Ви впевнені, що хочете видалити бота
                        <span class="font-bold">{{ bot.botName }}</span>
                    </template>
                    <template #modalFooter>
                        <ui-button
                            label="Видалити"
                            @click="isBotDeleteModalVisible = false"
                            color="danger" />
                        <ui-button
                            label="Відміна"
                            @click="isBotDeleteModalVisible = false"
                            color="light" />
                    </template>
                </ui-modal>
            </Card>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots'
const bots = useBotsStore().bots

definePageMeta({
    middleware: 'login'
})

const isAddBotModalVisible = ref(false)
const isBotDeleteModalVisible = ref(false)

const botInput = ref('')
</script>

<style scoped></style>
