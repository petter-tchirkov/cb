import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', () => {
  const date = new Date()

  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()
  const chosenDates = ref([firstDayOfCurrentMonth, lastDayOfCurrentMonth])
  const chosenDatesSerialized = computed(() => {
    return chosenDates.value.map((i) => {
      return useDateFormat(i, 'YYYY-MM-DD').value
    })
  })

  const docDates = ref([
    new Date(date.getFullYear(), date.getMonth() - 1, 1),
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
  ])
  const docDatesSerialized = computed(() => {
    return docDates.value.map((i) => {
      return useDateFormat(i, 'YYYY-MM-DD').value
    })
  })

  return { chosenDates, chosenDatesSerialized, docDates, docDatesSerialized }
})
