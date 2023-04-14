<template>
    <div class="inline-flex -space-x-px">
        <div @click="$emit('previousPage')" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Назад</div>
        <div @click="$emit('update', page)" v-for="page in calculatePages" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            :class="{'current' : currentPage === page}"
        >
            {{page}}   
        </div>
        <div @click="$emit('nextPage')" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Вперед</div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    totalPages: number,
    perPage?: number,
    currentPage: number
}>(), {
    perPage: 10,
})
const emit = defineEmits<{
    (e: 'update', value: number): void
    (e: 'nextPage', value: number): void
    (e: 'previousPage', value: number): void
}
>()

const calculatePages = computed(()=> {
    return Math.ceil(props.totalPages / props.perPage)
})
</script>

<style scoped>
.current {
    @apply text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700
}
</style>
