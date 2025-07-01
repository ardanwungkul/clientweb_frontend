<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import draggable from 'vuedraggable'
import { debounce } from 'lodash'
import { useTodoStore } from '@/stores/todo'
import TambahTodo from '@/components/dialog/karyawan/todo/TambahTodo.vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import EditSubject from '@/components/dialog/karyawan/todo/EditSubject.vue'

const todoStore = useTodoStore()

const todos = ref({
    todo: [],
    doing: [],
    done: [],
})

onMounted(async () => {
    await todoStore.getDataByUser()
    fetchData()
})

const fetchData = async () => {
    todos.value.todo = todoStore.datas.filter((todo) => todo.status == 'todo')
    todos.value.doing = todoStore.datas.filter((todo) => todo.status == 'doing')
    todos.value.done = todoStore.datas.filter((todo) => todo.status == 'done')
}
const onDragEnd = async (event) => {
    const status = event.to.dataset.status
    const statusFrom = event.from.dataset.status
    const todoId = event.item.dataset.id

    if (status !== statusFrom) {
        const formData = new FormData()
        formData.append('status', status)
        formData.append('_method', 'PUT')

        await todoStore.editStatus(formData, todoId)
    }
}

const editCatatan = async (catatan, id) => {
    if (catatan !== '') {
        const formData = new FormData()
        formData.append('catatan', catatan)
        await todoStore.editCatatan(formData, id)
    }
}
const tambahTask = async (form) => {
    await todoStore.tambahTodo(form)
}
const deleteTask = async (id) => {
    await todoStore.delete(id)
}
const submitTodo = async () => {
    const formData = new FormData()
    todos.value.done.forEach((item) => {
        if (!item.order_id) {
            formData.append('todo[]', item.id)
        }
    })
    await todoStore.submitTodo(formData, setErrors, processing)
}
const debouncedEditCatatan = debounce(editCatatan, 500)

watch(
    () => todoStore.datas,
    (val) => {
        fetchData()
    },
    { immediate: true, deep: true },
)
</script>
<template>
    <AuthenticatedLayout title="Todo List" :processing="processing">
        <div>
            <div class="grid grid-cols-3 !p-4 gap-4">
                <div v-for="(items, status) in todos" :key="status">
                    <fieldset
                        class="rounded-lg dark:!bg-dark-primary-2 !bg-light-primary-1 !shadow-lg dark:!shadow-typography-3 gap-4 !p-4 bg-hexagon border dark:!border-typography-2"
                    >
                        <legend
                            class="dark:!bg-dark-primary-1 !bg-light-primary-1 !border dark:!border-typography-2 !border-gray-300 rounded-lg !px-10 !py-1 dark:!text-typography-1 !text-sm capitalize"
                            align="center"
                        >
                            <div class="flex items-center justify-center gap-3">
                                <p>
                                    {{ status }}
                                </p>
                                <TambahTodo :method="tambahTask" v-if="status == 'todo'" />
                            </div>
                        </legend>
                        <draggable
                            v-model="todos[status]"
                            group="tasks"
                            item-key="id"
                            class="!space-y-4"
                            :data-status="status"
                            @end="onDragEnd"
                        >
                            <template #item="{ element }">
                                <div
                                    :class="element?.catatan == '' ? '!shadow !shadow-red-500' : ''"
                                    class="list-group-item dark:!bg-dark-primary-1 !bg-light-primary-2 rounded-lg border overflow-hidden !cursor-move"
                                    :draggable="true"
                                    :data-id="element?.id"
                                >
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <div
                                                class="dark:!bg-dark-primary-1 dark:!text-white flex justify-between gap-1"
                                            >
                                                <div
                                                    class="flex !gap-1 items-start flex-none !w-full"
                                                >
                                                    <v-expansion-panel-title>
                                                        <template v-slot:default="{ expanded }">
                                                            <p
                                                                class="text-sm"
                                                                :class="
                                                                    !expanded ? 'line-clamp-1' : ''
                                                                "
                                                            >
                                                                {{ element?.subject }}
                                                            </p>
                                                        </template>
                                                    </v-expansion-panel-title>
                                                    <div class="flex items-center gap-3 py-3 px-3">
                                                        <v-menu class="!rounded-lg">
                                                            <template v-slot:activator="{ props }">
                                                                <button
                                                                    type="button"
                                                                    v-bind="props"
                                                                >
                                                                    <svg
                                                                        class="w-5 fill-white"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g id="SVGRepo_iconCarrier">
                                                                            <path
                                                                                d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z"
                                                                            ></path>
                                                                            <path
                                                                                d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                                                                            ></path>
                                                                            <path
                                                                                d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </template>
                                                            <ul
                                                                class="!min-w-40 !rounded-lg overflow-hidden"
                                                            >
                                                                <li>
                                                                    <EditSubject :todo="element">
                                                                        <template
                                                                            #activator="{ props }"
                                                                        >
                                                                            <button
                                                                                v-bind="props"
                                                                                class="!text-sm w-full text-start py-2 px-3 !bg-white hover:!bg-gray-100"
                                                                            >
                                                                                Edit Subject
                                                                            </button>
                                                                        </template>
                                                                    </EditSubject>
                                                                </li>
                                                                <li>
                                                                    <ConfirmDelete
                                                                        :type="'Task'"
                                                                        :id="element.id"
                                                                        :method="deleteTask"
                                                                    >
                                                                        <template
                                                                            #activator="{ props }"
                                                                        >
                                                                            <button
                                                                                v-bind="props"
                                                                                class="!text-sm w-full text-start py-2 px-3 !bg-white hover:!bg-gray-100"
                                                                            >
                                                                                Hapus
                                                                            </button>
                                                                        </template>
                                                                    </ConfirmDelete>
                                                                </li>
                                                            </ul>
                                                        </v-menu>
                                                        <i
                                                            class="dark:!text-typography-1 fa-arrows-up-down-left-right fa-regular"
                                                        >
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>

                                            <v-expansion-panel-text class="!p-0">
                                                <v-textarea
                                                    :draggable="false"
                                                    rows="1"
                                                    bg-color="transparent"
                                                    hide-details="true"
                                                    class="dark:!text-typography-1 !bg-light-primary-1 dark:!bg-dark-primary-1"
                                                    v-model="element.catatan"
                                                    @input="
                                                        debouncedEditCatatan(
                                                            element?.catatan,
                                                            element.id,
                                                        )
                                                    "
                                                    auto-grow
                                                />
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </template>
                        </draggable>
                        <button
                            type="button"
                            @click="submitTodo"
                            v-if="status == 'done'"
                            class="!bg-secondary-3 rounded-lg !text-sm !text-white !py-1 !mt-3 text-center w-full hover:!opacity-90 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </fieldset>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style>
.v-field__input {
    font-size: 14px !important;
}

.v-expansion-panel-title {
    padding: 12px !important;
}
.v-expansion-panel-text__wrapper {
    padding: 0 !important;
}
.v-expansion-panel-title__overlay {
    padding: 0 !important;
}
</style>
