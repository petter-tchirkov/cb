<template>
  <div class="inline-flex -space-x-px">
    <div
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
      @click="$emit('previousPage')"
    >
      Назад
    </div>
    <div
      v-for="page in 10"
      :key="page"
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      :class="{ current: currentPage === page }"
      @click="$emit('update', page)"
    >
      {{ page }}
    </div>
    <div
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
      @click="$emit('nextPage')"
    >
      Вперед
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      totalPages: number
      perPage?: number
      currentPage: number
    }>(),
    {
      perPage: 10,
    }
  )
  defineEmits<{
    (e: 'update', value: number): void
    (e: 'nextPage', value: number): void
    (e: 'previousPage', value: number): void
  }>()

  const calculatePages = computed(() => {
    return Math.ceil(props.totalPages / props.perPage)
  })
</script>

<style scoped>
  .current {
    @apply px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700;
  }
</style>
