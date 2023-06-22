import { useNow, useDateFormat } from '@vueuse/core'

export const useGetCurrentMonth = () => {
  const getLastDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate()
  }

  const date = new Date()

  const firstDayOfCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  )
  const lastDayOfCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  )

  return { firstDayOfCurrentMonth, lastDayOfCurrentMonth }
}
