<template>
  <input
    ref="datepicker"
    type="date"
    :value="modelValue"
    class="h-[50px] rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    @input="$emit('update:modelValue', ($event.target as any).value)"
  />
</template>

<script lang="ts" setup>
  defineProps<{
    modelValue: string | undefined
  }>()
  defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  const datepicker = ref()
</script>

<style lang="scss" scoped></style>
