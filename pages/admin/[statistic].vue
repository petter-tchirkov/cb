<template>
  <section>
    <header-lite>
      <template #pageTitle>
        <NuxtLink
          :to="{
            path: '/admin',
            query: { activeIndex: 2 },
          }"
        >
          <Icon
            class="cursor-pointer"
            name="ic:baseline-arrow-back"
          /> </NuxtLink
        >{{ getBotUri[0].botURI }}
      </template>
    </header-lite>
    <div class="p-4 lg:px-5">
      <div class="mb-5 flex items-end gap-3">
        <Calendar
          v-model="useDateStore().chosenDates"
          selection-mode="range"
          date-format="yy-mm-dd"
          show-icon
        />
        <Button
          label="Застосувати"
          @click="
            useAdminStore().getBotStatistic(
              route.params.statistic as string,
              useDateStore().chosenDatesSerialized
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
            header="DATE"
            sortable
          />
          <Column
            field="country"
            header="COUNTRY"
          />
          <Column
            field="rate"
            header="RATE"
          />
          <Column
            field="rate_type"
            header="TYPE"
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
            header="ATTEMPTS"
          />
          <Column
            field="sent"
            header="SENT"
          />
          <Column
            field="delivered"
            header="DELIVERED"
          />
          <Column
            field="billed"
            header="BILLED"
          />
          <Column
            field="charged"
            header="CHARGED"
            sortable
          />
        </DataTable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'
  import { useDateStore } from '~/store/date'

  const route = useRoute()

  await useAdminStore().getBotStatistic(
    route.params.statistic as string,
    useDateStore().chosenDatesSerialized
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
</script>

<style scoped></style>
