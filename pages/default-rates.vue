<template>
  <ui-table
    :items="defaultRates"
    :headers="['Country', 'Rate']"
  >
    <ui-table-row
      v-for="rate in defaultRates"
      :key="rate.rate"
    >
      <ui-table-column class="!text-2xl">{{
        rate.country.length ? rate.country : '-'
      }}</ui-table-column>
      <ui-table-column class="!text-2xl font-bold">{{
        rate.rate
      }}</ui-table-column>
    </ui-table-row>
  </ui-table>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'unauthorized',
  })
  const url = useRuntimeConfig().public.baseURL

  const defaultRates: Ref<{ country: string; rate: number }[]> = ref([])
  const getDefaultRates = async () => {
    await useFetch(`${url}/Home/get-rates`, {
      onResponse({ response }) {
        defaultRates.value = response._data
      },
    })
  }
  await getDefaultRates()
</script>

<style scoped></style>
