<template>
  <div class="overflow-hidden rounded-b-lg bg-white pt-4 shadow-md">
    <div
      class="mb-5 flex flex-wrap items-end justify-between gap-3 bg-white px-4 lg:justify-start lg:gap-5"
    >
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
      <ui-button
        class="h-11"
        label="Застосувати"
        @click="updateCostsTable"
      />
    </div>
    <div class="hidden max-h-[480px] overflow-auto lg:block">
      <ui-table
        :items="useAdminStore().botsCosts"
        :headers="['Клієнт', 'Бот', 'Витрачено']"
      >
        <ui-table-row
          v-for="(item, index) in useAdminStore().botsCosts"
          :key="index"
        >
          <ui-table-column>{{ item.client }}</ui-table-column>
          <ui-table-column class="hover:font-bold">
            <NuxtLink
              :to="{
                path: `/admin/${item.botId}`,
                query: { startDate, endDate },
              }"
              >{{ item.botURI }}</NuxtLink
            >
          </ui-table-column>
          <ui-table-column>{{ item.charged }}</ui-table-column>
        </ui-table-row>
      </ui-table>
    </div>
    <ui-toast />
    <div
      class="grid h-[60vh] w-full grid-cols-1 gap-4 overflow-auto lg:hidden lg:h-auto"
    >
      <div
        v-for="(item, index) in useAdminStore().botsCosts"
        :key="index"
        class="flex justify-between gap-3 rounded-lg bg-white p-4 shadow"
      >
        <div class="flex flex-col">
          <span class="font-bold text-blue-600">{{ item.botURI }}</span>
          <span>{{ item.client }}</span>
        </div>
        <div class="font-bold">{{ item.charged }} €</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNotification } from '@kyvg/vue3-notification'
  import { useAdminStore } from '~/store/admin'

  const { notify } = useNotification()
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const startDate = ref(firstDayOfCurrentMonth)
  const endDate = ref(lastDayOfCurrentMonth)

  await useAdminStore().getBotsCosts(
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth
  )

  const updateCostsTable = () => {
    useAdminStore().getBotsCosts(startDate.value, endDate.value)
    notify({
      text: 'Успішно оновлено',
      type: 'success',
    })
  }
</script>

<style scoped></style>
