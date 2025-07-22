<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { ref, onMounted, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import TambahPelanggan from '@/components/dialog/admin/pelanggan/TambahPelanggan.vue'
import EditPelanggan from '@/components/dialog/admin/pelanggan/EditPelanggan.vue'
import { usePelangganStore } from '@/stores/pelanggan'

const pelangganStore = usePelangganStore()
const pelanggans = ref([])

const headers = [
    { title: 'No', key: 'no' },
    { title: '', key: 'image' },
    { title: 'Nama Pelanggan', key: 'nama_pelanggan' },
    { title: 'No HP', key: 'no_hp' },
    { title: 'Alamat', key: 'alamat' },
    { title: 'Aksi', key: 'actions', sortable: false },

]

onMounted(async () => {
    await pelangganStore.getData()
    fetchData()
})

const fetchData = async () => {
    pelanggans.value = pelangganStore.datas
}

const addData = async (form) => {
    await pelangganStore.addData(form)
    fetchData()
}
const editData = async (form, id) => {
    await pelangganStore.editData(form, id)
    fetchData()
}

const deleteData = async (id) => {
    await pelangganStore.deleteData(id)
    fetchData()
}

watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AuthenticatedLayout>

        <div class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg">
            <div class="mb-4">
                <TambahPelanggan :method="addData" />
            </div>
            <v-data-table
                :headers="headers"
                :items="pelanggans"
                hide-default-footer
                :header-props="{
                    class: 'dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-white border-b dark:!border-white/30 ',
                }"
                class="border dark:!border-typography-2/20 !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1 !overflow-hidden"
            >
                
                <template #[`item.no`]="{ index }">
                    {{ index + 1 }}
                </template>

                
                

                
                <template #[`item.actions`]="{ item }">
                    <div class="d-flex align-center gap-2">
                        <EditPelanggan :pelanggan="item" :method="editData" />
                        <ConfirmDelete :type="'Pelanggan'" :id="item.id" :method="deleteData">
                            <template #activator="{ props }">
                                <button v-bind="props">
                                    <div
                                        class="flex gap-2 items-center text-white bg-red-500 hover:bg-opacity-90 rounded-lg px-3 py-1"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                        <p>Delete</p>
                                    </div>
                                </button>
                            </template>
                        </ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
        </div>
    </AuthenticatedLayout>
</template>
