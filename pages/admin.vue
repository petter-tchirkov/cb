<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Адміністрування </template>
    </HeaderLite>
    <ui-file-upload
      label="Імпорт операцій"
      format=".csv"
      path="/Users/upload-file"
    />
    <ui-file-upload
      label="Клієнти та боти"
      format=".csv"
      path="/Users/upload-file"
    />
    <ui-file-upload
      label="Клієнти та рейти"
      format=".csv"
      path="/Users/upload-file"
    />
    <div class="p-5">
      <admin-rates-table />
    </div>
    <ui-toast />
  </section>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['login', 'auth'],
  })
</script>

<style lang="scss" scoped></style>
