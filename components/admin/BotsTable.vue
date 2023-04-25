<template>
  <ui-table
    :items="items"
    :headers="headers"
  >
    <ui-table-row
      v-for="(item, index) in items"
      :key="index"
    >
      <ui-table-column>{{ item.client }}</ui-table-column>
      <ui-table-column>{{ item.accord }}</ui-table-column>
      <ui-table-column>{{ item.botName }}</ui-table-column>
      <ui-table-column>{{ item.isVerified }}</ui-table-column>
    </ui-table-row>
  </ui-table>
</template>

<script setup lang="ts">
  const headers = ['Клієнт', 'Договір', 'Бот', 'Верифіковано']
  const items = [
    {
      client: 'smsbat',
      accord: '102566А/23',
      botName: 'liktravy_ukraine',
      isVerified: true,
    },
    {
      client: 'smsbat',
      accord: '102566А/23',
      botName: 'liktravy_ukraine',
      isVerified: true,
    },
    {
      client: 'smsbat',
      accord: '102566А/23',
      botName: 'liktravy_ukraine',
      isVerified: true,
    },
    {
      client: 'smsbat',
      accord: '102566А/23',
      botName: 'liktravy_ukraine',
      isVerified: true,
    },
    {
      client: 'smsbat',
      accord: '102566А/23',
      botName: 'liktravy_ukraine',
      isVerified: true,
    },
  ]
</script>

<style scoped></style>
