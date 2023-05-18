<template>
  <div>
    <ui-table
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

  await useAdminStore().getBotsCosts(
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth
  )
</script>

<style scoped></style>
