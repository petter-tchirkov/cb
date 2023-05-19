<template>
  <div>
    <ui-table
      class="h-[86vh] overflow-auto"
      :items="useRatesStore().countriesRates"
      :headers="['Country', 'Rate']"
    >
      <ui-table-row
        v-for="rate in useRatesStore().countriesRates"
        :key="rate.rate"
      >
        <ui-table-column class="!text-2xl">{{
          rate.country.length ? rate.country : '-'
        }}</ui-table-column>
        <ui-table-column class="!text-2xl font-bold"
          >{{ rate.rate }} €</ui-table-column
        >
      </ui-table-row>
    </ui-table>

    <p class="p-4 text-2xl lg:p-5">
      Базовий рейт:
      <span class="font-bold">{{ useRatesStore().baseRate }} €</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useRatesStore } from '~/store/rates'
  definePageMeta({
    layout: 'unauthorized',
  })

  await useRatesStore().getBaseRates()
</script>

<style scoped></style>
