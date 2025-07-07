<script setup>
import { ref } from 'vue'
const dialog = ref(false)

const props = defineProps({
    todo: Object,
    method: Function,
})
</script>
<template>
    <v-dialog v-model="dialog" class="max-w-xl" :attach="null">
        <template #activator="{ props: activatorProps }">
            <slot name="activator" :props="activatorProps">
                <button v-bind="activatorProps">
                    <div
                        class="flex gap-2 items-center text-white bg-red-500 hover:bg-opacity-90 rounded-lg px-3 py-1"
                    >
                        <i class="fa-solid fa-trash"></i>
                        <p>Delete</p>
                    </div>
                </button>
            </slot>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full"
            >
                <div
                    class="flex border-b dark:!border-typography-2 items-center justify-between px-3 pt-1 !pb-3"
                >
                    <p class="text-lg dark:!text-white">Edit Subject</p>
                    <button @click="isActive.value = false">
                        <i class="fa-solid fa-x dark:!text-white"></i>
                    </button>
                </div>
                <div class="!px-3 !pt-3">
                    <form @submit.prevent="submit">
                        <div class="!space-y-3">
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Subject</label
                                >
                                <input
                                    type="text"
                                    @input="method(todo.subject, todo.id)"
                                    v-model="todo.subject"
                                    placeholder="Masukkan Subject"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
