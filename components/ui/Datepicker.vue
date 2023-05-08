<template>
  <label class="relative flex flex-col">
    <span class="mb-2 block pl-4 text-sm font-medium">{{ label }}</span>
    <input
      ref="datepicker"
      type="date"
      :value="modelValue"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      @input="$emit('update:modelValue', ($event.target as any).value)"
    />
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
