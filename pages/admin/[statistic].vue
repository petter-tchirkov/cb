<template>
  <section>
    <header-lite>
      <template #pageTitle>
        <NuxtLink
          :to="{
            path: '/admin',
            query: { activeIndex: 2, startDate: startDate, endDate: endDate },
          }"
        >
          <Icon
            class="cursor-pointer"
            name="ic:baseline-arrow-back" /></NuxtLink
        >{{ getBotUri[0].botURI }}</template
      >
    </header-lite>
    <div class="p-4 lg:px-5">
      <div class="mb-5 flex items-end gap-3">
        <ui-datepicker
          v-model="startDate"
          label="З"
          class="grow"
        />
        <ui-datepicker
          v-model="endDate"
          label="По"
          class="grow"
        />
        <Button
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
      <div class="">
        <DataTable
          class="p-datatable-sm"
          :value="useAdminStore().botStatistic"
          paginator
          :rows="15"
          filter-display="row"
          sort-mode="multiple"
          removable-sort
        >
          <Column
            field="date"
            header="Дата"
            sortable
          />
          <Column
            field="country"
            header="Країна"
          />
          <Column
            field="rate"
            header="Рейт"
          />
          <Column
            field="rate_type"
            header="Тип рейту"
          >
            <template #body="slotProps">
              <div class="flex w-full justify-center">
                <Tag
                  :severity="
                    getRateTypeColors(slotProps.data.rateType.toString())
                  "
                  :value="slotProps.data.rateType"
                />
              </div>
            </template>
          </Column>
          <Column
            field="attempts"
            header="Спроби"
          />
          <Column
            field="sent"
            header="Відправлено"
          />
          <Column
            field="delivered"
            header="Доставлено"
          />
          <Column
            field="billed"
            header="Сплачено"
          />
          <Column
            field="charged"
            header="Знято"
            sortable
          />
        </DataTable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const route = useRoute()
  const router = useRouter()
  const startDate = ref(route.query.startDate || firstDayOfCurrentMonth)
  const endDate = ref(
    route.query.endDate || useDateFormat(useNow(), 'YYYY-MM-DD')
  )

  await useAdminStore().getBotStatistic(
    route.params.statistic as string,
    startDate,
    endDate
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
        return 'danger'
      case 'SESSION':
        return 'success'
      case 'WELCOME':
        return 'warning'
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
</script>

<style scoped></style>
