<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <th
        v-for="header in headers"
        :key="header"
        scope="col"
        class="px-4 py-3 text-sm"
      >
        {{ header }}
      </th>
    </thead>
    <slot />
  </table>
  <!-- <ui-table-pagination :items="items" /> -->
</template>

<script setup lang="ts">
  import { ICostsItem } from '~/types/costsItem'

  defineProps<{
    headers: string[]
    items: ICostsItem[]
  }>()
</script>

<style scoped></style>
