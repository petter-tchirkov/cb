<template>
  <section>
    <header-lite class="mb-4">
      <template #pageTitle>Дезопити</template>
    </header-lite>
    <div class="px-4">
      <DataTable :value="clientsDeposits" class="mb-5 rounded-xl">
        <Column field="contractNumber" header="Договір"></Column>
        <Column field="name" header="Клієнт"></Column>
        <Column header="Депозит">
          <template #body="slotProps">
            <InputNumber v-model="slotProps.data.deposit" :max-fraction-digits="2" input-id="currency-germany"
              mode="currency" currency="EUR" locale="de-DE" @update:model-value="initUpdatedDeposits(slotProps.data)" />
          </template>
        </Column>
        <template #footer>
          <Button label="Оновити" @click="
            useDepositsStore().updateDeposits(
              useDepositsStore().updatedDeposits
            )
            " />
        </template>
      </DataTable>
    </div>
    <!-- <div class="mb-4 px-4"> -->
    <!--   <div class="lg:bg-white lg:shadow-md"> -->
    <!--     <div> -->
    <!--       <ui-table -->
    <!--         class="h-[80vh] overflow-auto" -->
    <!--         :items="clientsDeposits" -->
    <!--         :headers="['Договір', 'Клієнт', 'Депозит']" -->
    <!--       > -->
    <!--         <ui-table-row -->
    <!--           v-for="item in clientsDeposits" -->
    <!--           :key="item.name" -->
    <!--         > -->
    <!--           <ui-table-column>{{ -->
    <!--             item.contractNumber || '-' -->
    <!--           }}</ui-table-column> -->
    <!--           <ui-table-column>{{ item.name || '-' }}</ui-table-column> -->
    <!--           <ui-table-column> -->
    <!--             <ui-input -->
    <!--               v-model.number="item.deposit" -->
    <!--               light -->
    <!--               type="text" -->
    <!--               number -->
    <!--               class="grow" -->
    <!--               @update:model-value="initUpdatedDeposits(item)" -->
    <!--             /> -->
    <!--           </ui-table-column> -->
    <!--         </ui-table-row> -->
    <!--       </ui-table> -->
    <!--     </div> -->
    <!--     <ui-toast /> -->
    <div class="grid w-full grid-cols-1 gap-4 py-4 lg:hidden">
      <div v-for="(item, index) in clientsDeposits" :key="index"
        class="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
        <div class="flex flex-col">
          <span class="font-bold text-blue-600">{{
            item.contractNumber || '-'
          }}</span>
          <span>{{ item.name || '-' }}</span>
        </div>
        <ui-input v-model.number="item.deposit" light type="text" number direction="rtl"
          @update:model-value="initUpdatedDeposits(item)" />
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="px-4 pb-4 lg:pb-0"> -->

    <!-- </div> -->
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

const initUpdatedDeposits = useDebounceFn((item) => {
  if (
    !useDepositsStore().updatedDeposits.some(
      (deposit: IDeposit) => item.id === deposit.id
    )
  ) {
    useDepositsStore().updatedDeposits.push(item)
  }
})
</script>

<style scoped></style>
