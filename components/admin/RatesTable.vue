<template>
  <div class="relative bg-white">
    <div class="overflow-y-auto">
      <DataTable
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="adminStore.rates"
        filter-display="row"
        scrollable
        scroll-height="50vh"
      >
        <template #footer>
          <div class="flex w-full justify-between">
            <Button
              label="Додати"
              title="Додати рейт"
              icon="pi pi-plus"
              icon-pos="right"
              @click="isAddingRate = !isAddingRate"
            />
            <Button
              label="Завантажити"
              title="Завантажити"
              icon="pi pi-save"
              severity="success"
              icon-pos="right"
              @click="updateRate"
            />
          </div>
        </template>

        <Column
          field="clientName"
          header="Клієнт"
          :show-filter-menu="false"
          filter-field="clientName"
        >
          <template #filter="{}">
            <InputText
              v-model="filters['clientName'].value"
              placeholder="Пошук по клієнту"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="botURI"
          header="URI Бота"
          filter-field="botURI"
          :show-filter-menu="false"
        >
          <template #filter="{}">
            <InputText
              v-model="filters['botURI'].value"
              placeholder="Пошук по боту"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="country"
          header="Країна"
          filter-field="country"
          :show-filter-menu="false"
        >
          <template #filter="{}">
            <InputText
              v-model="filters['country'].value"
              placeholder="Пошук по країні"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="contract"
          header="Договір"
        />
        <Column
          field="rate"
          header="Рейт"
        >
          <template #body="slotProps">
            <InputNumber
              v-model="slotProps.data.rate"
              :max-fraction-digits="5"
              input-id="currency-germany"
              mode="currency"
              currency="EUR"
              locale="de-DE"
              @input="initUpdatedRates(slotProps.data)"
            />
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              aria-label="Cancel"
              @click="adminStore.deleteRate(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <div class="grid h-[60vh] w-full grid-cols-1 gap-4 lg:hidden lg:h-auto">
        <div
          v-for="item in adminStore.rates"
          :key="item.id"
          class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow"
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
            <div class="font-bold">{{ item.rate }} €</div>
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
  import { FilterMatchMode } from 'primevue/api'
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

  const filters = ref({
    clientName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    botURI: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
