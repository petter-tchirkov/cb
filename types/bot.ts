export interface IBot {
  botName: string
  free: number
  inSessionNonBillableBot: number
  inSessionForBillableBot: number
  outOfSessionFreeMessageNonBillableBot: number
  outOfSessionFreeMessageForBillableBot: number
  outOfSessionBilledMessages: number
}
