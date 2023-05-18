<template>
  <section>
    <header-lite>
      <template #pageTitle>{{ route.params.statistic }}</template>
    </header-lite>
    <div class="p-4 lg:px-5">
      <ui-button
        label="Обрати дати"
        @click="datePickersShown = true"
      />
      <ui-modal :is-modal-visible="datePickersShown">
        <template #modalHeading>Показати проміжок</template>
        <template #modalBody>
          <div class="flex gap-3">
            <ui-datepicker
              v-model="startDate"
              label="З"
            />
            <ui-datepicker
              v-model="endDate"
              label="По"
            />
          </div>
        </template>
        <template #modalFooter>
          <div class="flex gap-3">
            <ui-button
              label="Застосувати"
              color="success"
              @click="
                useAdminStore().getBotStatistic(
                  route.params.statistic as string,
                  startDate,
                  endDate
                ),
                  (datePickersShown = false)
              "
            />
            <ui-button
              label="Відміна"
              color="light"
              @click="datePickersShown = false"
            />
          </div>
        </template>
      </ui-modal>
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
  </section>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const route = useRoute()
  await useAdminStore().getBotStatistic(
    route.params.statistic as string,
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth
  )

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
  const datePickersShown = ref(false)
</script>

<style scoped></style>
