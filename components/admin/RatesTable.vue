<template>
  <ui-table
    :items="items"
    :headers="headers"
  >
    <ui-table-row
      v-for="(item, index) in items"
      :key="index"
    >
      <ui-table-column>{{ item.partner }}</ui-table-column>
      <ui-table-column>{{ item.date }}</ui-table-column>
      <ui-table-column>{{ item.botID }}</ui-table-column>
      <ui-table-column>{{ item.botURI }}</ui-table-column>
      <ui-table-column>{{ item.botName }}</ui-table-column>
      <ui-table-column>{{ item.country }}</ui-table-column>
      <ui-table-column>{{ item.rateType }}</ui-table-column>
      <ui-table-column>
        <ui-input
          v-model="item.rate"
          light
          type="text"
        />
      </ui-table-column>
      <ui-table-column>{{ item.attempts }}</ui-table-column>
      <ui-table-column>{{ item.sent }}</ui-table-column>
      <ui-table-column>{{ item.delivered }}</ui-table-column>
      <ui-table-column>{{ item.billed }}</ui-table-column>
      <ui-table-column>{{ item.charged }}</ui-table-column>
    </ui-table-row>
  </ui-table>
</template>

<script setup lang="ts">
  const headers = [
    'Partner',
    'Date',
    'Bot ID',
    'Bot URI',
    'Bot Name',
    'Country',
    'Rate Type',
    'Rate',
    'Attempts',
    'Sent',
    'Delivered',
    'Billed',
    'Charged',
  ]
  const items = [
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
    {
      partner: 'smsbat',
      date: '2020-02-23',
      botID: 100000720,
      botURI: 'zotek',
      botName: 'zotek (BOT)',
      country: 'Israel',
      rateType: 'OUT OF SESSION',
      rate: '0.01190',
      attempts: 1,
      sent: 1,
      delivered: 1,
      billed: 1,
      charged: 1,
    },
  ]
</script>

<style scoped></style>
