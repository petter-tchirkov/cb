<template>
  <div class="flex flex-col">
    <div class="flex items-end justify-center w-full gap-10 mb-5">
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
        :options="selectedOptions"
        title="Статус верифікації"
      />
      <div class="flex gap-3">
        <ui-button
          color="success"
          title="Завантажити"
          @click="adminStore.updateBots(updatedBots)"
        >
          <template #prependIcon>
            <Icon
              name="material-symbols:save-outline"
              class="w-4 h-[18px]"
            />
          </template>
        </ui-button>
      </div>
    </div>
  </div>

  <ui-table
    :items="adminStore.bots"
    :headers="headers"
  >
    <ui-table-row
      v-for="item in filteredBots"
      :key="item.botId"
    >
      <ui-table-column>{{ item.clientName || '-' }}</ui-table-column>
      <ui-table-column>{{ item.contract || '-' }}</ui-table-column>
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
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  import { IRatesBot } from '~/types/ratesBot'
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
  const filteredBots = computed(() => {
    return adminStore.bots.filter(
      (item: IRatesBot) =>
        item.botURI.includes(search.botURI) &&
        (item.contract !== null
          ? item.contract.includes(search.contract)
          : null) &&
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
