<template>
    <section class="w-full">
        <!-- <Header>
            <template #pageTitle> Витрати </template>
        </Header> -->
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
                :items="costs"
                :headers="headers">
                <ui-table-row v-for="row in costs">
                    <ui-table-column>{{ row.date }}</ui-table-column>
                    <ui-table-column>{{ row.bot_uri }}</ui-table-column>
                    <ui-table-column>{{ row.bot_name }}</ui-table-column>
                    <ui-table-column>{{ row.country }}</ui-table-column>
                    <ui-table-column>{{ row.rate_type }}</ui-table-column>
                    <ui-table-column>{{ row.rate }}</ui-table-column>
                    <ui-table-column>{{ row.attempts }}</ui-table-column>
                    <ui-table-column>{{ row.sent }}</ui-table-column>
                    <ui-table-column>{{ row.delivered }}</ui-table-column>
                    <ui-table-column>{{ row.billed }}</ui-table-column>
                    <ui-table-column>{{ row.charged }}</ui-table-column>
                </ui-table-row>
            </ui-table>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useCostsStore } from '~/store/costs'
definePageMeta({
    middleware:[ 'login', 'auth']
})
const costsStore = useCostsStore()
await costsStore.getCosts(3,1)
await refreshNuxtData()
const costs = costsStore.costs.data







const searchBotName = ref<string>('')
const searchCountry = ref<string>('')

//bot, country and date filters
const startDate = ref('1970-01-01')
const dueDate = ref('2050-01-01')


// const chargesSum = computed(() => {
//     const charges: number[] = []
//     filteredCosts.value.map((item) => {
//         charges.push(item.charged)
//     })
//     return (
//         Math.round(charges.reduce((partialSum, a) => partialSum + a, 0) * 100) /
//         100
//     )
// })

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
