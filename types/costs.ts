export interface ICosts {
  id: number,
  page: number,
  per_page?: number,
  bot_name?: string,
  country?: string,
  date_from?: string,
  date_to?: string,
  show_all?: boolean
}