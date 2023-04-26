<template>
  <div class="relative">
    <ui-button
      :label="modelValue.name"
      @click="isSelectShown = !isSelectShown"
    />
    <div
      v-if="isSelectShown"
      ref="select"
      class="absolute mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-min"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li
          v-for="option in options"
          :key="option"
          class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="$emit('update:modelValue', option)"
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
