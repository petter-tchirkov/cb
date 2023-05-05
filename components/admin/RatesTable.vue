<template>
  <div class="relative">
    <div
      class="flex flex-col items-end justify-center w-full gap-3 mb-5 lg:justify-between lg:flex-row"
    >
      <div class="flex w-full gap-3">
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
        <ui-input
          v-model="search.country"
          class="grow"
          label="Пошук по країні"
          type="text"
        >
          <template #icon>
            <Icon name="ant-design:search-outlined" />
          </template>
        </ui-input>
      </div>
      <div class="flex w-full gap-3 lg:w-auto">
        <ui-button
          :label="width >= 1024 ? '' : 'Завантажити'"
          full
          color="success"
          title="Завантажити"
          @click="updateRate"
        >
          <template #prependIcon>
            <Icon
              v-if="width >= 1024"
              name="material-symbols:save-outline"
              class="w-6 h-5"
            />
          </template>
        </ui-button>
        <ui-button
          :label="width >= 1024 ? '' : 'Додати рейт'"
          full
          title="Додати рейт"
          @click="isAddingRate = !isAddingRate"
        >
          <template #prependIcon>
            <Icon
              v-if="width >= 1024"
              name="material-symbols:add"
              class="w-6 h-6"
            />
          </template>
        </ui-button>
      </div>
    </div>
    <div class="overflow-y-auto lg:h-80">
      <ui-table
        :items="adminStore.rates"
        :headers="headers"
      >
        <ui-table-row
          v-for="item in filteredRates"
          :key="item.id"
        >
          <ui-table-column>{{ item.clientName }}</ui-table-column>
          <ui-table-column>{{ item.botURI }}</ui-table-column>
          <ui-table-column>{{ item.country }}</ui-table-column>
          <ui-table-column>{{ item.contract }}</ui-table-column>
          <ui-table-column class="flex">
            <ui-input
              v-model.number="item.rate"
              light
              number
              type="text"
              class="grow"
              @input="initUpdatedRates(item)"
            >
              <template #icon>
                <Icon
                  name="material-symbols:edit"
                  class="w-5 h-5 transition-all duration-75 cursor-pointer hover:text-yellow-300"
                />
              </template>
            </ui-input>
            <Icon
              name="material-symbols:delete-outline"
              class="w-5 h-5 transition-all duration-75 cursor-pointer hover:text-red-500"
              @click="adminStore.deleteRate(item)"
            />
          </ui-table-column>
        </ui-table-row>
      </ui-table>
      <div class="grid w-full grid-cols-1 gap-4">
        <div
          v-for="item in adminStore.rates"
          :key="item.id"
          class="flex flex-col gap-3 p-4 bg-white rounded-lg shadow"
        >
          <div class="flex items-start justify-between space-x-2 text-sm">
            <div class="flex flex-col gap-2">
              <div>
                Клієнт:
                <span class="font-bold text-blue-600">{{
                  item.clientName
                }}</span>
              </div>
              <div>
                Бот: <span class="font-bold">{{ item.botURI }}</span>
              </div>
              <div>
                Країна: <span class="font-bold">{{ item.country }}</span>
              </div>
              <div>
                Договір: <span class="font-bold">{{ item.contract }}</span>
              </div>
            </div>
            <div class="font-bold">{{ item.rate }}</div>
          </div>
        </div>
      </div>
    </div>
    <ui-modal :is-modal-visible="isAddingRate">
      <template #modalHeading> Додати рейт </template>
      <template #modalBody>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between gap-3">
            <ui-input
              v-model="newRate.clientName"
              label="Клієнт"
              type="text"
              class="grow"
            />
            <ui-input
              v-model="newRate.botURI"
              label="Бот"
              type="text"
              class="grow"
            />
          </div>
          <div class="flex gap-3">
            <ui-input
              v-model="newRate.country"
              label="Країна"
              type="text"
            />
            <ui-input
              v-model="newRate.contract"
              label="Договір"
              type="text"
            />
            <ui-input
              v-model.number="newRate.rate"
              label="Рейт"
              type="number"
            />
          </div>
        </div>
      </template>
      <template #modalFooter>
        <ui-button
          label="Зберегти"
          size="xs"
          @click="addRate"
        />
        <ui-button
          label="Відміна"
          size="xs"
          color="light"
          @click="isAddingRate = false"
        />
      </template>
    </ui-modal>
    <ui-modal :is-modal-visible="isSavingRate">
      <template #modalBody>
        <span>Всі незбережені дані будуть втрачені, продовжити?</span>
      </template>
      <template #modalFooter>
        <ui-button label="Так" />
        <ui-button
          label="Ні"
          color="light"
        />
      </template>
    </ui-modal>
    <ui-toast />
    <ui-loader v-if="adminStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core'
  import { useAdminStore } from '~/store/admin'

  import { IRate } from '~/types/rate'
  const adminStore = useAdminStore()
  const { width } = useWindowSize()

  await adminStore.getRates()

  const search: { botURI: string; country: string } = reactive({
    botURI: '',
    country: '',
  })

  const isAddingRate = ref<boolean>(false)
  const isSavingRate = ref<boolean>(false)
  const newRate: Ref<IRate> = ref({
    botURI: '',
    clientName: '',
    country: '',
    contract: '',
    rate: 0,
  })

  const initUpdatedRates = (item: IRate) => {
    if (!adminStore.updatedRates.includes(item)) {
      adminStore.updatedRates.push(item)
    }
  }

  const updateRate = () => {
    adminStore.updateRate(adminStore.updatedRates)
    adminStore.updatedRates = []
  }

  const addRate = () => {
    adminStore.addRate(newRate.value)
    isAddingRate.value = false
    newRate.value = {
      botURI: '',
      clientName: '',
      country: '',
      contract: '',
      rate: 0,
    }
  }

  const filteredRates = computed(() => {
    if (adminStore.rates) {
      return adminStore.rates.filter(
        (item: IRate) =>
          item.botURI?.includes(search.botURI) &&
          item.country?.includes(search.country)
      )
    }
  })

  const headers = ['Клієнт', 'Bot URI', 'Країна', 'Договір', 'Рейт']
</script>

<style scoped></style>
