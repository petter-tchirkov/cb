<template>
  <section>
    <HeaderLite class="mb-4">
      <template #pageTitle> Документи </template>
    </HeaderLite>
    <div class="p-5">
      <DataTable
        v-model:filters="filters"
        :value="doc.documents"
        filter-display="row"
      >
        <Column
          header="Період"
          :show-filter-menu="false"
          filter-field="startDate"
        >
          <template #body="slotProps">
            {{ useDateFormat(slotProps.data.startDate, 'YYYY-MM-DD').value }} -
            {{ useDateFormat(slotProps.data.endDate, 'YYYY-MM-DD').value }}
          </template>
          <template #filter="{}">
            <InputText
              v-model="filters['startDate'].value"
              placeholder="Пошук по даті"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="sumInvoice"
          header="Сумма"
        />
        <Column
          field="status"
          header="Статус"
        >
          <template #body="{ data }">
            <Tag
              :value="data.status == 0 ? 'Не підписано' : 'Підписано'"
              :severity="data.status == 0 ? 'danger' : 'success'"
            />
          </template>
        </Column>
        <Column
          header="Тип"
          filter-field="type"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              :options="['Invoice', 'Act']"
              placeholder="Тип"
              class="p-column-filter"
              style="min-width: 12rem"
              :show-clear="true"
              @change="filterCallback()"
            >
            </Dropdown>
          </template>

          <template #body="{ data }">
            <Tag :value="data.type" />
          </template>
        </Column>
        <Column
          header="Номер"
          field="number"
        />
      </DataTable>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core'
  import { FilterMatchMode } from 'primevue/api'
  import { useDocumentStore } from '~/store/documents'

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  const doc = useDocumentStore()

  await doc.fetchDocuments()

  const filters = ref({
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })
</script>

<style scoped></style>
