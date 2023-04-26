<template>
  <div>
    <div class="flex items-end justify-center w-full gap-10 mb-5">
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
      <div class="flex gap-3">
        <ui-button
          color="success"
          @click="uploadRate"
        >
          <template #prependIcon>
            <Icon
              name="material-symbols:save-outline"
              class="w-4 h-[18px]"
            />
          </template>
        </ui-button>
        <ui-button color="warning">
          <template #prependIcon>
            <Icon
              name="jam:rubber"
              class="w-4 h-[18px]"
            />
          </template>
        </ui-button>
        <ui-button @click="isAddingRate = !isAddingRate">
          <template #prependIcon>
            <Icon
              name="ic:baseline-rate-review"
              class="w-4 h-[18px]"
            />
          </template>
        </ui-button>
      </div>
    </div>
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
        <ui-table-column class="flex justify-between">
          <ui-input
            v-model.number="item.rate"
            light
            type="text"
            class="w-32"
            @input="getUpdatedRate(item)"
          />
        </ui-table-column>
      </ui-table-row>
    </ui-table>
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
          @click="addNewRate"
        />
        <ui-button
          label="Відміна"
          size="xs"
          color="light"
          @click="isAddingRate = false"
        />
      </template>
    </ui-modal>
    <ui-toast />
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
  const newRate: Ref<IRate> = ref({} as IRate)

  const updatedRate: Ref<IRate[]> = ref([])
  const getUpdatedRate = (item: IRate) => {
    updatedRate.value.push(item)
  }

  const addNewRate = () => {
    adminStore.rates.push(newRate.value)
    isAddingRate.value = false
  }

  const uploadRate = () => {
    if (Object.keys(newRate.value).length >= 1) {
      adminStore.addRate(newRate.value)
    } else {
      adminStore.updateRate(updatedRate.value)
    }
  }

  const filteredRates = computed(() => {
    return adminStore.rates.filter(
      (item: IRate) =>
        item.botURI.includes(search.botURI) &&
        item.country.includes(search.country)
    )
  })

  const headers = ['Клієнт', 'Bot URI', 'Країна', 'Договір', 'Рейт']
</script>

<style scoped></style>
