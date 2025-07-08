<script setup>
import { ref, watch } from 'vue'
import { useResponseStore } from './stores/response'
import { useUIStore } from './stores/ui'

const ui = useUIStore()
const responseStore = useResponseStore()
const messages = ref([])

watch(
    () => responseStore.errors,
    (errors) => {
        if (errors.length > 0) {
            errors.forEach((msg) => {
                messages.value.push({
                    text: msg,
                    color: 'error',
                })
            })
            responseStore.clearErrors()
        }
    },
)
watch(
    () => responseStore.success,
    (success) => {
        if (success.length > 0) {
            success.forEach((msg) => {
                messages.value.push({
                    text: msg,
                    color: 'success',
                })
            })
            responseStore.clearSuccess()
        }
    },
)
</script>

<template>
    <div>
        <v-progress-linear
            indeterminate
            class="!bg-yellow-500 !fixed !top-0 z-[1000000]"
            height="2"
            v-if="ui.isLoading"
        ></v-progress-linear>
        <v-snackbar-queue v-model="messages" timeout="2000"></v-snackbar-queue>
        <div>
            <RouterView />
        </div>
    </div>
</template>
