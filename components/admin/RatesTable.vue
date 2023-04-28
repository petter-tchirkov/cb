<template>
  <div class="relative">
    <div class="flex items-end justify-center w-full gap-10 mb-5">
      <ui-input v-model="search.botURI" class="grow" label="Пошук по боту" type="text">
        <template #icon>
          <Icon name="ant-design:search-outlined" />
        </template>
      </ui-input>
      <ui-input v-model="search.country" class="grow" label="Пошук по країні" type="text">
        <template #icon>
          <Icon name="ant-design:search-outlined" />
        </template>
      </ui-input>
      <div class="flex gap-3">
        <ui-button color="success" title="Завантажити" @click="updateRate">
          <template #prependIcon>
            <Icon name="material-symbols:save-outline" class="w-6 h-5" />
          </template>
        </ui-button>
        <ui-button title="Додати рейт" @click="isAddingRate = !isAddingRate">
          <template #prependIcon>
            <Icon name="material-symbols:add" class="w-6 h-6" />
          </template>
        </ui-button>
      </div>
    </div>
    <div class="overflow-y-auto h-80">
      <ui-table :items="adminStore.rates" :headers="headers">
        <ui-table-row v-for="item in filteredRates" :key="item.id">
          <ui-table-column>{{ item.clientName }}</ui-table-column>
          <ui-table-column>{{ item.botURI }}</ui-table-column>
          <ui-table-column>{{ item.country }}</ui-table-column>
          <ui-table-column>{{ item.contract }}</ui-table-column>
          <ui-table-column class="flex">
            <ui-input v-model.number="item.rate" light type="number" class="grow" @input="initUpdatedRates(item)">
              <template #icon>
                <Icon name="material-symbols:edit"
                  class="w-5 h-5 transition-all duration-75 cursor-pointer hover:text-yellow-300" />
              </template>
            </ui-input>
            <Icon name="material-symbols:delete-outline"
              class="w-5 h-5 transition-all duration-75 cursor-pointer hover:text-red-500"
              @click="adminStore.deleteRate(item)" />
          </ui-table-column>
        </ui-table-row>
      </ui-table>
    </div>
    <ui-modal :is-modal-visible="isAddingRate">
      <template #modalHeading> Додати рейт </template>
      <template #modalBody>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between gap-3">
            <ui-input v-model="newRate.clientName" label="Клієнт" type="text" class="grow" />
            <ui-input v-model="newRate.botURI" label="Бот" type="text" class="grow" />
          </div>
          <div class="flex gap-3">
            <ui-input v-model="newRate.country" label="Країна" type="text" />
            <ui-input v-model="newRate.contract" label="Договір" type="text" />
            <ui-input v-model.number="newRate.rate" label="Рейт" type="number" />
          </div>
        </div>
      </template>
      <template #modalFooter>
        <ui-button label="Зберегти" size="xs" @click="addRate" />
        <ui-button label="Відміна" size="xs" color="light" @click="isAddingRate = false" />
      </template>
    </ui-modal>
    <ui-modal :is-modal-visible="isSavingRate">
      <template #modalBody>
        <span>Всі незбережені дані будуть втрачені, продовжити?</span>
      </template>
      <template #modalFooter>
        <ui-button label="Так" />
        <ui-button label="Ні" color="light" />
      </template>
    </ui-modal>
    <ui-toast />
    <ui-loader v-if="adminStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/store/admin'
import { IRate } from '~/types/rate'
const adminStore = useAdminStore()

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

const updatedRate: Ref<IRate[]> = ref([])
const initUpdatedRates = (item: IRate) => {
  if (!adminStore.updatedRates.includes(item)) {
    adminStore.updatedRates.push(item)
  }
}

const updateRate = () => {
  adminStore.updateRate(updatedRate.value)
  updatedRate.value = []
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
        item.botURI.includes(search.botURI) &&
        item.country.includes(search.country)
    )
  }
})

const headers = ['Клієнт', 'Bot URI', 'Країна', 'Договір', 'Рейт']
</script>

<style scoped></style>
