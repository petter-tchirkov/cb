<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Рейти </template>
    </HeaderLite>
    <div class="p-4">
      <div class="h-[82vh] overflow-auto rounded-b-lg lg:bg-white lg:shadow-md">
        <DataTable
          class="hidden lg:block"
          :value="useRatesStore().rates"
        >
          <Column
            header="Країна"
            field="country"
          />
          <Column
            header="Бот URI"
            field="botURI"
          />
          <Column
            header="Рейт"
            field="rate"
          />
        </DataTable>
        <div class="grid w-full grid-cols-1 gap-4 lg:hidden">
          <div
            v-for="(item, index) in useRatesStore().rates as IRateTableCell[]"
            :key="index"
            class="flex justify-between gap-3 rounded-lg bg-white p-4 shadow"
          >
            <div class="flex flex-col">
              <span class="font-bold text-blue-600">{{
                item.botURI || '-'
              }}</span>
              <span>{{ item.country || '-' }}</span>
            </div>
            <span class="font-bold">{{ item.rate || '-' }} €</span>
          </div>
        </div>
      </div>
    </div>
    <p class="p-4 lg:p-5">
      Базовий рейт:
      <span class="font-bold">{{ useRatesStore().baseRate }} €</span>
    </p>
  </section>
</template>

<script setup lang="ts">
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import ColumnGroup from 'primevue/columngroup'
  import Row from 'primevue/row'
  import { useRatesStore } from '~/store/rates'

  interface IRateTableCell {
    botURI: string
    country: string
    rate: number
  }

  definePageMeta({
    middleware: ['login', 'auth'],
  })
  await useRatesStore().getUserRates()
  await useRatesStore().getBaseRates()
</script>

<style scoped></style>
