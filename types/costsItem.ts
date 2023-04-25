export interface ICostsItem {
  attempts: number
  billed: number
  bot_name: string
  bot_uri: string
  charged: number
  country: number
  date: string
  delivered: number
  rate: Record<string, any>
  rate_type: string
  sent: number
}
