<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Рейти </template>
    </HeaderLite>
    <div class="p-4">
      <div class="h-[82vh] overflow-auto lg:bg-white lg:shadow-md">
        <ui-table
          class="overflow-auto"
          :items="useRatesStore().rates"
          :headers="['Країна', 'Бот URI', 'Рейт']"
        >
          <ui-table-row
            v-for="(item, index) in useRatesStore().rates as IRateTableCell[]"
            :key="index"
          >
            <ui-table-column>{{ item.country || '-' }}</ui-table-column>
            <ui-table-column>{{ item.botURI || '-' }}</ui-table-column>
            <ui-table-column>{{ item.rate }} €</ui-table-column>
          </ui-table-row>
        </ui-table>
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
