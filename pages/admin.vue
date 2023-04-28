<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Адміністрування </template>
    </HeaderLite>
    <ui-file-upload label="Імпорт операцій" format=".csv" path="/Admin/upload-file" />
    <ui-file-upload label="Верифікація ботів" format=".csv" path="/Admin/upload-file-verif-bots" />
    <ui-file-upload label="Клієнти та рейти" format=".csv" path="/Admin/upload-file-clients-rates" />
    <div class="p-5">
      <Tabs :items="tabs" :selected-tab="selectedTab" @change="(item) => (selectedTab = item)">
        <admin-rates-table v-if="selectedTab === 'Рейти'" />
        <admin-bots-table v-if="selectedTab === 'Боти'" />
      </Tabs>
    </div>
    <ui-toast />
    <ui-modal :is-modal-visible="!areRateUpdatesSaved">
      <template #modalBody>
        <span>Є незбережені дані, продовжити?</span>
      </template>
    </ui-modal>
  </section>
</template>

<script lang="ts" setup>
import { useAdminStore } from '~/store/admin'

definePageMeta({
  middleware: ['login', 'auth'],
})
const tabs = ['Рейти', 'Боти']
const selectedTab = ref('Рейти')
const areRateUpdatesSaved = !useAdminStore().updatedRates.length
</script>

<style lang="scss" scoped></style>
