<template>
  <div class="inline-flex max-w-full -space-x-px">
    <div
      class="ml-0 hidden items-center rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:flex"
      @click="$emit('update', 1)"
    >
      <Icon name="material-symbols:keyboard-double-arrow-left" />
    </div>
    <div
      v-if="currentPage !== 1"
      class="ml-0 hidden items-center border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:flex"
      @click="$emit('previousPage')"
    >
      <Icon name="material-symbols:keyboard-arrow-left" />
    </div>
    <div
      v-for="page in pageRange"
      :key="page"
      class="ml-0 flex cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      :class="{ current: currentPage === page }"
      @click="$emit('update', page)"
    >
      {{ page }}
    </div>
    <div
      v-if="currentPage < totalPages"
      class="ml-0 hidden items-center border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:flex"
      @click="$emit('nextPage')"
    >
      <Icon name="material-symbols:keyboard-arrow-right" />
    </div>
    <div
      class="ml-0 hidden items-center rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:flex"
      @click="$emit('update', totalPages)"
    >
      <Icon name="material-symbols:keyboard-double-arrow-right" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCostsStore } from '~/store/costs'

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

  const totalPagesArray = ref(
    Array.from({ length: props.totalPages }, (_, i) => i + 1)
  )

  const pageRange = computed(() => {
    if (useCostsStore().pages < 5) {
      return useCostsStore().pages
    }
    if (props.currentPage < 5) {
      return 5
    } else {
      return totalPagesArray.value.slice(
        props.currentPage - 5,
        props.currentPage + 5
      )
    }
  })
</script>

<style scoped>
  .current {
    @apply border border-gray-300 bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700;
  }
</style>
