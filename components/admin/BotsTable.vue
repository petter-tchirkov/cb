<template>
  <div class="relative bg-white">
    <DataTable
      v-model:filters="filters"
      :value="adminStore.bots"
      class="p-datatable-sm"
      filter-display="row"
      scrollable
      scroll-height="50vh"
    >
      <template #footer>
        <Button
          severity="success"
          label="Завантажити"
          title="Завантажити"
          icon="pi pi-save"
          icon-pos="right"
          @click="updateBots"
        />
      </template>
      <Column
        field="clientName"
        header="Клієнт"
      >
        <template #body="slotProps">
          <ui-auto-complete
            v-model="slotProps.data.clientName"
            :items="useAdminStore().clientsList"
            @update:model-value="
              updateBotsArray(slotProps.data, slotProps.data.botId)
            "
            @update:id="(id) => (slotProps.data.userId = id)"
          />
        </template>
      </Column>
      <Column
        field="contract"
        header="Договір"
        filter-field="contract"
        :show-filter-menu="false"
      >
        <template #filter="{}">
          <InputText
            v-model="filters['contract'].value"
            placeholder="Пошук по договору"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="botURI"
        header="Бот"
        :show-filter-menu="false"
      >
        <template #filter="{}">
          <InputText
            v-model="filters['botURI'].value"
            placeholder="Пошук по боту"
            class="p-column-filter"
          />
        </template>
        <template #body="slotProps">
          <NuxtLink
            class="flex w-full hover:text-black"
            :to="`/admin/${slotProps.data.botId}`"
          >
            {{ slotProps.data.botURI }}
          </NuxtLink>
        </template>
      </Column>
      <Column
        field="isVerified"
        header="Статус"
        filter-field="isVerified"
        :show-filter-menu="false"
      >
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            :options="[true, false]"
            placeholder="Верифіковано"
            class="p-column-filter"
            style="min-width: 12rem"
            :show-clear="true"
            @change="filterCallback()"
          >
          </Dropdown>
        </template>
        <template #body="slotProps">
          <Tag
            class="cursor-pointer"
            :value="
              slotProps.data.isVerified ? 'Верифіковано' : 'Не верифіковано'
            "
            :severity="slotProps.data.isVerified ? 'success' : 'danger'"
            @click="
              ;(slotProps.data.isVerified = !slotProps.data.isVerified),
                updateBotsArray(slotProps.data, slotProps.data.botId)
            "
          />
        </template>
      </Column>
    </DataTable>

    <div class="relative overflow-y-auto lg:max-h-[480px]">
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
</template>

<script setup lang="ts">
  import { FilterMatchMode } from 'primevue/api'
  import { useAdminStore } from '~/store/admin'
  import { IRatesBot } from '~/types/ratesBot'

  const adminStore = useAdminStore()
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

  const filters = ref({
    contract: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    botURI: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isVerified: { value: null, matchMode: FilterMatchMode.EQUALS },
  })

  const updatedBots: Ref<IRatesBot[]> = ref([])
  const updateBotsArray = (item: IRatesBot, id?: number) => {
    if (!updatedBots.value.includes(item)) {
      if (typeof id === 'number') {
        item.botId = id
      }
      updatedBots.value.push(item)
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
