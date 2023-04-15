<template>
  <section class="w-full">
    <HeaderLite>
      <template #pageTitle> Налаштування </template>
    </HeaderLite>
  </section>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['login', 'auth'],
  })
</script>

<style lang="scss" scoped></style>
