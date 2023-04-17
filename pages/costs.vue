<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Витрати </template>
    </HeaderLite>
    <div class="flex flex-col items-center p-5">
      <div class="flex items-center justify-center w-full gap-10">
        <ui-input
          v-model="filterParams.bot_name"
          class="grow"
          label="Пошук по боту"
          type="text"
        >
          <template #icon>
            <Icon name="ant-design:search-outlined" />
          </template>
        </ui-input>
        <ui-input
          v-model="filterParams.country"
          class="grow"
          label="Пошук по країні"
          type="text"
        >
          <template #icon>
            <Icon name="ant-design:search-outlined" />
          </template>
        </ui-input>
        <div class="flex gap-5">
          <ui-datepicker
            v-model="filterParams.date_from"
            label="Дата"
          />
          <ui-datepicker
            v-model="filterParams.date_to"
            label="Дата"
          />
        </div>
        <ui-button
          label="Відфільтрувати"
          class="mt-[8px]"
          @click="filterData"
        />
      </div>
      <ui-table
        :items="costsStore.costs"
        :headers="headers"
      >
        <ui-table-row
          v-for="row in costsStore.costs"
          :key="row.rate"
        >
          <ui-table-column>{{ row.date }}</ui-table-column>
          <ui-table-column>{{ row.bot_uri }}</ui-table-column>
          <ui-table-column>{{ row.bot_name }}</ui-table-column>
          <ui-table-column>{{ row.country }}</ui-table-column>
          <ui-table-column>{{ row.rate_type }}</ui-table-column>
          <ui-table-column>{{ row.rate }}</ui-table-column>
          <ui-table-column>{{ row.attempts }}</ui-table-column>
          <ui-table-column>{{ row.sent }}</ui-table-column>
          <ui-table-column>{{ row.delivered }}</ui-table-column>
          <ui-table-column>{{ row.billed }}</ui-table-column>
          <ui-table-column>{{ row.charged }}</ui-table-column>
        </ui-table-row>
      </ui-table>
      <p class="flex items-center mt-5">
        Всього витрачено:&nbsp;
        <Icon
          name="ic:baseline-euro"
          class="w-5 h-5"
        />
        <span class="text-xl font-semibold">{{ costsStore.totalCharged }}</span>
      </p>
      <div class="flex gap-3 mt-5">
        <ui-table-pagination
          v-if="!filterParams.show_all"
          :current-page="filterParams.page"
          :per-page="filterParams.per_page"
          :total-pages="costsStore.pages"
          @next-page="nextPage"
          @previous-page="previousPage"
          @update="(page) => goToPage(page)"
        />
        <ui-button
          :label="filterParams.show_all ? 'Показати пагінацію' : 'Показати все'"
          @click="showHideAllFields"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useCostsStore } from '~/store/costs'
  import { useAuthStore } from '~/store/auth'
  import { ICosts } from '~/types/costs'
  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const user = useAuthStore().user?.user_id
  const costsStore = useCostsStore()

  const filterParams: ICosts = reactive({
    id: user as number,
    page: 1,
    per_page: 10,
    bot_name: '',
    country: '',
    date_from: '',
    date_to: '',
    show_all: false,
  })

  const filterData = async () => {
    await costsStore.getCosts(filterParams)
  }

  const nextPage = async () => {
    filterParams.page++
    await filterData()
  }
  const previousPage = async () => {
    filterParams.page--
    await filterData()
  }
  const goToPage = async (page: number) => {
    filterParams.page = page
    await filterData()
  }
  const showHideAllFields = async () => {
    filterParams.show_all = !filterParams.show_all
    await filterData()
  }

  await costsStore.getCosts(filterParams)

  const headers = [
    'DATE',
    'BOT URI',
    'BOT NAME',
    'COUNTRY',
    'RATE TYPE',
    'RATE',
    'ATTEMPTS',
    'SENT',
    'DELIVERED',
    'BILLED',
    'CHARGED',
  ]
</script>

<style lang="scss" scoped></style>
