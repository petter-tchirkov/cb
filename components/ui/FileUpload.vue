<template>
  <div class="p-5">
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
  import { notify } from '@kyvg/vue3-notification'
  import { useFileDialog } from '@vueuse/core'
  import { useAuthStore } from '~/store/auth'

  const url = useRuntimeConfig().public.baseURL
  const token = useAuthStore().token
  const props = defineProps<{
    label: string
    format: string
    path: string
  }>()

  const { files, open, reset } = useFileDialog()
  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', (files.value as FileList)[0])

    await useFetch(url + props.path, {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
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

<style lang="scss" scoped></style>
