<template>
  <div class="p-5">
    <label>{{ label }}</label>
    <div class="flex gap-3 mb-2">
      <ui-button
        label="Оберіть файли"
        @click="open()"
      />
      <ui-button
        label="Віміна"
        color="light"
        :disabled="!files"
        @click="reset()"
      />
      <ui-button
        label="Завантажити"
        :disabled="!files"
        @click="uploadFile"
      />
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

    useAdminStore().importFile(props.path, formData)
  }

  const { files, open, reset } = useFileDialog()
</script>

<style lang="scss" scoped></style>
