<template>
    <label class="relative flex flex-col mb-5">
        <span class="block pl-4 mb-2 text-sm font-medium">{{ label }}</span>
        <input
            type="date"
            ref="datepicker"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as any).value)"
            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 flex grow" />
    </label>
</template>

<script lang="ts" setup>
defineProps<{
    modelValue: string | undefined
    label: String
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()

const datepicker = ref()
</script>

<style lang="scss" scoped></style>
