<template>
    <section class="w-full">
        <Header>
            <template #pageTitle> Витрати </template>
        </Header>
        <div class="flex flex-col items-center p-5">
            <div class="flex items-center gap-10">
                <ui-input
                    class="grow"
                    label="Пошук по боту"
                    type="text"
                    v-model="filterParams.name_bot">
                    <template #icon>
                        <Icon name="ant-design:search-outlined" />
                    </template>
                </ui-input>
                <ui-input
                    class="grow"
                    label="Пошук по країні"
                    type="text"
                    v-model="filterParams.country">
                    <template #icon>
                        <Icon name="ant-design:search-outlined" />
                    </template>
                </ui-input>
                <div class="flex gap-5">
                    <ui-datepicker
                        v-model="filterParams.date_from"
                        label="Дата" />
                    <ui-datepicker
                        v-model="filterParams.date_to"
                        label="Дата" />
                </div>
                <ui-button label="Відфільтрувати" @click="filterData" class="mt-[9px]"/>
            </div>
            <ui-table
                :items="costsStore.costs"
                :headers="headers">
                <ui-table-row v-for="row in costsStore.costs">
                    <ui-table-column>{{ row.date }}</ui-table-column>
                    <ui-table-column>{{ row.bot_uri }}</ui-table-column>
                    <ui-table-column>{{ row.name_bot }}</ui-table-column>
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
            <p class="mt-5">Всього стягнуто: <span class="text-xl font-bold">{{ chargesSum }}</span></p>
            <ui-table-pagination :current-page="filterParams.page" :per-page="filterParams.per_page"  :total-pages="costsStore.pages" @next-page="nextPage" @previous-page="previousPage" @update="(page) => goToPage(page)"/>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useCostsStore } from '~/store/costs'
import { useAuthStore } from '~/store/auth';
import { ICosts } from '~/types/costs';
definePageMeta({
    middleware:[ 'login', 'auth']
})

const user: number = useAuthStore().user?.user_id!
const costsStore = useCostsStore() as any


const filterParams: ICosts = reactive({
    id: user,
    page: 1,
    per_page: 10,
    name_bot: '',
    country: '',
    date_from: '',
    date_to: ''
})

const filterData = async () => {
    await costsStore.getCosts(filterParams)
}


const nextPage = async () => {
    filterParams.page++
    await filterData()
}
const previousPage = async () => {
    filterParams.page--
    await filterData()
}
const goToPage = async (page: number) => {
    filterParams.page = page
    await filterData()
}



await costsStore.getCosts(filterParams)

const chargesSum = computed(() => {
    const charges: number[] = []
    costsStore.costs.map((item: any) => {
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
