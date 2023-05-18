<template>
  <section>
    <header-lite>
      <template #pageTitle>Дезопити</template>
    </header-lite>
    <div class="h-[80vh] overflow-auto p-4 lg:p-5">
      <ui-table
        :items="clientsDeposits"
        :headers="['Договір', 'Клієнт', 'Депозит']"
      >
        <ui-table-row
          v-for="item in clientsDeposits"
          :key="item.name"
        >
          <ui-table-column>{{ item.contractNumber || '-' }}</ui-table-column>
          <ui-table-column>{{ item.name || '-' }}</ui-table-column>
          <ui-table-column>
            <ui-input
              v-model.number="item.deposit"
              light
              type="text"
              number
              class="grow"
              @input="initUpdatedDeposits(item.id, item.deposit)"
            />
          </ui-table-column>
        </ui-table-row>
      </ui-table>
    </div>
    <div class="p-4 lg:p-5">
      <ui-button
        label="Оновити"
        @click="
          useDepositsStore().updateDeposits(useDepositsStore().updatedDeposits)
        "
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core'
  import { useDepositsStore } from '~/store/deposits'
  import { IClientDeposit } from '~/types/client-deposit'

  await useDepositsStore().getClientsDeposits()

  definePageMeta({
    middleware: ['login', 'auth'],
  })

  interface IDeposit {
    id: number
    deposit: number
  }

  const clientsDeposits: IClientDeposit[] = useDepositsStore().clientsDeposits

  const initUpdatedDeposits = useDebounceFn((id: number, deposit: number) => {
    const newDeposit: IDeposit = { id, deposit }
    if (
      !useDepositsStore().updatedDeposits.some(
        (item: IDeposit) => item.id === newDeposit.id
      )
    ) {
      console.log(newDeposit)
      useDepositsStore().updatedDeposits.push(newDeposit)
    }
  })
</script>

<style scoped></style>
