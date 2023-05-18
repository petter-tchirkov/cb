<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Рейти </template>
    </HeaderLite>
    <div class="h-[86vh] overflow-auto p-4 lg:p-5">
      <ui-table
        class="overflow-auto"
        :items="useRatesStore().rates"
        :headers="['Країна', 'Бот URI', 'Рейт']"
      >
        <ui-table-row
          v-for="(item, index) in useRatesStore().rates"
          :key="index"
        >
          <ui-table-column>{{ item.country || '-' }}</ui-table-column>
          <ui-table-column>{{ item.botURI || '-' }}</ui-table-column>
          <ui-table-column>{{ item.rate }}</ui-table-column>
        </ui-table-row>
      </ui-table>
    </div>
    <p class="p-4 lg:p-5">
      Базовий рейт:
      <span class="font-bold">{{ useRatesStore().baseRate }}</span>
    </p>
  </section>
</template>

<script setup lang="ts">
  import { useRatesStore } from '~/store/rates'

  definePageMeta({
    middleware: ['login', 'auth'],
  })
  await useRatesStore().getUserRates()
  await useRatesStore().getBaseRates()
</script>

<style scoped></style>
