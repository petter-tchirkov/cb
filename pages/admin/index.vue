<template>
  <section>
    <HeaderLite class="mb-4">
      <template #pageTitle> Адміністрування </template>
    </HeaderLite>
    <div class="px-5">
      <div class="shadow-md">
        <div
          class="mb-4 hidden justify-between rounded-lg bg-white px-4 text-black shadow-sm lg:flex"
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
      </div>
      <div class="shadow-lg">
        <TabView
          class="px-4"
          :active-index="parseInt(route.query.activeIndex as string) || 0"
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
      </div>
    </div>
    <ui-toast />
  </section>
</template>

<script lang="ts" setup>
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import { useAdminStore } from '~/store/admin'
  const route = useRoute()

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('file', (files.value as FileList)[0])

    if (props.path === '/Admin/upload-file-clients-rates') {
      useAdminStore().fetchRates(props.path, formData)
    }

    if (props.path === '/Admin/upload-file-verif-bots') {
      useAdminStore().fetchBots(props.path, formData)
    }

    if (props.path === '/Admin/upload-file') {
      useAdminStore().importFile(props.path, formData)
    }
  }
</script>

<style lang="scss" scoped></style>
