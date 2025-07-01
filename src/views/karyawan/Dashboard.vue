<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>
<template>
    <AuthenticatedLayout>
        <div class="grid grid-cols-3 gap-4">
            <div
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-list-check dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">0</p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Todo</p>
                </div>
            </div>
            <div
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-rotate dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">0</p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Doing</p>
                </div>
            </div>
            <div
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-check dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">0</p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Done</p>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
