<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
    todos: Array,
})
const tabs = ref(['todo', 'doing', 'done'])
const tab = ref(tabs.value[0])

const datas = computed(() => ({
    todo: props.todos?.filter((todo) => todo.status === 'todo') || [],
    doing: props.todos?.filter((todo) => todo.status === 'doing') || [],
    done: props.todos?.filter((todo) => todo.status === 'done') || [],
}))
</script>
<template>
    <div class="flex flex-col gap-5 h-full">
        <v-tabs
            v-model="tab"
            class="dark:!bg-dark-primary-1 shadow-lg dark:!text-white !border-none !rounded-lg flex-none"
        >
            <v-tab
                v-for="(item, index) in tabs"
                :key="index"
                class="!text-sm !capitalize"
                :value="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <div
            class="!p-5 dark:!bg-dark-primary-1 shadow-lg dark:!text-white !rounded-lg !text-sm !h-full"
        >
            <v-tabs-window v-model="tab" class="!h-full">
                <v-tabs-window-item v-for="(item, index) in tabs" :key="index" :value="item">
                    <div class="!space-y-3">
                        <div v-if="datas?.[item].length == 0">
                            <p class="text-center">Tidak Ada Data Tersedia</p>
                        </div>
                        <div v-else v-for="(todo, indexs) in datas?.[item]" :key="indexs">
                            <div
                                class="w-full rounded-lg border dark:bg-dark-primary-2 dark:!border-typography-2 px-3 py-2"
                            >
                                <p>{{ todo.subject }}</p>
                            </div>
                        </div>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </div>
</template>
