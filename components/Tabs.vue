<template>
  <div>
    <ul
      class="flex flex-wrap mb-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200"
    >
      <li
        v-for="item in items"
        :key="item"
        class="inline-flex p-4 mr-2 rounded-t-lg cursor-pointer hover:text-gray-300 group"
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
