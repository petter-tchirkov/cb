<template>
  <div class="inline-flex -space-x-px">
    <div
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
      @click="$emit('previousPage')"
    >
      Назад
    </div>
    <div
      v-if="currentPage >= 5"
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="$emit('update', 1)"
    >
      1
    </div>
    <span
      v-if="currentPage >= 5"
      class="flex items-center mx-2 text-3xl text-gray-500"
      >&nbsp;...&nbsp;</span
    >
    <div
      v-for="page in pageRange"
      :key="page"
      class="flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-700 w-11"
      :class="{ current: currentPage === page }"
      @click="$emit('update', page)"
    >
      {{ page }}
    </div>
    <span
      v-if="currentPage < totalPages - 5"
      class="flex items-center mx-2 text-3xl text-gray-500"
      >&nbsp;...&nbsp;</span
    >
    <div
      v-if="currentPage !== totalPages && currentPage !== totalPages - 1"
      class="flex items-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="$emit('update', totalPages)"
    >
      {{ totalPages }}
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

  const totalPagesArray = ref(
    Array.from({ length: props.totalPages }, (_, i) => i + 1)
  )

  const pageRange = computed(() => {
    if (props.currentPage < 5) {
      return 5
    } else {
      return totalPagesArray.value.slice(
        props.currentPage - 3,
        props.currentPage + 2
      )
    }
  })
</script>

<style scoped>
  .current {
    @apply px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700;
  }
</style>
