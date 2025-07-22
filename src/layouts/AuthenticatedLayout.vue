<script setup>
import { useAuthStore } from '@/stores/auth'
import { useResponseStore } from '@/stores/response'
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
if (localStorage.getItem('isDark') === 'true') {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
const isDark = ref(localStorage.getItem('isDark') === 'true')
const authStore = useAuthStore()
const drawer = ref(false)
const responseStore = useResponseStore()

const sidebarItemsAdmin = ref([
    {
        to: 'admin.dashboard',
        title: 'Dashboard',
        icon: 'fa-solid fa-grid',
        isHasChild: false,
    },
    {
        title: 'Database',
        icon: 'fa-solid fa-database',
        isHasChild: true,
        child: [
            {
                to: 'admin.domain',
                title: 'Domain',
                icon: 'fa-solid fa-globe',
                isHasChild: false,
            },
            {
                to: 'admin.user.index',
                title: 'User',
                icon: 'fa-solid fa-user',
                isHasChild: false,
            },
            {
                to: 'admin.pelanggan.index',
                title: 'Pelanggan',
                icon: 'fa-solid fa-users',
                isHasChild: false,
            },
            {
                to: 'admin.nameserver.index',
                title: 'Name Server',
                icon: 'fa-solid fa-server',
                isHasChild: false,
            },
        ],
    },
    {
        to: 'admin.todo.index',
        title: 'Todo List',
        icon: 'fa-solid fa-check',
        isHasChild: false,
    },
])

const sidebarItemKaryawan = ref([
    {
        to: 'karyawan.dashboard',
        title: 'Dashboard',
        icon: 'fa-solid fa-grid',
        isHasChild: false,
    },
    {
        to: 'karyawan.todo',
        title: 'Todo List',
        icon: 'fa-solid fa-check',
        isHasChild: false,
    },
])

watchEffect(() => {
    localStorage.setItem('isDark', isDark.value)
})
watch(isDark, (newVal, oldVal) => {
    if (newVal === false) {
        responseStore.addError('Light Mode Sedang Dalam Tahap Pengembangan')
    }
})

watch(isDark, (val) => {
    if (val) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

async function logout() {
    await authStore.logout()
}
</script>

<template>
    <div
        :class="isDark ? 'dark' : ''"
        class="!bg-light-primary-2 dark:!bg-dark-primary-1 font-poppins !transition-colors !duration-500 min-h-screen !p-5 !pt-0"
    >
        <v-layout>
            <v-navigation-drawer v-model="drawer" temporary class="dark:!bg-dark-primary-2">
                <div class="flex justify-between !px-3 !py-2 !no-scrollbar dark:!bg-dark-primary-1">
                    <div class="flex items-center gap-3">
                        <div
                            class="border dark:!border-white rounded-full h-7 w-7 flex items-center justify-center flex-none"
                        >
                            <i class="fa-solid fa-user text-white"></i>
                        </div>
                        <div>
                            <p class="dark:!text-white text-sm line-clamp-1">
                                {{ authStore?.decryptedUserData?.name }}
                            </p>
                            <p class="dark:!text-gray-400 text-xs line-clamp-1">
                                {{ authStore?.decryptedUserData?.email }}
                            </p>
                        </div>
                    </div>
                    <button
                        @click.stop="drawer = !drawer"
                        class="dark:!bg-dark-primary-1 !py-2 !px-2 dark:!text-white"
                    >
                        <i class="fa-solid fa-bars"></i>
                    </button>
                </div>

                <v-divider></v-divider>

                <div class="py-3 overflow-y-scroll no-scrollbar h-full">
                    <div
                        v-for="(item, index) in authStore?.decryptedUserData?.role == 'admin'
                            ? sidebarItemsAdmin
                            : sidebarItemKaryawan"
                        :key="index"
                        class="w-full"
                    >
                        <router-link
                            v-if="!item.isHasChild"
                            :to="{ name: item.to }"
                            class="!w-full flex gap-2 items-center !py-1 !px-3 transition-all duration-300 dark:hover:!bg-dark-primary-1 dark:hover:!text-white dark:!text-gray-300 dark:!bg-dark-primary-2"
                        >
                            <div
                                class="!text-xl flex items-center justify-center flex-none w-10 h-10"
                            >
                                <i :class="item.icon"></i>
                            </div>
                            <p class="w-full text-sm">
                                {{ item.title }}
                            </p>
                        </router-link>
                        <div v-else>
                            <v-expansion-panels>
                                <v-expansion-panel class="!bg-transparent" elevation="0">
                                    <v-expansion-panel-title
                                        min-height="0"
                                        class="!w-full !py-1 !px-3 transition-all duration-300 dark:hover:!bg-dark-primary-1 dark:hover:!text-white dark:!text-gray-300"
                                    >
                                        <div>
                                            <div class="flex gap-2 items-center">
                                                <div
                                                    class="!text-xl flex items-center justify-center flex-none w-10 h-10"
                                                >
                                                    <i :class="item.icon"></i>
                                                </div>
                                                <p class="w-full text-sm">
                                                    {{ item.title }}
                                                </p>
                                            </div>
                                        </div>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <div class="px-3 py-2">
                                            <div
                                                class="dark:bg-dark-primary-1/50 border !border-typography-2 rounded-lg !p-3 !space-y-1"
                                            >
                                                <router-link
                                                    v-for="(child, i) in item.child"
                                                    :key="i"
                                                    :to="{ name: child.to }"
                                                    class="!w-full flex gap-2 items-center !py-1 !px-3 transition-all duration-300 dark:hover:!bg-dark-primary-1 dark:hover:!text-white dark:!text-gray-300 dark:!bg-dark-primary-2 rounded-lg"
                                                >
                                                    <div
                                                        class="!text-xl flex items-center justify-center flex-none w-10 h-10"
                                                    >
                                                        <i :class="child.icon"></i>
                                                    </div>
                                                    <p class="w-full text-sm">
                                                        {{ child.title }}
                                                    </p>
                                                </router-link>
                                            </div>
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </div>
                </div>
            </v-navigation-drawer>

            <v-main class="!pl-5 relative">
                <div class="!fixed left-0 top-0 !w-10 flex items-center h-screen">
                    <button
                        @click.stop="drawer = !drawer"
                        class="dark:!bg-dark-primary-2 !py-2 !px-2 !rounded-r-full dark:!text-white border dark:!border-typography-3"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <div
                    class="sticky z-50 top-0 flex justify-between items-center mb-3 !py-3 !pt-5 !px-5 dark:bg-dark-primary-1"
                >
                    <p class="dark:!text-white !text-xl">{{ route.meta.title }}</p>

                    <div class="flex items-center justify-center gap-5">
                        <div class="flex justify-center gap-2 items-center">
                            <i class="fa-light fa-sun-bright text-gray-900 dark:text-gray-600"></i>
                            <div id="page">
                                <input
                                    @click="toggleDarkMode"
                                    type="checkbox"
                                    id="theme-toggle"
                                    v-model="isDark"
                                />
                                <label for="theme-toggle"><span></span></label>
                            </div>
                            <i class="fa-light fa-moon text-gray-300 dark:text-white"></i>
                        </div>
                        <v-menu>
                            <template v-slot:activator="{ props: menu }">
                                <button
                                    v-bind="menu"
                                    class="w-7 h-7 rounded-full border dark:!border-white"
                                >
                                    <i class="fa-solid fa-user dark:text-white"></i>
                                </button>
                            </template>
                            <v-list class="!mt-3 !min-w-40">
                                <v-list-item class="!p-1">
                                    <button
                                        @click="logout"
                                        class="!text-sm hover:!bg-gray-100 !py-2 !px-3 w-full text-start"
                                    >
                                        Logout
                                    </button>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <slot />
            </v-main>
        </v-layout>
    </div>
</template>
<style>
.v-navigation-drawer__content::-webkit-scrollbar {
    display: none;
}
.v-expansion-panel-title:hover > .v-expansion-panel-title__overlay {
    --v-hover-opacity: 0;
}
.v-expansion-panel-text__wrapper {
    padding: 0;
}
</style>
