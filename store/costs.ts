import { defineStore } from 'pinia'
import { useDateFormat } from '@vueuse/core'

export const useCostsStore = defineStore('costs', () => {
    const formatter = ref('YYYY-MM-DD')
    const costs = ref([
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'ilyusha',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'kiryusha',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'vladyusha',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'anyusha',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'petrusha',
            country: 'Estonia',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'vasyusha',
            country: 'Denmark',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'tanyusha',
            country: 'Australia',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'kesha',
            country: 'Belgium',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'pasha',
            country: 'Canada',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'misha',
            country: 'France',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'gosha',
            country: 'Georgia',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'ksusha',
            country: 'Haiti',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'masha',
            country: 'Ireland',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'sasha',
            country: 'Jamaica',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'gesha',
            country: 'Luxemburg',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'arkasha',
            country: 'Malta',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'tosha',
            country: 'Netherlands',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'lesha',
            country: 'Oman',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'andrusha',
            country: 'Poland',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'oksasha',
            country: 'Qatar',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'nastyusha',
            country: 'Romania',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'danyusha',
            country: 'South Korea',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'aisha',
            country: 'Turkey',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'vanyusha',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'lyubasha',
            country: 'Vietnam',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Wales',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Yemen',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Zambia',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'recordati (BOT)',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
        {
            date: useDateFormat(
                Math.floor(Math.random() * Date.now()),
                formatter
            ).value,
            botURI: 'recordati',
            botName: 'random bot',
            country: 'Ukraine',
            rateType: 'OUT OF SESSION',
            rate: '0,01850',
            attempts: 161,
            sent: 116,
            delivered: 113,
            billed: 113,
            charged: 2.0905,
        },
    ] as Record<string, any>[])

    return { costs }
})
