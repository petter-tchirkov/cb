<template>
  <div>
    <div class="mb-3 flex items-end gap-5">
      <ui-datepicker
        v-model="startDate"
        label="Дата"
      />
      <ui-datepicker
        v-model="endDate"
        label="Дата"
      />
      <ui-button
        class="h-11"
        label="Пошук по даті"
        @click="useAdminStore().getBotsCosts(startDate, endDate)"
      />
    </div>
    <ui-table
      class="h-[550px] overflow-auto"
      :items="useAdminStore().botsCosts"
      :headers="['Клієнт', 'Бот', 'Знято']"
    >
      <ui-table-row
        v-for="item in useAdminStore().botsCosts"
        :key="item.client"
      >
        <ui-table-column>{{ item.client }}</ui-table-column>
        <ui-table-column>{{ item.botURI }}</ui-table-column>
        <ui-table-column>{{ item.charged }}</ui-table-column>
      </ui-table-row>
    </ui-table>
  </div>
</template>

<script setup lang="ts">
  import { useAdminStore } from '~/store/admin'

  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const startDate = ref(firstDayOfCurrentMonth)
  const endDate = ref(lastDayOfCurrentMonth)

  await useAdminStore().getBotsCosts(startDate.value, endDate.value)
</script>

<style scoped></style>
