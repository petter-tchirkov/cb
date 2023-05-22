<template>
  <div
    class="relative mb-4 overflow-hidden rounded-b-lg bg-white pt-4 shadow-md"
  >
    <div class="flex flex-col">
      <div class="mb-5 flex w-full grow items-end justify-between gap-3 px-4">
        <div class="flex w-full flex-wrap items-end gap-3">
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
          <ui-select
            v-model="selected"
            class="self-end"
            :options="selectedOptions"
            title="Статус верифікації"
          />
        </div>
      </div>
    </div>

    <div class="relative overflow-y-auto lg:max-h-[480px]">
      <ui-table
        :items="adminStore.bots"
        :headers="headers"
      >
        <ui-table-row
          v-for="item in filteredBots"
          :key="item.botId"
          class="cursor-pointer"
        >
          <ui-table-column>
            <ui-auto-complete
              v-model="item.clientName"
              :items="useAdminStore().clientsList"
              class="border-b"
              @update:model-value="
                useDebounceFn(updateBotsArray(item, item.botId), 300)
              "
              @update:id="(id) => (item.userId = id)"
            />
          </ui-table-column>
          <ui-table-column>{{ item.contract }}</ui-table-column>
          <ui-table-column class="hover:font-bold">
            <NuxtLink
              class="flex w-full"
              :to="`/admin/${item.botId}`"
            >
              {{ item.botURI }}
            </NuxtLink>
          </ui-table-column>
          <ui-table-column>
            <ui-toggle
              v-model="item.isVerified"
              :disabled="!item.contract"
              :default-check="item.isVerified"
              @change="updateBotsArray(item, item.botId)"
            />
          </ui-table-column>
        </ui-table-row>
      </ui-table>
      <div class="grid h-[60vh] w-full grid-cols-1 gap-4 lg:hidden lg:h-auto">
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
    </div>
    <ui-loader v-if="adminStore.isLoading" />
  </div>
  <ui-button
    color="success"
    title="Завантажити"
    label="Завантажити"
    @click="updateBots"
  >
    <template #prependIcon>
      <Icon
        v-if="width >= 1024"
        name="material-symbols:save-outline"
        class="h-5 w-6"
      />
    </template>
  </ui-button>
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
  const updateBotsArray = (item: IRatesBot, id?: number) => {
    if (!updatedBots.value.includes(item)) {
      if (typeof id === 'number') {
        item.botId = id
      }
      updatedBots.value.push(item)
      console.log(123)
    }
  }

  const updateBots = () => {
    useAdminStore().updateBots(updatedBots.value)
    updatedBots.value = []
  }

  const selectedOptions = ref([
    { name: 'Всі', value: null },
    { name: 'Верифіковано', value: true },
    { name: 'Не верифіковано', value: false },
  ])
  const selected = ref({ name: 'Всі', value: null })
</script>

<style scoped></style>
