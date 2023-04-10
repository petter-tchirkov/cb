<template>
    <section class="w-full">
        <Header>
            <template #pageTitle> Налаштування </template>
        </Header>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'login'
})
</script>

<style lang="scss" scoped></style>
