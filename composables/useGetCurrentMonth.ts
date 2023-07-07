import { useNow, useDateFormat } from '@vueuse/core'

export const useGetCurrentMonth = () => {
  const getLastDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate()
  }

  const date = new Date()

  const firstDaySerialized = `${useDateFormat(useNow(), 'YYYY-MM').value}-01`
  const lastDaySerialized = `${useDateFormat(useNow(), 'YYYY-MM').value
    }-${getLastDayOfMonth(
      +useDateFormat(useNow(), 'YYYY').value,
      +useDateFormat(useNow(), 'MM').value
    )}`

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

  const firstDayOfLastMonth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  )

  return {
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth,
    firstDaySerialized,
    lastDaySerialized,
    firstDayOfLastMonth,
  }
}
