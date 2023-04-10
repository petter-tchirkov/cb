<template>
    <section class="w-full">
        <Header>
            <template #pageTitle> Витрати </template>
        </Header>
        <div class="p-5">
            <div class="flex items-center gap-10">
                <ui-input
                    class="grow"
                    label="Пошук по боту"
                    type="text"
                    v-model="searchBotName">
                    <template #icon>
                        <Icon name="ant-design:search-outlined" />
                    </template>
                </ui-input>
                <ui-input
                    class="grow"
                    label="Пошук по країні"
                    type="text"
                    v-model="searchCountry">
                    <template #icon>
                        <Icon name="ant-design:search-outlined" />
                    </template>
                </ui-input>
                <div class="flex gap-5">
                    <ui-datepicker
                        v-model="startDate"
                        label="Дата" />
                    <ui-datepicker
                        v-model="dueDate"
                        label="Дата" />
                </div>
            </div>
            <ui-table
                :items="filteredCosts"
                :headers="headers">
                <ui-table-row v-for="row in filteredCosts">
                    <ui-table-column>{{ row.date }}</ui-table-column>
                    <ui-table-column>{{ row.botURI }}</ui-table-column>
                    <ui-table-column>{{ row.botName }}</ui-table-column>
                    <ui-table-column>{{ row.country }}</ui-table-column>
                    <ui-table-column>{{ row.rateType }}</ui-table-column>
                    <ui-table-column>{{ row.rate }}</ui-table-column>
                    <ui-table-column>{{ row.attempts }}</ui-table-column>
                    <ui-table-column>{{ row.sent }}</ui-table-column>
                    <ui-table-column>{{ row.delivered }}</ui-table-column>
                    <ui-table-column>{{ row.billed }}</ui-table-column>
                    <ui-table-column>{{ row.charged }}</ui-table-column>
                </ui-table-row>
            </ui-table>
            <p
                class="p-10 text-sm text-center text-gray-500"
                v-if="!filteredCosts.length"
                >Немає елементів, що відповідають заданим критеріям</p
            >
            <div class="flex mt-10">
                Усього виставлено: &nbsp;
                <span class="font-bold">{{ chargesSum }}</span>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useCostsStore } from '~/store/costs'
import { useArrayFilter } from '@vueuse/core'

definePageMeta({
    middleware: 'login'
})

const costsStore = useCostsStore()

const searchBotName = ref<string>('')
const searchCountry = ref<string>('')

//bot, country and date filters
const startDate = ref('1970-01-01')
const dueDate = ref('2050-01-01')
const filteredCosts = useArrayFilter(
    costsStore.costs,
    (item) =>
        item.botName.toLowerCase().includes(searchBotName.value) &&
        item.country.toLowerCase().includes(searchCountry.value) &&
        item.date >= startDate.value &&
        item.date <= dueDate.value
)

const chargesSum = computed(() => {
    const charges: number[] = []
    filteredCosts.value.map((item) => {
        charges.push(item.charged)
    })
    return (
        Math.round(charges.reduce((partialSum, a) => partialSum + a, 0) * 100) /
        100
    )
})

const headers = [
    'DATE',
    'BOT URI',
    'BOT NAME',
    'COUNTRY',
    'RATE TYPE',
    'RATE',
    'ATTEMPTS',
    'SENT',
    'DELIVERED',
    'BILLED',
    'CHARGED',
]
</script>

<style lang="scss" scoped></style>
