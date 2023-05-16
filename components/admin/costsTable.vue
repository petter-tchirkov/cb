<template>
  <div></div>
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
