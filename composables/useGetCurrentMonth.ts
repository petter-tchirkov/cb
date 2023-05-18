import { useNow, useDateFormat } from '@vueuse/core'

export const useGetCurrentMonth = () => {
  const getLastDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate()
  }

  const firstDayOfCurrentMonth = `${useDateFormat(useNow(), 'YYYY-MM').value
    }-01`
  const lastDayOfCurrentMonth = `${useDateFormat(useNow(), 'YYYY-MM').value
    }-${getLastDayOfMonth(
      +useDateFormat(useNow(), 'YYYY').value,
      +useDateFormat(useNow(), 'MM').value
    )}`

  return { firstDayOfCurrentMonth, lastDayOfCurrentMonth }
}
