<template>
    <XyzTransition
        xyz="fade ease"
        :duration="200">
        <div
            v-if="isModalVisible"
            class="fixed top-0 bg-gray-50 bg-opacity-10 left-0 z-10 w-full h-full backdrop-blur-[5px] p-5 flex items-center justify-center">
            <div
                class="max-w-lg bg-white rounded-lg shadow min-w-fit"
                ref="modal">
                <div class="flex items-start justify-between p-4 rounded-t">
                    <h3 class="text-xl font-semibold">
                        <slot name="modalHeading" />
                    </h3>
                </div>
                <div class="p-4 space-y-6">
                    <slot name="modalBody" />
                </div>
                <div
                    class="flex items-center p-6 space-x-2 border-gray-200 rounded-b">
                    <slot name="modalFooter" />
                </div>
            </div>
        </div>
    </XyzTransition>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const emits = defineEmits<{ (e: 'modalClose'): void }>()
defineProps<{ isModalVisible: boolean }>()
const modal = ref(null)
const closeModal = () => {
    emits('modalClose')
}
onClickOutside(modal, () => {
    emits('modalClose')
})
</script>

<style lang="scss" scoped>
.modal {
}
</style>
