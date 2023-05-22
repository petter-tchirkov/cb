<template>
  <button
    class="flex items-center justify-between gap-2 rounded-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
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
      @apply cursor-not-allowed rounded-lg bg-blue-400 px-5 py-2.5 text-center text-sm font-medium text-white;
    }
  }

  .btn {
    //color
    &-primary {
      @apply bg-blue-700 transition hover:bg-blue-800;
    }
    &-warning {
      @apply bg-yellow-400 transition hover:bg-yellow-500;
    }
    &-danger {
      @apply bg-red-700 transition hover:bg-red-800;
    }
    &-light {
      @apply border border-gray-300 bg-white text-gray-900 transition;
    }
    &-success {
      @apply bg-green-700 transition hover:bg-green-800;
    }
    &-light--danger {
      @apply border border-red-300 bg-white text-red-500 transition hover:bg-red-700 hover:text-white;
    }
    &-light--warning {
      @apply border border-yellow-400 bg-white text-yellow-400 transition hover:bg-yellow-400 hover:text-white;
    }

    //size
    &-xs {
      @apply px-3 py-2 text-xs;
    }
    &-s {
      @apply px-3 py-2 text-sm;
    }
    &-base {
      @apply px-5 py-3 text-sm;
    }
    &-lg {
      @apply px-5 py-3 text-base;
    }
    &-xl {
      @apply px-6 py-3.5;
    }
  }
</style>
