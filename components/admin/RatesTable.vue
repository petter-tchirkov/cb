<template>
  <div>
    <div class="flex items-end justify-center w-full gap-10 mb-5">
      <ui-input v-model="search.bot" class="grow" label="Пошук по боту" type="text">
        <template #icon>
          <Icon name="ant-design:search-outlined" />
        </template>
      </ui-input>
      <ui-input v-model="search.country" class="grow" label="Пошук по клієнту" type="text">
        <template #icon>
          <Icon name="ant-design:search-outlined" />
        </template>
      </ui-input>
      <div class="flex gap-3">
        <ui-button color="success">
          <template #prependIcon>
            <Icon name="material-symbols:save-outline" class="w-4 h-[18px]" />
          </template>
        </ui-button>
        <ui-button color="warning">
          <template #prependIcon>
            <Icon name="jam:rubber" class="w-4 h-[18px]" />
          </template>
        </ui-button>
        <ui-button @click="isAddingRate = !isAddingRate">
          <template #prependIcon>
            <Icon name="ic:baseline-rate-review" class="w-4 h-[18px]" />
          </template>
        </ui-button>
      </div>
    </div>
    <ui-table :items="items" :headers="headers">
      <ui-table-row v-for="(item, index) in filteredRates" :key="index">
        <ui-table-column>{{ item.partner }}</ui-table-column>
        <ui-table-column>{{ item.botURI }}</ui-table-column>
        <ui-table-column>{{ item.country }}</ui-table-column>
        <ui-table-column class="flex justify-between">
          <ui-input v-model="item.rate" light type="text" class="w-32" />
        </ui-table-column>
      </ui-table-row>
    </ui-table>
    <ui-modal :is-modal-visible="isAddingRate">
      <template #modalHeading> Додати рейт </template>
      <template #modalBody>
        <div class="flex gap-3">
          <div class="flex flex-col gap-3">
            <ui-input v-model="newRate.partner" label="Клієнт" type="text" />
            <ui-input v-model="newRate.botURI" label="Бот" type="text" />
          </div>
          <div class="flex flex-col gap-3">
            <ui-input v-model="newRate.country" label="Країна" type="text" />
            <ui-input v-model="newRate.rate" label="Рейт" type="text" />
          </div>
        </div>
      </template>
      <template #modalFooter>
        <ui-button label="Зберегти" size="xs" @click="addNewRate" />
        <ui-button label="Відміна" size="xs" color="light" @click="isAddingRate = false" />
      </template>
    </ui-modal>
  </div>
</template>

<script setup lang="ts">
const search: { bot: string; country: string } = reactive({
  bot: '',
  country: '',
})

interface Rate {
  partner: string
  botURI: string
  country: string
  rate: string
}

const isAddingRate = ref<boolean>(false)
const newRate: Rate = reactive({
  partner: '',
  botURI: '',
  country: '',
  rate: '',
})
const addNewRate = () => {
  items.push(newRate)
  isAddingRate.value = false
}

const filteredRates = computed(() => {
  return items.filter(
    (item) =>
      item.botURI.includes(search.bot) &&
      item.country.includes(search.country)
  )
})

const headers = ['Клієнт', 'Bot URI', 'Країна', 'Рейт']
const items: Rate[] = reactive([
  {
    partner: 'non smsbat',
    botURI: 'zotek',
    country: 'Ukraine',
    rate: '0.01190',
  },
  {
    partner: 'smsbat',
    botURI: 'botek',
    country: 'Belgium',
    rate: '0.01190',
  },
  {
    partner: 'smsbat',
    botURI: 'botek',
    country: 'Japan',
    rate: '0.01190',
  },
  {
    partner: 'smsbat',
    botURI: 'zotek',
    country: 'South Korea',
    rate: '0.01190',
  },
  {
    partner: 'smsbat',
    botURI: 'zotek',
    country: 'Israel',
    rate: '0.01190',
  },
  {
    partner: 'smsbat',
    botURI: 'zotek',
    country: 'Denmark',
    rate: '0.01190',
  },
])
</script>

<style scoped></style>
