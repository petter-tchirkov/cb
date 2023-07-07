<template>
  <section>
    <HeaderLite class="mb-4">
      <template #pageTitle> Документи </template>
    </HeaderLite>
    <div class="p-5">
      <div class="shadow-md">
        <documents-admin-table v-if="useAuthStore().user?.user_role === 'ADMIN'" />
        <documents-user-table v-else />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { useDocumentStore } from '~/store/documents'

await useDocumentStore().fetchTypes()
await useDocumentStore().fetchStatuses()

definePageMeta({
  middleware: ['login', 'auth'],
})
</script>

<style scoped></style>
