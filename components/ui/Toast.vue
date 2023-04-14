<template>
  <notifications classes="toast">
    <template #body="props">
      <div class="fixed flex items-center w-full max-w-xs gap-3 p-4 text-gray-500 bg-white rounded-lg shadow top-4 right-4">
        <Icon name="bxs:error-circle" class="w-8 h-8 text-red-400" v-if="props.item.type === 'error'"/>
        <Icon name="bxs:check-circle" class="w-8 h-8 text-green-400" v-if="props.item.type === 'success'"/>
        <div>
        <p class="ml-3 text-sm font-normal">{{props.item.text}}</p>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>