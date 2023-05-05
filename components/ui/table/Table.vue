<template>
  <div class="hidden w-full lg:block">
    <div>
      <table class="w-full text-sm text-left text-gray-500 border-collapse">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <th
            v-for="header in headers"
            :key="header"
            scope="col"
            class="sticky top-0 z-10 px-4 py-3 text-sm bg-gray-50"
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
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    headers: string[]
    items: Record<string, any>[]
  }>()
</script>

<style scoped></style>
