<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
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
  <p
    v-if="!items.length"
    class="w-full pt-5 text-center text-gray-500"
  >
    Дані відсутні
  </p>
</template>

<script setup lang="ts">
  defineProps<{
    headers: string[]
    items: Record<string, any>[]
  }>()
</script>

<style scoped></style>
