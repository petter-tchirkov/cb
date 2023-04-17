<template>
  <section>
    <HeaderLite>
      <template #pageTitle> Адміністрування </template>
    </HeaderLite>
    <ui-file-upload
      label="Завантажити CSV"
      format=".csv"
      path="/Users/upload-file"
    />
  </section>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['login', 'auth'],
  })
</script>

<style lang="scss" scoped></style>
