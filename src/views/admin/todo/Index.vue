<script setup>
import TodoTabs from '@/components/dialog/admin/todo/TodoTabs.vue'
import TodoChart from '@/components/dialog/admin/todo/TodoChart.vue'
import TambahTodo from '@/components/dialog/admin/todo/TambahTodo.vue'
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

async function tambahTask(form) {}

onMounted(async () => {
    const whereNot = [{ role: 'admin' }]
    await userStore.getData(whereNot)

    users.value = userStore.datas
})
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
                    <div class="flex items-center gap-3">
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
                        <v-menu attach="false">
                            <template v-slot:activator="{ props: menu }">
                                <button
                                    v-bind="menu"
                                    class="rounded-lg border dark:!bg-dark-primary-1 dark:!border-typography-2 !h-[38px] !aspect-square"
                                >
                                    <i class="fa-solid fa-ellipsis-vertical dark:text-white"></i>
                                </button>
                            </template>
                            <div
                                class="!mt-3 !p-1 !min-w-40 dark:!bg-dark-primary-1 dark:!text-white !rounded-lg border dark:!border-typography-2 !text-sm"
                            >
                                <ul>
                                    <li>
                                        <TambahTodo :users="users" :method="tambahTask" />
                                    </li>
                                    <li>
                                        <button
                                            class="!text-sm hover:!bg-gray-100 dark:hover:!bg-dark-primary-2 rounded-lg !py-2 !px-3 w-full flex gap-2 items-center"
                                        >
                                            <i class="fa-solid fa-clock"></i>
                                            <p>Routine Task</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            class="!text-sm hover:!bg-gray-100 dark:hover:!bg-dark-primary-2 rounded-lg !py-2 !px-3 w-full flex gap-2 items-center"
                                        >
                                            <i class="fa-solid fa-file-circle-check"></i>
                                            <p>Lihat Laporan</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            class="!text-sm hover:!bg-gray-100 dark:hover:!bg-dark-primary-2 rounded-lg !py-2 !px-3 w-full flex gap-2 items-center"
                                        >
                                            <i class="fa-solid fa-circle-check"></i>
                                            <p>Konfirmasi Task</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </v-menu>
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
    height: 38px !important;
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
