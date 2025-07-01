<script setup></script>

<template>
    <v-dialog class="max-w-xl" attach="false">
        <template v-slot:activator="{ props: activatorProps }">
            <div
                v-bind="activatorProps"
                class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
            >
                <div
                    class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                >
                    <i class="fa-solid fa-globe dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">0</p>
                    <p class="dark:text-typography-1 tracking-widest text-sm">Total Domain</p>
                </div>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full"
            >
                <div class="flex items-center justify-between px-5 py-1">
                    <p class="text-lg dark:!text-white">Total Domain</p>
                    <button @click="isActive.value = false">
                        <i class="fa-solid fa-x dark:!text-white"></i>
                    </button>
                </div>
                <v-divider></v-divider>
                <div class="grid grid-cols-2 py-5 px-5">
                    <div
                        class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
                    >
                        <div
                            class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                        >
                            <i class="fa-solid fa-globe dark:text-white text-2xl"></i>
                        </div>
                        <div class="flex justify-center flex-col items-center w-full">
                            <p class="dark:text-white text-3xl font-normal">0</p>
                            <p class="dark:text-typography-1 tracking-widest text-sm">
                                Total Domain
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
