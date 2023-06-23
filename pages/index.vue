<template>
  <section>
    <HeaderLite class="mb-4">
      <template #pageTitle> Витрати </template>
    </HeaderLite>
    <div class="px-4">
      <DataTable
        v-model:filters="filters"
        :value="costsStore.costs"
        class="p-datatable-sm"
        paginator
        :rows="!filterParams.show_all ? 15 : 1000"
        filter-display="row"
        scrollable
        scroll-height="75vh"
      >
        <template #header>
          <div class="flex gap-3">
            <Calendar
              v-model="date"
              selection-mode="range"
              date-format="yy-mm-dd"
              show-icon
            />
            <Button
              label="Завтосувати"
              @click="filterData"
            />
          </div>
        </template>
        <template #empty>
          <div class="flex w-full justify-center">
            <span class="text-xl font-bold">Немає даних для відображення</span>
          </div>
        </template>
        <template #paginatorstart>
          Total Charged:
          <span class="font-bold">{{ useCostsStore().totalCharged }}</span>
        </template>
        <template #paginatorend>
          <Button
            label="Показати все"
            @click="showHideAllFields"
          />
        </template>
        <Column
          field="date"
          header="DATE"
          sortable
          removable-sort
        />
        <Column
          field="bot_uri"
          header="URI"
        />
        <Column
          field="bot_name"
          header="NAME"
          :show-filter-menu="false"
          filter-field="bot_name"
        >
          <template #filter="{}">
            <InputText
              v-model="filters['bot_name'].value"
              placeholder="Пошук по боту"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="country"
          header="COUNTRY"
          :show-filter-menu="false"
          filter-field="country"
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
          field="rate_type"
          header="TYPE"
        >
          <template #body="slotProps">
            <div class="flex w-full justify-center">
              <Tag
                :severity="
                  getRateTypeColors(slotProps.data.rate_type.toString())
                "
                :value="slotProps.data.rate_type"
              />
            </div>
          </template>
        </Column>
        <Column
          field="rate"
          header="RATE"
        />
        <Column
          field="attempts"
          header="ATTEMPTS"
        />
        <Column
          field="sent"
          header="SENT"
        />
        <Column
          field="delivered"
          header="DELIVERED"
        />
        <Column
          field="billed"
          header="BILLED"
        />
        <Column
          field="charged"
          header="CHARGED"
        />
      </DataTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useWindowSize, useNow, useDateFormat } from '@vueuse/core'
  import { FilterMatchMode } from 'primevue/api'
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
  const date = ref([firstDayOfCurrentMonth, lastDayOfCurrentMonth])

  const dateParsed = computed(() => {
    if (date) {
      return date.value.map((i) => {
        return i.toISOString().substring(0, 10)
      })
    } else {
      return Date.today()
    }
  })

  const filterParams: ICosts = reactive({
    id: user as number,
    page: 1,
    per_page: width.value >= 1024 ? 10 : 4,
    bot_name: '',
    country: '',
    date: dateParsed,
    show_all: false,
  })

  const goToFirstPage = () => {
    filterParams.page = 1
  }

  const filterData = async () => {
    goToFirstPage()
    await costsStore.getCosts(filterParams)
  }

  const showHideAllFields = async () => {
    filterParams.show_all = !filterParams.show_all
    await costsStore.getCosts(filterParams)
  }

  await costsStore.getCosts(filterParams)

  const filters = ref({
    bot_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const getRateTypeColors = (rateType: string) => {
    switch (rateType) {
      case 'OUT OF SESSION':
        return 'danger'
      case 'SESSION':
        return 'success'
      case 'WELCOME':
        return 'warning'
    }
  }

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
