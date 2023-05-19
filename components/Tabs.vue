<template>
  <div class="relative">
    <ul
      class="flex justify-between border-b border-gray-200 text-center text-sm font-medium text-gray-500 lg:justify-normal"
    >
      <li
        v-for="item in items"
        :key="item"
        class="group mr-2 inline-flex w-full cursor-pointer justify-center rounded-t-lg p-4 hover:text-gray-300 lg:w-auto lg:justify-normal"
        :class="{ 'border-b-2 border-blue-600': selectedTab === item }"
        @click="$emit('change', item)"
      >
        {{ item }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
  defineProps<{ items: string[]; selectedTab: string }>()
  defineEmits<{
    (e: 'change', value: string): void
  }>()
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped></style>
<style lang="scss" scoped></style>
