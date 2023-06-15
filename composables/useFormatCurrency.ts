export const useFormatCurrency = (value: string | number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
}
