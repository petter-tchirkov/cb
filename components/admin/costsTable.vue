<template>
  <div class="relative bg-white">
    <div
      class="mb-5 flex flex-wrap items-end justify-between gap-3 bg-white px-4 lg:justify-start lg:gap-5"
    >
      <!-- <ui-datepicker -->
      <!--   v-model="startDate" -->
      <!--   label="З" -->
      <!--   class="grow" -->
      <!-- /> -->
      <!-- <ui-datepicker -->
      <!--   v-model="endDate" -->
      <!--   label="По" -->
      <!--   class="grow" -->
      <!-- /> -->
      <ui-datepicker v-model="startDate" />
      <ui-datepicker v-model="endDate" />

      <Button
        label="Застосувати"
        @click="updateCostsTable"
      />
    </div>
    <DataTable
      v-model:filters="filters"
      :value="useAdminStore().botsCosts"
      class="p-datatable-lg"
      filter-display="row"
      paginator
      :rows="5"
    >
      <Column
        field="client"
        header="Клієнт"
      />
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
              query: { startDate, endDate },
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

  const route = useRoute()
  const { notify } = useNotification()
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = useGetCurrentMonth()

  const startDate = ref(route.query.startDate || firstDayOfCurrentMonth)
  const endDate = ref(route.query.endDate || lastDayOfCurrentMonth)

  await useAdminStore().getBotsCosts(startDate, endDate)

  const updateCostsTable = () => {
    useAdminStore().getBotsCosts(startDate.value, endDate.value)
    notify({
      text: 'Успішно оновлено',
      type: 'success',
    })
  }
  const filters = ref({
    botURI: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
</script>

<style scoped></style>
