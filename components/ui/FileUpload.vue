<template>
  <div class="p-4 lg:p-5">
    <label>{{ label }}</label>
    <div class="flex gap-3 mb-2">
      <ui-button
        label="Оберіть файли"
        color="light"
        size="xs"
        @click="open()"
      >
        <template #prependIcon>
          <Icon name="solar:upload-minimalistic-bold" />
        </template>
      </ui-button>
      <ui-button
        size="xs"
        color="light"
        :disabled="!files"
        @click="reset()"
      >
        <template #prependIcon> <Icon name="ic:round-close" /></template>
      </ui-button>
      <ui-button
        size="xs"
        :disabled="!files"
        @click="uploadFile"
      >
        <template #prependIcon> <Icon name="lucide:send" /> </template>
      </ui-button>
    </div>
    <li
      v-for="file of files"
      :key="file.name"
    >
      {{ file.name }}
    </li>
  </div>
</template>

<script setup lang="ts">
  import { useFileDialog } from '@vueuse/core'
  import { useAdminStore } from '~/store/admin'

  const props = defineProps<{
    label: string
    format: string
    path: string
  }>()

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

  const { files, open, reset } = useFileDialog()
</script>

<style lang="scss" scoped></style>
