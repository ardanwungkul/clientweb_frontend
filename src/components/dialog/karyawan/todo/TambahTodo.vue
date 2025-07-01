<script setup>
import { ref } from 'vue'

const props = defineProps({
    method: Function,
})

const form = ref({
    subject: null,
    catatan: null,
})
async function submit() {
    try {
        await props.method(form.value)
        form.value.subject = null
        form.value.catatan = null
    } catch (error) {}
}
</script>
<template>
    <v-dialog class="max-w-xl" attach="false">
        <template v-slot:activator="{ props: activatorProps }">
            <button v-bind="activatorProps">
                <i class="fa-solid fa-plus"></i>
            </button>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full"
            >
                <div
                    class="flex border-b dark:!border-typography-2 items-center justify-between px-3 pt-1 !pb-3"
                >
                    <p class="text-lg dark:!text-white">Tambah Task</p>
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
                                    v-model="form.subject"
                                    placeholder="Masukkan Subject"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white"
                                />
                            </div>
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Catatan</label
                                >
                                <v-textarea
                                    placeholder="Masukkan Catatan"
                                    required="true"
                                    v-model="form.catatan"
                                    auto-grow="true"
                                    class="w-full border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white"
                                ></v-textarea>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    type="submit"
                                    class="!bg-green-200 px-5 py-1 text-sm !text-green-800 !font-semibold border !border-green-800 rounded-lg"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
