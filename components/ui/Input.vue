<template>
  <label class="relative flex flex-col">
    <span
      class="block pl-4 mb-2 text-sm font-medium"
      :class="{ 'text-red-500': error, hidden: label === undefined }"
      >{{ label }}</span
    >
    <input
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4"
      :class="{
        'bg-gray-100 border border-gray-300 cursor-not-allowed text-gray-300':
          disabled,
        'border-red-500': error,
        'bg-transparent border-none !p-0 !pl-0 text-xs': light,
      }"
      @input="$emit('update:modelValue', ($event.target as any).value)"
    />
    <span
      v-if="slots.icon"
      class="absolute top-9 right-4"
    >
      <slot
        v-if="slots.icon"
        name="icon"
      />
    </span>
    <div :class="{ 'pl-4 mt-1 text-xs text-red-500': error }">
      {{ error }}
    </div>
  </label>
</template>

<script lang="ts" setup>
  defineProps<{
    label?: string
    type: string
    icon?: string
    modelValue: string | undefined | number
    disabled?: boolean
    error?: string
    light?: boolean
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  const slots = useSlots()
</script>

<style lang="scss" scoped></style>
