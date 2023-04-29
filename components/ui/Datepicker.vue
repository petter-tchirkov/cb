<template>
  <label class="relative flex flex-col">
    <span class="block pl-4 mb-2 text-sm font-medium">{{ label }}</span>
    <input ref="datepicker" type="date" :value="modelValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
      @input="$emit('update:modelValue', ($event.target as any).value)" />
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string | undefined
  label: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const datepicker = ref()
</script>

<style lang="scss" scoped></style>
