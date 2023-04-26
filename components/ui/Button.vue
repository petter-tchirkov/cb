<template>
  <button
    class="flex items-center justify-between gap-2 font-medium text-white rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
    :class="[{ 'w-full': full }, `btn-${color}`, `btn-${size}`]"
    :disabled="disabled"
    :title="title"
  >
    <slot name="prependIcon" />
    {{ label }}
    <slot name="appendIcon" />
  </button>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      label?: string
      full?: boolean
      disabled?: boolean | 'false' | 'true'
      warning?: boolean | 'false' | 'true'
      danger?: boolean | 'false' | 'true'
      color?: string
      size?: string
      title?: string
    }>(),
    {
      label: '',
      disabled: false,
      warning: false,
      danger: false,
      color: 'primary',
      size: 'base',
      title: 'Button',
    }
  )
</script>

<style lang="scss" scoped>
  button {
    &:disabled {
      @apply text-white bg-blue-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center;
    }
  }

  .btn {
    //color
    &-primary {
      @apply bg-blue-700 hover:bg-blue-800;
    }
    &-warning {
      @apply bg-yellow-400 hover:bg-yellow-500;
    }
    &-danger {
      @apply bg-red-700 hover:bg-red-800;
    }
    &-light {
      @apply bg-white border border-gray-300 text-gray-900;
    }
    &-success {
      @apply bg-green-700 hover:bg-green-800;
    }

    //size
    &-xs {
      @apply px-3 py-2 text-xs;
    }
    &-s {
      @apply px-3 py-2 text-sm;
    }
    &-base {
      @apply text-sm px-5 py-3;
    }
    &-lg {
      @apply px-5 py-3 text-base;
    }
    &-xl {
      @apply px-6 py-3.5;
    }
  }
</style>
