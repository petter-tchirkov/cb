<template>
  <div class="hidden w-full lg:block">
    <div>
      <table class="w-full border-collapse text-left text-sm text-gray-500">
        <thead class="bg-gray-100 text-xs uppercase text-gray-700">
          <th
            v-for="header in headers"
            :key="header"
            scope="col"
            class="sticky top-0 z-10 bg-gray-50 px-4 py-3 text-sm"
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
