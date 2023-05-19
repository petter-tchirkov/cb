<template>
  <label class="relative flex flex-col">
    <span
      class="mb-2 block pl-4 text-sm font-medium"
      :class="{ 'text-red-500': error, hidden: label === undefined }"
      >{{ label }}</span
    >
    <div class="flex items-center">
      <input
        :type="type"
        :direction="direction"
        :disabled="disabled"
        :value="modelValue"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-4 text-sm outline-none focus:border-blue-500 focus:ring-blue-500"
        :class="{
          'cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-300':
            disabled,
          'border-red-500': error,
          'border-none bg-transparent !p-0 !pl-0 text-xs': light,
          'appearance-none': type === 'number',
          'text-right': direction === 'rtl',
        }"
        @keypress="number ? inpNum($event) : null"
        @input="$emit('update:modelValue', ($event.target as any).value)"
      />
      <span
        v-if="slots.icon"
        class="absolute right-4"
      >
        <slot
          v-if="slots.icon"
          name="icon"
        />
      </span>
    </div>
    <div :class="{ 'mt-1 pl-4 text-xs text-red-500': error }">
      {{ error }}
    </div>
  </label>
</template>

<script lang="ts" setup>
  defineProps<{
    label?: string
    type: string
    icon?: string
    modelValue?: string | undefined | number
    disabled?: boolean
    error?: string
    light?: boolean
    number?: boolean
    direction?: string
    size?: string
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  function inpNum(e: KeyboardEvent) {
    e = e || window.event
    const charCode = typeof e.which === 'undefined' ? e.keyCode : e.which
    const charStr = String.fromCharCode(charCode)
    if (!charStr.match(/^(([0-9.]?)*)+$/)) {
      e.preventDefault()
    }
  }
  const slots = useSlots()
</script>

<style lang="scss" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
</style>
