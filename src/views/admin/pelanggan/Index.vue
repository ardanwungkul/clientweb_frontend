<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { ref, onMounted, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import EditNameserver from '@/components/dialog/admin/nameserver/EditNameserver.vue'
import TambahPelanggan from '@/components/dialog/admin/pelanggan/TambahPelanggan.vue'
import { usePelangganStore } from '@/stores/pelanggan'

const pelangganStore = usePelangganStore()
const nameservers = ref([])

const headers = [
    { title: 'No', key: 'no' },
    { title: 'Nama', key: 'nameserver1' },
    { title: 'No Hp', key: 'nameserver2' },
    { title: 'Total Domain', key: 'total_domain' },
    { title: '', key: 'action', sortable: false },
]

onMounted(async () => {
    await pelangganStore.getData()
    fetchData()
})

const fetchData = async () => {
    nameservers.value = pelangganStore.datas
}

const addData = async (form) => {
    await pelangganStore.addData(form)
}
const editData = async (form, id) => {
    await pelangganStore.editData(form, id)
}

const editStatus = async (status, id) => {
    const form = ref({
        status_ns: status,
    })

    editData(form.value, id)
}

const deleteData = async (id) => {
    await pelangganStore.deleteData(id)
}

watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AuthenticatedLayout>
        <!-- Tabel data -->
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg"
        >
            <div class="mb-4">
                <TambahPelanggan :method="addData" />
            </div>
            <v-data-table
                :headers="headers"
                :items="nameservers"
                hide-default-footer
                :header-props="{
                    class: 'dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-white border-b dark:!border-white/30 ',
                }"
                class="border dark:!border-typography-2/20 !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1 !overflow-hidden"
            >
                <template #[`item.status_ns`]="{ item }">
                    <select
                        v-model="item.status_ns"
                        @change="editStatus(item.status_ns, item.id)"
                        class="!border dark:border-typography-2 rounded-lg px-3 py-1 !bg-dark-primary-1 !appearance-auto"
                    >
                        <option :selected="item.status_ns == true" :value="1">Aktif</option>
                        <option :selected="item.status_ns == false" :value="0">Tidak Aktif</option>
                    </select>
                </template>
                <template #[`item.actions`]="{ item }">
                    <div class="d-flex align-center gap-2">
                        <EditNameserver :nameserver="item" :method="editData"></EditNameserver>

                        <ConfirmDelete :type="'Nameserver'" :id="item.id" :method="deleteData">
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
