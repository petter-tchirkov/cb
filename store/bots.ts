import { defineStore } from 'pinia'
import { IBot } from '~/types/bot'

export const useBotsStore = defineStore('bots', () => {
  const botsHeaders: string[] = [
    'botName',
    'free',
    'inSessionNonBillableBot',
    'inSessionForBillableBot',
    'outOfSessionFreeMessageNonBillableBot',
    'outOfSessionFreeMessageForBillableBot',
    'outOfSessionBilledMessages',
  ]
  const bots: IBot[] = [
    {
      botName: 'kiryusha',
      free: 0,
      inSessionNonBillableBot: 0,
      inSessionForBillableBot: 2,
      outOfSessionFreeMessageNonBillableBot: 12,
      outOfSessionFreeMessageForBillableBot: 42,
      outOfSessionBilledMessages: 0,
    },
    {
      botName: 'ilyusha',
      free: 0,
      inSessionNonBillableBot: 0,
      inSessionForBillableBot: 2,
      outOfSessionFreeMessageNonBillableBot: 12,
      outOfSessionFreeMessageForBillableBot: 42,
      outOfSessionBilledMessages: 0,
    },
    {
      botName: 'tanyusha',
      free: 0,
      inSessionNonBillableBot: 0,
      inSessionForBillableBot: 2,
      outOfSessionFreeMessageNonBillableBot: 12,
      outOfSessionFreeMessageForBillableBot: 42,
      outOfSessionBilledMessages: 0,
    },
    {
      botName: 'petrusha',
      free: 0,
      inSessionNonBillableBot: 0,
      inSessionForBillableBot: 2,
      outOfSessionFreeMessageNonBillableBot: 12,
      outOfSessionFreeMessageForBillableBot: 42,
      outOfSessionBilledMessages: 0,
    },
    {
      botName: 'vanyusha',
      free: 0,
      inSessionNonBillableBot: 0,
      inSessionForBillableBot: 2,
      outOfSessionFreeMessageNonBillableBot: 12,
      outOfSessionFreeMessageForBillableBot: 42,
      outOfSessionBilledMessages: 0,
    },
  ]

  return { bots, botsHeaders }
})
