<template>
  <section>
    <HeaderLite class="mb-4">
      <template #pageTitle> Адміністрування </template>
    </HeaderLite>
    <div
      class="mb-4 hidden justify-between rounded-lg bg-white px-4 shadow-sm lg:flex"
    >
      <ui-file-upload
        label="Імпорт операцій"
        format=".csv"
        path="/Admin/upload-file"
      />
      <ui-file-upload
        label="Верифікація ботів"
        format=".csv"
        path="/Admin/upload-file-verif-bots"
      />
      <ui-file-upload
        label="Клієнти та рейти"
        format=".csv"
        path="/Admin/upload-file-clients-rates"
      />
    </div>
    <TabView
      class="px-4"
      :active-index="parseInt(route.query.activeIndex) || 0"
    >
      <TabPanel header="Рейти">
        <admin-rates-table />
      </TabPanel>
      <TabPanel header="Боти">
        <admin-bots-table />
      </TabPanel>
      <TabPanel header="Витрати">
        <admin-costs-table />
      </TabPanel>
    </TabView>
    <ui-toast />
  </section>
</template>

<script lang="ts" setup>
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  const route = useRoute()

  definePageMeta({
    middleware: ['login', 'auth'],
  })
</script>

<style lang="scss" scoped></style>
