<template>
  <div class="relative w-44">
    <ui-button
      :label="modelValue.name"
      :title="title"
      full
      @click="isSelectShown = !isSelectShown"
    />
    <div
      v-if="isSelectShown"
      ref="select"
      class="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-min"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li
          v-for="option in options"
          :key="option"
          class="block px-4 py-2 cursor-pointer hover:bg-gray-100"
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
