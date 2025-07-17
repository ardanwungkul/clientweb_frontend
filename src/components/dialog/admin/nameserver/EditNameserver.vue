<script setup>
import { ref } from 'vue'

const props = defineProps({
    method: Function,
    nameserver: Object,
})

const form = ref({
    nameserver1: props.nameserver.nameserver1,
    nameserver2: props.nameserver.nameserver2,
    tanggal_ns: props.nameserver.tanggal_ns,
})
async function submit() {
    try {
        await props.method(form.value, props.nameserver.id)
    } catch (error) {}
}
</script>
<template>
    <v-dialog class="max-w-xl" :attach="null">
        <template v-slot:activator="{ props: activatorProps }">
            <button
                v-bind="activatorProps"
                class="flex gap-2 items-center text-white !bg-blue-500 hover:bg-opacity-90 rounded-lg px-3 py-1"
            >
                <i class="fa-solid fa-pen-to-square"></i>
                <p>Edit</p>
            </button>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full"
            >
                <div
                    class="flex border-b dark:!border-typography-2 items-center justify-between px-3 pt-1 !pb-3"
                >
                    <p class="text-lg dark:!text-white">Edit Nameserver</p>
                    <button @click="isActive.value = false">
                        <i class="fa-solid fa-x dark:!text-white"></i>
                    </button>
                </div>
                <div class="!px-3 !pt-3">
                    <form @submit.prevent="submit">
                        <div class="!space-y-3">
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Nameserver 1</label
                                >
                                <input
                                    type="text"
                                    v-model="form.nameserver1"
                                    placeholder="Masukkan Nameserver 1"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                                />
                            </div>
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Nameserver 2</label
                                >
                                <input
                                    type="text"
                                    v-model="form.nameserver2"
                                    placeholder="Masukkan Nameserver 2"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                                />
                            </div>
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Tanggal Nameserver</label
                                >
                                <input
                                    type="date"
                                    v-model="form.tanggal_ns"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                                />
                            </div>

                            <div class="flex justify-end">
                                <button
                                    type="submit"
                                    class="!bg-green-200 px-5 py-1 !text-sm !text-green-800 !font-medium border !border-green-800 rounded-lg"
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
