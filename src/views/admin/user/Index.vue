<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref, watchEffect } from 'vue'
import TambahUser from '@/components/dialog/admin/user/TambahUser.vue'
import EditUser from '@/components/dialog/admin/user/EditUser.vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'

const userStore = useUserStore()
const users = ref([])

const headers = ref([
    { title: 'Nama', value: 'name' },
    { title: 'Email', value: 'email' },
    { title: 'Role', value: 'role', align: 'center' },
    { title: 'Aksi', value: 'action', align: 'center', sortable: false }, 
])

onMounted(async () => {
    await userStore.getData()
    fetchData()
})
async function fetchData() {
    users.value = userStore.datas
}
async function addUser(form) {
    await userStore.addData(form)
}
async function editUser(form, id) {
    await userStore.updateData(form, id)
}
async function deleteUser(id) {
    await userStore.deleteData(id)
}

watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AuthenticatedLayout>
        <div class="!space-y-3">
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg"
            >
                <div class="flex justify-between">
                    <TambahUser :method="addUser" />
                </div>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    hide-default-footer
                    :header-props="{
                        class: 'dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-white border-b dark:!border-white/30 ',
                    }"
                    class="border dark:!border-typography-2/20 !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1 !overflow-hidden"
                >
                    <template v-slot:[`item.name`]="{ item }">
                        <p class="capitalize">{{ item.name }}</p>
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                        <p class="capitalize text-center">{{ item.role }}</p>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <div class="flex gap-2 items-center justify-center">
                            <EditUser :user="item" :method="editUser" />
                            <ConfirmDelete
                                v-if="item.role !== 'admin'"
                                :type="'User'"
                                :id="item.id"
                                :method="deleteUser"
                            />
                        </div>
                    </template>
                </v-data-table>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
