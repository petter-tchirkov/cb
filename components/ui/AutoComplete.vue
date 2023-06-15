<template>
  <div class="relative h-full w-full">
    <input
      class="h-[50px] w-full rounded-md border border-zinc-300 bg-transparent p-3"
      type="text"
      placeholder="-"
      :value="modelValue"
      @input="
        useDebounceFn(
          $emit('update:modelValue', ($event.target as Event).value),
          (isSearchStarted = true)
        )
      "
    />
    <ul
      v-if="isSearchStarted"
      class="absolute top-full z-10 w-full rounded-b-lg bg-white shadow"
    >
      <li
        v-for="item in search"
        :key="item.id"
        class="block px-4 py-2 hover:bg-gray-100"
        @click="selectItem(item)"
      >
        {{ item.fullName }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core'
  const isSearchStarted = ref(false)

  const props = defineProps<{
    modelValue: string
    id?: number
    items: Record<string, any>[]
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'update:id', value: number): void
  }>()

  const search = computed(() => {
    if (props.modelValue === '') {
      return []
    }

    isSearchStarted.value = true

    let matches = 0

    return props.items.filter((item) => {
      if (
        item.fullName.toLowerCase().includes(props.modelValue.toLowerCase()) &&
        matches < 10
      ) {
        matches++
        return item
      }
    })
  })

  const selectItem = (item: Record<string, any>) => {
    emit('update:modelValue', item.fullName)
    emit('update:id', item.id)
    isSearchStarted.value = false
  }
</script>

<style scoped></style>
