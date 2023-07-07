<template>
  <div class="p-5">
    <DataTable v-model:filters="filters" :value="doc.documents" filter-display="row" scrollable scroll-height="700px">
      <Column header="Тип" filter-field="type" :show-filter-menu="false">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" :options="[0, 1]" placeholder="Тип" class="p-column-filter"
            :show-clear="true" @change="filterCallback()">
            <template #option="slotProps">
              {{ slotProps.option === 0 ? 'Invoice' : 'Act' }}
            </template>
          </Dropdown>
        </template>

        <template #body="{ data }">
          <Tag :value="data.type === 0 ? 'Invoice' : 'Act'" />
        </template>
      </Column>

      <Column header="Період" :show-filter-menu="false" sortable removable-sort sort-field="startDate">
        <template #body="slotProps">
          {{ useDateFormat(slotProps.data.startDate, 'YYYY-MM-DD').value }} -
          {{ useDateFormat(slotProps.data.endDate, 'YYYY-MM-DD').value }}
        </template>
      </Column>
      <Column field="sumInvoice" header="Сума" />
      <Column field="status" header="Статус">
        <template #body="{ data }">
          <Tag class="cursor-pointer" :value="data.status == 0 ? 'НЕПІДПИСАНО' : 'ПІДПИСАНО'"
            :severity="data.status == 0 ? 'danger' : 'success'" />
        </template>
      </Column>
      <Column field="number" header="Номер документа" />
      <Column header="Посилання">
        <template #body="{ data }">
          <NuxtLink :to="data.link" class="rounded-full p-2 hover:bg-gray-100">
            <Icon name="material-symbols:export-notes-rounded" />
          </NuxtLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api'
import { useDocumentStore } from '~/store/documents'

const doc = useDocumentStore()

await doc.fetchDocuments('Users')

const filters = ref({
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})
</script>

<style scoped></style>
