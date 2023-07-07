<template>
  <div class="p-5">
    <DataTable
      v-model:filters="filters"
      :value="doc.documents"
      filter-display="row"
      scrollable
      scroll-height="700px"
    >
      <Column
        header="Період"
        :show-filter-menu="false"
        sortable
        removable-sort
        sort-field="startDate"
      >
        <template #body="slotProps">
          {{ useDateFormat(slotProps.data.startDate, 'YYYY-MM-DD').value }} -
          {{ useDateFormat(slotProps.data.endDate, 'YYYY-MM-DD').value }}
        </template>
        <template #filter="{}">
          <Calendar
            v-model="useDateStore().docDates"
            selection-mode="range"
            date-format="yy-mm-dd"
            show-icon
            @update:model-value="doc.fetchDocuments"
          />
        </template>
      </Column>
      <Column
        field="sumInvoice"
        header="Сумма"
      >
        <template #body="{ data }">
          <InputNumber
            v-model="data.sumInvoice"
            :max-fraction-digits="4"
            :use-grouping="false"
            class="p-inputtext-sm"
          />
        </template>
      </Column>
      <Column
        field="status"
        header="Статус"
      >
        <template #body="{ data }">
          <Tag
            class="cursor-pointer"
            :value="data.status == 0 ? 'НЕПІДПИСАНО' : 'ПІДПИСАНО'"
            :severity="data.status == 0 ? 'danger' : 'success'"
            @click="data.status = 1 - data.status"
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
            :options="[0, 1]"
            placeholder="Тип"
            class="p-column-filter"
            :show-clear="true"
            @change="filterCallback()"
          >
            <template #option="slotProps">
              {{ slotProps.option === 0 ? 'Invoice' : 'Act' }}
            </template>
          </Dropdown>
        </template>

        <template #body="{ data }">
          <Tag :value="data.type === 0 ? 'Invoice' : 'Act'" />
        </template>
      </Column>
      <Column
        header="Номер"
        field="number"
      />
      <Column header="Посилання">
        <template #body="{ data }">
          <NuxtLink
            :to="data.link"
            class="rounded-full p-2 hover:bg-gray-100"
          >
            <Icon name="material-symbols:export-notes-rounded" />
          </NuxtLink>
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <Icon
            name="material-symbols:delete-outline-rounded"
            class="h-6 w-6 cursor-pointer hover:text-red-500"
            @click="doc.removeDocument(data.id)"
          />
        </template>
      </Column>
      <template #footer>
        <div class="flex gap-3">
          <Button
            label="Оновити дані"
            @click="doc.updateDocuments"
          />
          <Button
            label="Додати документ"
            @click="isAddingDocument = true"
          />
          <Button
            label="Зв'язати документи"
            @click="isConnectingDocuments = true"
          />
        </div>
      </template>
    </DataTable>
    <Dialog
      v-model:visible="isAddingDocument"
      modal
      header="Додавання документа"
    >
      <div class="flex flex-col gap-3">
        <InputNumber
          v-model="newDoc.number"
          :use-grouping="false"
          placeholder="Номер документа"
        />
        <Dropdown
          v-model="newDoc.type"
          :options="doc.types"
          option-label="name"
          placeholder="Тип"
        >
          <template #option="{ option }">
            <span @click="newDoc.type = option.code"> {{ option.name }}</span>
          </template>
        </Dropdown>
        <Calendar
          v-model="useDateStore().chosenDates"
          date-format="yy-mm-dd"
          selection-mode="range"
        />
        <Dropdown
          v-model="newDoc.user"
          :options="doc.users"
          option-label="fullName"
          placeholder="Користувач"
        />
        <InputNumber
          v-model="newDoc.sumInvoice"
          placeholder="Сума"
        />
        <Dropdown
          v-model="newDoc.bot"
          placeholder="Бот"
          :options="newDoc.user.bots"
          :empty-message="
            newDoc.user.length
              ? 'Боти не знайдені'
              : 'Будь ласка, оберіть користувача'
          "
          option-label="botName"
        />
        <Dropdown
          v-model="newDoc.status"
          placeholder="Статус"
          :options="doc.statuses"
          option-label="name"
        >
        </Dropdown>
        <FileUpload
          ref="docFile"
          accept=".pdf"
          mode="basic"
          url="http://10.0.98.105/Admin/document/upload"
          custom-upload
          @uploader="uploadDocument"
        />
        <Button
          label="Відправити"
          @click="uploadDocument"
        />
      </div>
    </Dialog>
    <Dialog
      v-model:visible="isConnectingDocuments"
      modal
      header="Зв'язування документів"
    >
      <div class="mb-5 flex justify-between gap-3">
        <Dropdown
          v-model="doc.connectedDocs.first"
          placeholder="Act"
          :options="doc.acts"
          option-label="name"
        ></Dropdown>
        <Dropdown
          v-model="doc.connectedDocs.second"
          placeholder="Invoice"
          :options="doc.invoices"
          option-label="name"
        ></Dropdown>
      </div>
      <Button
        class="w-full"
        label="Зв'язати"
        @click="doc.connectDocuments"
      />
    </Dialog>
    <ui-toast />
  </div>
</template>

<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core'
  import { FilterMatchMode } from 'primevue/api'
  import { useNotification } from '@kyvg/vue3-notification'
  import { useAuthStore } from '~/store/auth'
  import { useDateStore } from '~/store/date'
  import { useDocumentStore } from '~/store/documents'

  const url = useRuntimeConfig().public.baseURL
  const doc = useDocumentStore()
  const isAddingDocument = ref(false)
  const isConnectingDocuments = ref(false)
  const { notify } = useNotification()

  await doc.fetchDocuments('Admin')
  await useDocumentStore().fetchUsers()

  const filters = ref({
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  })

  const newDoc = ref({
    number: '',
    type: '',
    sumInvoice: '',
    user: '',
    bot: '',
    status: '',
    period: [],
  })

  const docFile = ref()

  const uploadDocument = async () => {
    const formData = new FormData()
    formData.append('number', newDoc.value.number)
    formData.append('type', newDoc.value.type.code)
    formData.append('sumInvoice', newDoc.value.sumInvoice)
    formData.append('user', newDoc.value.user.id)
    formData.append('startDate', useDateStore().chosenDatesSerialized[0])
    formData.append('endDate', useDateStore().chosenDatesSerialized[1])
    if (newDoc.value.bot !== '') {
      formData.append('bot', newDoc.value.bot.id)
    }
    formData.append('status', newDoc.value.status.code)
    formData.append('file', docFile.value.files[0])

    await useFetch(`${url}/Admin/document/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: formData,
      onResponse({ response }) {
        console.log(response)
        notify({
          text: 'Успішно завантажено',
          type: 'success',
        })
      },
    })
  }
</script>

<style scoped></style>
