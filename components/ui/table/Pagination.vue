<template>
    <div class="flex justify-center mt-4">
        <span
            class="px-3 cursor-pointer py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 first-of-type:rounded-l-lg last-of-type:rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            v-for="page in pages"
            :key="page"
            >{{ page }}</span
        ></div
    >
</template>

<script setup lang="ts">
const props = defineProps<{
    items: Record<string, any>[]
}>()

const rowsPerPage: number = 5
const pageNumber: number = 1
const pages = computed(() => {
    return Math.ceil(props.items.length / rowsPerPage)
})
const paginateRows = computed(() => {
    let from = (pageNumber - 1) * rowsPerPage
    let to = from + rowsPerPage
    return props.items.slice(from, to)
})
</script>

<style scoped></style>
