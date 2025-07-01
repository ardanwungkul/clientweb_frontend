<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import DomainDialog from '@/components/dialog/admin/dashboard/DomainDialog.vue'
</script>
<template>
    <AuthenticatedLayout>
        <div class="!space-y-3">
            <!-- Search -->
            <div
                class="bg-light-primary-3 dark:!bg-dark-primary-2 !p-3 rounded-lg !border !border-gray-300 dark:!border-typography-3 !shadow-lg dark:!shadow-typography-3"
            >
                <div>
                    <input
                        type="text"
                        class="w-full !bg-light-primary-2 dark:!bg-dark-primary-1 border !border-gray-300 dark:!border-typography-3 !p-2.5 !text-sm dark:!text-typography-1 rounded-lg"
                        placeholder="Search....."
                    />
                </div>
            </div>

            <!-- Tabs -->
            <div class="grid grid-cols-4 gap-4">
                <!-- Domain -->
                <DomainDialog />

                <div
                    class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
                >
                    <div
                        class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                    >
                        <i class="fa-solid fa-user dark:text-white text-2xl"></i>
                    </div>
                    <div class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">0</p>
                        <p class="dark:text-typography-1 tracking-widest text-sm">
                            Total Pelanggan
                        </p>
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
                        <p class="dark:text-typography-1 tracking-widest text-sm">Todo List</p>
                    </div>
                </div>
                <div
                    class="h-24 rounded-lg dark:bg-dark-primary-2 bg-light-primary-3 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4 cursor-pointer"
                >
                    <div
                        class="rounded-full bg-light-primary-2 dark:!bg-dark-primary-1 border w-14 h-14 flex items-center justify-center flex-none"
                    >
                        <i class="fa-solid fa-server dark:text-white text-2xl"></i>
                    </div>
                    <div class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">0</p>
                        <p class="dark:text-typography-1 tracking-widest text-sm">Total Vendor</p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
