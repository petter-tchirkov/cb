<template>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <th
                scope="col"
                class="px-4 py-3 text-sm"
                v-for="header in headers"
                :key="header">
                {{ header }}
            </th>
        </thead>
        <slot />
    </table>
    <ui-table-pagination :items="items" />
</template>

<script setup lang="ts">
defineProps<{
    headers: string[]
    items: Record<string, any>[]
}>()
</script>

<style scoped></style>
