<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Витрати </template>
    </HeaderLite>
    <div class="flex flex-col items-center p-4 lg:p-5">
      <div
        v-if="width >= 1024"
        class="mb-5 flex w-full items-end justify-center gap-10"
      >
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
          v-for="(row, index) in useCostsStore().costs"
          :key="index"
        >
          <ui-table-column>{{ row.date }}</ui-table-column>
          <ui-table-column>{{ row.bot_uri }}</ui-table-column>
          <ui-table-column>{{ row.bot_name }}</ui-table-column>
          <ui-table-column>{{ row.country }}</ui-table-column>
          <ui-table-column>{{ row.rate_type }}</ui-table-column>
          <ui-table-column>{{ row.rate || '-' }}</ui-table-column>
          <ui-table-column>{{ row.attempts }}</ui-table-column>
          <ui-table-column>{{ row.sent }}</ui-table-column>
          <ui-table-column>{{ row.delivered }}</ui-table-column>
          <ui-table-column>{{ row.billed }}</ui-table-column>
          <ui-table-column>{{ row.charged }}</ui-table-column>
        </ui-table-row>
      </ui-table>
      <div
        v-if="width < 1024 && costsStore.costs"
        class="grid w-full grid-cols-1 gap-4"
      >
        <div
          v-for="(item, index) in useCostsStore().costs"
          :key="index"
          class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow"
        >
          <div class="flex items-center justify-between space-x-2 text-sm">
            <div class="flex gap-2">
              <div class="font-bold text-blue-600">{{ item.bot_name }}</div>
              <div class="text-gray-500">{{ item.date }}</div>
              <div class="font-bold">{{ item.country }}</div>
            </div>
            <div class="font-bold">{{ item.rate }}</div>
          </div>
          <div>
            <div class="text-xs">
              Rate Type: <span>{{ item.rate_type }}</span>
            </div>
            <div class="flex justify-between">
              <div class="text-xs">Attempts: {{ item.attempts }}</div>
              <div class="text-xs">Sent: {{ item.sent }}</div>
              <div class="text-xs">Delivered: {{ item.delivered }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-xs">Billed: {{ item.billed }}</div>
              <div class="text-xs">Charged: {{ item.charged }}</div>
            </div>
          </div>
        </div>
      </div>
      <p v-if="!costsStore.costs.length">Немає даних для відображення</p>
      <p
        v-if="costsStore.costs.length"
        class="mt-5 flex items-center"
      >
        Всього витрачено:&nbsp;
        <Icon
          name="ic:baseline-euro"
          class="h-5 w-5"
        />
        <span class="text-xl font-semibold">{{ costsStore.totalCharged }}</span>
      </p>

      <div
        v-if="costsStore.pages > 1"
        class="mb-5 mt-5 flex gap-3"
      >
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
          v-if="width >= 1024"
          :label="filterParams.show_all ? 'Показати пагінацію' : 'Показати все'"
          @click="showHideAllFields"
        />
      </div>
      <ui-button
        v-if="useCostsStore().pages > 1"
        label="Експортувати"
        color="light"
        @click="exportCosts(filterParams)"
      >
        <template #prependIcon>
          <Icon name="solar:download-minimalistic-bold" />
        </template>
      </ui-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useWindowSize } from '@vueuse/core'

  import { useCostsStore } from '~/store/costs'
  import { useAuthStore } from '~/store/auth'
  import { ICosts } from '~/types/costs'
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const { width } = useWindowSize()

  const url = useRuntimeConfig().public.baseURL
  const user = useAuthStore().user?.user_id
  const costsStore = useCostsStore()

  const filterParams: ICosts = reactive({
    id: user as number,
    page: 1,
    per_page: width.value >= 1024 ? 10 : 4,
    bot_name: '',
    country: '',
    date_from: firstDayOfCurrentMonth,
    date_to: lastDayOfCurrentMonth,
    show_all: false,
  })

  const goToFirstPage = () => {
    filterParams.page = 1
  }

  const filterData = async () => {
    goToFirstPage()
    await costsStore.getCosts(filterParams)
  }

  const nextPage = async () => {
    filterParams.page++
    await costsStore.getCosts(filterParams)
  }
  const previousPage = async () => {
    filterParams.page--
    await costsStore.getCosts(filterParams)
  }
  const goToPage = async (page: number) => {
    filterParams.page = page
    await costsStore.getCosts(filterParams)
  }
  const showHideAllFields = async () => {
    filterParams.show_all = !filterParams.show_all
    await costsStore.getCosts(filterParams)
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

  const exportCosts = async (filterParams: ICosts) => {
    await useFetch(`${url}/Users/statistic-file`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      params: {
        id: filterParams.id,
        page: filterParams.page,
        per_page: filterParams.per_page,
        bot_name: filterParams.bot_name,
        country: filterParams.country,
        date_from: filterParams.date_from,
        date_to: filterParams.date_to,
        show_all: filterParams.show_all,
      },
      onResponse({ response }) {
        const blob = new Blob([response._data], { type: 'octet-stream' })
        const href = URL.createObjectURL(blob)
        const a = Object.assign(document.createElement('a'), {
          href,
          style: 'display:none',
          download: `${useAuthStore().user?.user_name} ${
            filterParams.date_from
          } - ${filterParams.date_to}.csv`,
        })
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(href)
        a.remove()
      },
    })
  }
</script>

<style lang="scss" scoped></style>
