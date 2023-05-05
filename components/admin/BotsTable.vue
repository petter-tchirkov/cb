<template>
  <div class="relative">
    <div class="flex flex-col">
      <div
        class="flex flex-col items-end justify-center w-full gap-3 mb-5 lg:justify-between lg:flex-row"
      >
        <div class="flex w-full gap-3">
          <ui-input
            v-model="search.contract"
            class="grow"
            label="Пошук по договору"
            type="text"
          >
            <template #icon>
              <Icon name="ant-design:search-outlined" />
            </template>
          </ui-input>
          <ui-input
            v-model="search.botURI"
            class="grow"
            label="Пошук по боту"
            type="text"
          >
            <template #icon>
              <Icon name="ant-design:search-outlined" />
            </template>
          </ui-input>
        </div>

        <div class="flex justify-between w-full gap-3 lg:w-auto">
          <ui-select
            v-model="selected"
            :options="selectedOptions"
            title="Статус верифікації"
          />
          <ui-button
            color="success"
            title="Завантажити"
            :label="width >= 1024 ? '' : 'Завантажити'"
            @click="adminStore.updateBots(updatedBots)"
          >
            <template #prependIcon>
              <Icon
                v-if="width >= 1024"
                name="material-symbols:save-outline"
                class="w-6 h-5"
              />
            </template>
          </ui-button>
        </div>
      </div>
    </div>

    <div class="overflow-y-auto lg:h-80">
      <ui-table
        :items="adminStore.bots"
        :headers="headers"
      >
        <ui-table-row
          v-for="item in filteredBots"
          :key="item.botId"
        >
          <ui-table-column>{{ item.clientName }}</ui-table-column>
          <ui-table-column>{{ item.contract }}</ui-table-column>
          <ui-table-column>{{ item.botURI }}</ui-table-column>
          <ui-table-column>
            <ui-toggle
              v-model="item.isVerified"
              :disabled="!item.contract"
              :default-check="item.isVerified"
              @change="updateBotsArray(item)"
            />
          </ui-table-column>
        </ui-table-row>
      </ui-table>
      <div class="grid w-full grid-cols-1 gap-4">
        <div
          v-for="item in adminStore.bots"
          :key="item.botId"
          class="flex flex-col gap-3 p-4 bg-white rounded-lg shadow"
        >
          <div class="flex items-start justify-between space-x-2 text-sm">
            <div class="flex flex-col w-full gap-2">
              <div class="flex justify-between">
                <div>
                  Клієнт:
                  <span class="font-bold text-blue-600">{{
                    item.clientName || '-'
                  }}</span>
                </div>
                <div
                  class="font-bold"
                  :class="[item.isVerified ? 'text-green-500' : 'text-red-500']"
                >
                  {{ item.isVerified ? 'Верифіковано' : 'Не верифіковано' }}
                </div>
              </div>

              <div>
                Бот: <span class="font-bold">{{ item.botURI }}</span>
              </div>
              <div class="flex justify-between">
                <div>
                  Договір:
                  <span class="font-bold">{{ item.contract || '-' }}</span>
                </div>
                <ui-toggle
                  v-model="item.isVerified"
                  :disabled="!item.contract"
                  :default-check="item.isVerified"
                  @change="updateBotsArray(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ui-loader v-if="adminStore.isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core'
  import { useAdminStore } from '~/store/admin'
  import { IRatesBot } from '~/types/ratesBot'
  const { width } = useWindowSize()

  const adminStore = useAdminStore()
  const headers = ['Клієнт', 'Договір', 'Бот', 'Верифіковано']
  await useAdminStore().getBots()

  const search: {
    botURI: string
    contract: string
  } = reactive({
    botURI: '',
    contract: '',
  })

  adminStore.bots.forEach((item) => {
    if (item.contract === null && item.contract === '') {
      item.contract = ''
    }
  })

  const filteredBots = computed(() => {
    return adminStore.bots.filter(
      (item: IRatesBot) =>
        item.botURI.includes(search.botURI) &&
        (item.contract !== null
          ? item.contract.includes(search.contract)
          : true) &&
        (selected.value.value !== null
          ? item.isVerified === selected.value.value
          : true)
    )
  })

  const updatedBots: Ref<IRatesBot[]> = ref([])
  const updateBotsArray = (item: IRatesBot) => {
    updatedBots.value.push(item)
  }

  const selectedOptions = ref([
    { name: 'Всі', value: null },
    { name: 'Верифіковано', value: true },
    { name: 'Не верифіковано', value: false },
  ])
  const selected = ref({ name: 'Всі', value: null })
</script>

<style scoped></style>
