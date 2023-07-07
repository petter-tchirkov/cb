<template>
  <div class="relative bg-white">
    <div
      class="mb-5 flex flex-wrap items-end justify-between gap-3 bg-white px-4 lg:justify-start lg:gap-5"
    ></div>
    <DataTable
      v-model:filters="filters"
      :value="useAdminStore().botsCosts"
      class="p-datatable-lg"
      filter-display="row"
      scrollable
      scroll-height="50vh"
    >
      <template #header>
        <div class="flex gap-3">
          <Calendar
            v-model="useDateStore().chosenDates"
            selection-mode="range"
            date-format="yy-mm-dd"
            show-icon
            @update:model-value="updateCostsTable"
          />
          <Button
            label="Застосувати"
            @click="updateCostsTable"
          />
        </div>
      </template>
      <Column
        field="client"
        header="Клієнт"
        filter-field="client"
        :show-filter-menu="false"
      >
        <template #filter="{}">
          <InputText
            v-model="filters['client'].value"
            placeholder="Пошук по клієнту"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        header="URI Бота"
        field="botURI"
        filter-field="botURI"
        :show-filter-menu="false"
      >
        <template #filter="{}">
          <InputText
            v-model="filters['botURI'].value"
            placeholder="Пошук по боту"
            class="p-column-filter"
          />
        </template>

        <template #body="slotProps">
          <NuxtLink
            class="hover:text-black"
            :to="{
              path: `/admin/${slotProps.data.botId}`,
            }"
            >{{ slotProps.data.botURI }}</NuxtLink
          >
        </template>
      </Column>
      <Column
        field="charged"
        header="Витрачено"
      >
        <template #body="slotProps">
          {{ useFormatCurrency(slotProps.data.charged) }}
        </template>
      </Column>
    </DataTable>
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
  import { FilterMatchMode } from 'primevue/api'
  import { useAdminStore } from '~/store/admin'
  import { useDateStore } from '~/store/date'

  const { notify } = useNotification()

  await useAdminStore().getBotsCosts(useDateStore().chosenDatesSerialized)

  const updateCostsTable = () => {
    if (useDateStore().chosenDates[1] !== null) {
      useAdminStore().getBotsCosts(useDateStore().chosenDatesSerialized)
      notify({
        text: 'Успішно оновлено',
        type: 'success',
      })
    }
  }
  const filters = ref({
    botURI: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    client: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
</script>

<style scoped></style>
