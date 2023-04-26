<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      v-model="checked"
      type="checkbox"
      :disabled="disabled"
      class="sr-only peer"
      @change="$emit('update:modelValue', checked)"
    />
    <div
      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8%] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
      :class="{ 'cursor-not-allowed !bg-gray-100': disabled }"
    ></div>
    <span
      v-if="label"
      class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      :class="{ 'cursor-not-allowed': disabled }"
      >{{ label }}</span
    >
  </label>
</template>

<script setup lang="ts">
  defineEmits<{ (e: 'update:modelValue', checked: boolean): void }>()
  const props = defineProps<{
    label?: string
    disabled?: boolean
    modelValue: boolean
    defaultCheck: boolean
  }>()
  const checked = ref<boolean>(props.defaultCheck)
</script>

<style scoped></style>
