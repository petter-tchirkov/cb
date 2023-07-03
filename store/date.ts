import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', () => {
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()
  const chosenDates = ref([firstDayOfCurrentMonth, lastDayOfCurrentMonth])
  const chosenDatesSerialized = computed(() => {
    return chosenDates.value.map((i) => {
      return useDateFormat(i, 'YYYY-MM-DD').value
    })
  })

  return { chosenDates, chosenDatesSerialized }
})
