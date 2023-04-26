<template>
  <div>
    <div class="flex items-end justify-center w-full gap-10 mb-5">
      <ui-input
        v-model="search.bot"
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
        label="Пошук по клієнту"
        type="text"
      >
        <template #icon>
          <Icon name="ant-design:search-outlined" />
        </template>
      </ui-input>
      <div class="flex gap-3">
        <ui-button color="success">
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
      :items="rates"
      :headers="headers"
    >
      <ui-table-row
        v-for="(item, index) in filteredRates"
        :key="index"
      >
        <ui-table-column>{{ item.clientName }}</ui-table-column>
        <ui-table-column>{{ item.botURI }}</ui-table-column>
        <ui-table-column>{{ item.country }}</ui-table-column>
        <ui-table-column class="flex justify-between">
          <ui-input
            v-model="item.rate"
            light
            type="text"
            class="w-32"
          />
        </ui-table-column>
      </ui-table-row>
    </ui-table>
    <ui-modal :is-modal-visible="isAddingRate">
      <template #modalHeading> Додати рейт </template>
      <template #modalBody>
        <div class="flex gap-3">
          <div class="flex flex-col gap-3">
            <ui-input
              v-model="newRate.clientName"
              label="Клієнт"
              type="text"
            />
            <ui-input
              v-model="newRate.botURI"
              label="Бот"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-3">
            <ui-input
              v-model="newRate.country"
              label="Країна"
              type="text"
            />
            <ui-input
              v-model="newRate.rate"
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
  </div>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  import { IRate } from '~/types/rate'
  const rates = useAdminStore().rates

  const search: { bot: string; country: string } = reactive({
    bot: '',
    country: '',
  })

  watch(rates, (ratesNew) => {
    console.log(ratesNew)
  })

  const isAddingRate = ref<boolean>(false)
  const newRate: IRate = reactive({
    clientName: '',
    contract: '',
    botURI: '',
    country: '',
    rate: 0,
  })
  const addNewRate = () => {
    rates.push(newRate)
    isAddingRate.value = false
  }

  const filteredRates = computed(() => {
    return rates.filter(
      (item: IRate) =>
        item.botURI.includes(search.bot) &&
        item.country.includes(search.country)
    )
  })

  const headers = ['Клієнт', 'Bot URI', 'Країна', 'Рейт']
</script>

<style scoped></style>
