<template>
  <div class="relative">
    <div class="flex flex-col">
      <div
        class="mb-5 flex w-full flex-col items-end justify-center gap-3 lg:flex-row lg:justify-between"
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

        <div class="flex w-full justify-between gap-3 lg:w-auto">
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
                class="h-5 w-6"
              />
            </template>
          </ui-button>
        </div>
      </div>
    </div>

    <div class="overflow-y-auto lg:max-h-[550px]">
      <ui-table
        :items="adminStore.bots"
        :headers="headers"
      >
        <ui-table-row
          v-for="item in filteredBots"
          :key="item.botId"
          class="cursor-pointer"
        >
          <ui-table-column>{{ item.clientName }}</ui-table-column>
          <ui-table-column>{{ item.contract }}</ui-table-column>
          <ui-table-column>
            <NuxtLink :to="`/admin/${item.botId}`">
              {{ item.botURI }}
            </NuxtLink>
          </ui-table-column>
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
      <div class="grid w-full grid-cols-1 gap-4 lg:hidden">
        <div
          v-for="item in adminStore.bots"
          :key="item.botId"
          class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow"
        >
          <div class="flex items-start justify-between space-x-2 text-sm">
            <div class="flex w-full flex-col gap-2">
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
  const router = useRouter()

  const adminStore = useAdminStore()
  const headers = ['Клієнт', 'Договір', 'Бот', 'Верифіковано']
  await useAdminStore().getBots()

  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

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
