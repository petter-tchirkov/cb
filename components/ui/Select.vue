<template>
  <div class="relative w-44">
    <div
      class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      @click="isSelectShown = !isSelectShown"
    >
      {{ modelValue.name }}
      <Icon
        :class="{ 'rotate-180': isSelectShown }"
        name="tabler:chevron-down"
      />
    </div>
    <div
      v-if="isSelectShown"
      ref="select"
      class="absolute z-20 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li
          v-for="option in options"
          :key="option"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          @click="$emit('update:modelValue', option), (isSelectShown = false)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'
  defineProps<{
    options: Record<string, any>
    modelValue: Record<string, any>
    title?: string
  }>()
  defineEmits<{ (e: 'update:modelValue', value: string): void }>()

  const isSelectShown = ref(false)

  const select = ref(null)
  onClickOutside(select, (event: Event) => {
    event.stopPropagation()
    isSelectShown.value = false
  })
</script>

<style scoped></style>
