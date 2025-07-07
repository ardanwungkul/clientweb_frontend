<script setup>
import TodoTabs from '@/components/dialog/admin/todo/TodoTabs.vue'
import TodoChart from '@/components/dialog/admin/todo/TodoChart.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useTodoStore } from '@/stores/todo'

const userStore = useUserStore()
const todoStore = useTodoStore()
const users = ref([])
const todos = ref([])

const filterUser = ref()
const filterUserCategory = ref('semua')
const filteredUser = computed(() => {
    const role = filterUserCategory.value
    return role && role !== 'semua' ? users.value.filter((user) => user.role === role) : users.value
})

const selectUser = async () => {
    const whereNot = [{ status: 'deleted' }]
    const orderBy = [{ order: 'asc' }]

    await todoStore.getDataByUserId(filterUser.value.id, whereNot, orderBy)

    todos.value = todoStore.datas
}

onMounted(async () => {
    const whereNot = [{ role: 'admin' }]
    await userStore.getData(whereNot)

    users.value = userStore.datas
})

const items = ref([])
const headers = [
    {
        title: 'Nama User',
        value: 'user',
    },
]
</script>
<template>
    <AuthenticatedLayout>
        <div class="!space-y-3">
            <!-- <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg"
            >
                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                    :header-props="{
                        class: 'dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-white border-b dark:!border-white/30 ',
                    }"
                    class="border dark:!border-typography-2/20 !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1 !overflow-hidden"
                >
                </v-data-table>
            </div> -->
            <div class="grid grid-cols-2 gap-5">
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg bg-hexagon"
                >
                    <div class="grid grid-cols-2 gap-3">
                        <select
                            v-model="filterUserCategory"
                            class="!text-sm border !border-typography-2 rounded-lg !p-2.5 !bg-light-primary-1 dark:!bg-dark-primary-1 !text-white !appearance-auto"
                        >
                            <option value="semua">Semua</option>
                            <option value="karyawan">Karyawan</option>
                            <option value="pkl">PKL/Magang</option>
                        </select>
                        <Multiselect
                            aria-label="pick a action"
                            v-model="filterUser"
                            @remove="todos = []"
                            @select="selectUser"
                            label="name"
                            placeholder="Pilih User"
                            class="bg-light-primary-1 dark:!bg-dark-primary-2"
                            :options="filteredUser"
                        />
                    </div>
                    <div>
                        <TodoChart :todos="todos" />
                    </div>
                </div>
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg bg-hexagon"
                >
                    <TodoTabs :todos="todos" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__input {
    font-size: 14px;
    background-color: transparent;
    margin-bottom: 0 !important;
}
.multiselect__option {
    font-size: 14px;
}
.multiselect__tags {
    background-color: #11121e;
    border-color: #7b7b7b;
    border-radius: 8px;
    height: 42.3px !important;
}
.multiselect__single {
    font-size: 14px !important;
    background-color: transparent;
    color: white;
    margin-bottom: 0 !important;
}
.multiselect__option--highlight {
    font-size: 14px !important;
}
</style>
