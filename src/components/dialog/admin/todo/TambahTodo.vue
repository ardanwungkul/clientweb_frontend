<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'

const selectUser = ref(null)
const props = defineProps({
    method: Function,
    users: Array,
})

const form = ref({
    subject: null,
    catatan: null,
    user_id: null,
})
async function submit() {
    try {
        await props.method(form.value)
        form.value.subject = null
        form.value.catatan = null
        form.value.user_id = null
    } catch (error) {}
}

async function onSelectUser() {
    form.value.user_id = selectUser.value.id
}
</script>
<template>
    <v-dialog class="max-w-xl" :attach="null">
        <template v-slot:activator="{ props: activatorProps }">
            <button
                v-bind="activatorProps"
                class="!text-sm hover:!bg-gray-100 dark:hover:!bg-dark-primary-2 rounded-lg !py-2 !px-3 w-full flex gap-2 items-center"
            >
                <i class="fa-solid fa-plus"></i>
                <p>Buat Task</p>
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
                                    >User</label
                                >
                                <Multiselect
                                    @remove="form.user_id = null"
                                    v-model="selectUser"
                                    track-by="id"
                                    :label="'name'"
                                    :options="users"
                                    @select="onSelectUser"
                                    placeholder="Pilih User"
                                />
                            </div>
                            <div>
                                <label class="block mb-1 text-start dark:!text-white text-sm"
                                    >Subject</label
                                >
                                <input
                                    type="text"
                                    v-model="form.subject"
                                    placeholder="Masukkan Subject"
                                    required
                                    class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
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
                                    class="w-full border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
/* Styling untuk vue-multiselect - menggunakan deep selector */
::v-deep(.multiselect__input) {
    font-size: 14px;
    background-color: transparent;
    margin-bottom: 0 !important;
    color: white;
}

::v-deep(.multiselect__option) {
    font-size: 14px;
    background-color: #2c2c3a;
    color: white;
}

::v-deep(.multiselect__tags) {
    background-color: #1d1d29 !important;
    border-color: #7b7b7b;
    border-radius: 8px;
    height: 38px !important;
    color: white;
}

::v-deep(.multiselect__single) {
    font-size: 14px !important;
    background-color: transparent;
    color: white;
    margin-bottom: 0 !important;
}

::v-deep(.multiselect__option--highlight) {
    font-size: 14px !important;
    background-color: #3a3a4f;
    color: #fff;
}

/* Styling untuk Vuetify v-textarea */
::v-deep(.v-field__input) {
    font-size: 14px;
    color: white;
}

/* Styling tambahan untuk input manual (non-component) */
input[type='text'] {
    font-size: 14px;
    background-color: transparent;
    color: white;
}
</style>
