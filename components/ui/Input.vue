<template>
  <label class="relative flex flex-col mb-5">
    <span class="block pl-4 mb-2 text-sm font-medium">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4"
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
  </label>
</template>

<script lang="ts" setup>
  defineProps<{
    label: string
    type: string
    icon?: string
    modelValue: string | undefined
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  const slots = useSlots()
</script>

<style lang="scss" scoped></style>
