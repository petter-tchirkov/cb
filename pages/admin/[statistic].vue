<template>
  <section>
    <header-lite>
      <template #pageTitle>{{ getBotUri[0].botURI }}</template>
    </header-lite>
    <div class="p-4 lg:px-5">
      <div class="mb-5 flex items-end gap-3">
        <ui-datepicker
          v-model="route.query.startDate"
          label="З"
          class="grow"
        />
        <ui-datepicker
          v-model="route.query.endDate"
          label="По"
          class="grow"
        />
        <ui-button
          label="Застосувати"
          @click="
            useAdminStore().getBotStatistic(
              route.params.statistic as string,
              startDate,
              endDate
            )
          "
        />
      </div>
      <div class="h-[80vh] overflow-auto">
        <ui-table
          :items="useAdminStore().botStatistic"
          :headers="headers"
        >
          <ui-table-row
            v-for="(row, index) in useAdminStore().botStatistic as IBotStatistic[]"
            :key="index"
          >
            <ui-table-column>{{ row.country }}</ui-table-column>
            <ui-table-column>{{ row.rate || '-' }}</ui-table-column>
            <ui-table-column
              class="text-center font-bold"
              :class="getRateTypeColors(row.rateType)"
              >{{ row.rateType || '-' }}</ui-table-column
            >
            <ui-table-column>{{ row.attempts }}</ui-table-column>
            <ui-table-column>{{ row.sent }}</ui-table-column>
            <ui-table-column>{{ row.delivered }}</ui-table-column>
            <ui-table-column>{{ row.billed }}</ui-table-column>
            <ui-table-column>{{ row.charged }}</ui-table-column>
          </ui-table-row>
        </ui-table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const route = useRoute()
  await useAdminStore().getBotStatistic(
    route.params.statistic as string,
    route.query.startDate,
    route.query.endDate
  )

  const getBotUri = computed(() => {
    if (useAdminStore().bots.length) {
      return useAdminStore().bots.filter((item) => {
        return item.botId.toString() === route.params.statistic
      })
    } else {
      return useAdminStore().botsCosts.filter((item) => {
        return item.botId.toString() === route.params.statistic
      })
    }
  })

  const getRateTypeColors = (rateType: string) => {
    switch (rateType) {
      case 'OUT OF SESSION':
        return 'text-red-400'
      case 'SESSION':
        return 'text-green-400'
      case 'WELCOME':
        return 'text-yellow-400'
    }
  }

  definePageMeta({
    middleware: ['login', 'auth'],
  })
  const headers = [
    'COUNTRY',
    'RATE',
    'RATE TYPE',
    'ATTEMPTS',
    'SENT',
    'DELIVERED',
    'BILLED',
    'CHARGED',
  ]

  const startDate = ref(firstDayOfCurrentMonth)
  const endDate = ref(useDateFormat(useNow(), 'YYYY-MM-DD'))
</script>

<style scoped></style>
