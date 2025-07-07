<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useTodoStore } from '@/stores/todo'
import { onMounted, ref } from 'vue'

const todoStore = useTodoStore()
const todos = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        await todoStore.getDataByUser()
        todos.value = todoStore.datas
    } catch (error) {
    } finally {
        loading.value = false
    }
})
</script>
<template>
    <AuthenticatedLayout>
        <div class="grid grid-cols-3 gap-4">
            <div
                v-if="!loading"
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-list-check dark:text-white text-2xl"></i>
                </div>
                <router-link
                    :to="{
                        name: 'karyawan.todo',
                    }"
                    class="flex justify-center flex-col items-center w-full"
                >
                    <p class="dark:text-white text-3xl font-normal">
                        {{
                            todos.filter((todo) => {
                                return todo.status == 'todo'
                            }).length
                        }}
                    </p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Todo</p>
                </router-link>
            </div>
            <v-skeleton-loader
                v-else
                :elevation="24"
                type="chip"
                height="96"
                max-height="96"
                class="!bg-dark-primary-2 !rounded-lg"
            ></v-skeleton-loader>
            <div
                v-if="!loading"
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-rotate dark:text-white text-2xl"></i>
                </div>
                <router-link
                    :to="{
                        name: 'karyawan.todo',
                    }"
                    class="flex justify-center flex-col items-center w-full"
                >
                    <p class="dark:text-white text-3xl font-normal">
                        {{
                            todos.filter((todo) => {
                                return todo.status == 'doing'
                            }).length
                        }}
                    </p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Doing</p>
                </router-link>
            </div>
            <v-skeleton-loader
                v-else
                :elevation="24"
                type="chip"
                height="96"
                max-height="96"
                class="!bg-dark-primary-2 !rounded-lg"
            ></v-skeleton-loader>
            <div
                v-if="!loading"
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-check dark:text-white text-2xl"></i>
                </div>
                <router-link
                    :to="{
                        name: 'karyawan.todo',
                    }"
                    class="flex justify-center flex-col items-center w-full"
                >
                    <p class="dark:text-white text-3xl font-normal">
                        {{
                            todos.filter((todo) => {
                                return todo.status == 'done'
                            }).length
                        }}
                    </p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Done</p>
                </router-link>
            </div>
            <v-skeleton-loader
                v-else
                :elevation="24"
                type="chip"
                height="96"
                max-height="96"
                class="!bg-dark-primary-2 !rounded-lg"
            ></v-skeleton-loader>
        </div>
    </AuthenticatedLayout>
</template>
