<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const form = ref({
    email: null,
    password: null,
})

const authStore = useAuthStore()

async function submit() {
    await authStore.login(form)
}
</script>
<template>
    <AuthLayout>
        <form @submit.prevent="submit">
            <div class="!space-y-3">
                <div>
                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="Masukkan Alamat Email"
                        required
                        class="!border block mt-1 w-full !border-gray-300 dark:!border-gray-700 dark:!bg-gray-900 dark:!text-gray-300 focus:!border-indigo-500 dark:!focus:border-indigo-600 focus:!ring-indigo-500 dark:!focus:ring-indigo-600 !rounded-lg !shadow-lg !p-2.5 !text-sm"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Masukkan Password"
                        class="!border block mt-1 w-full !border-gray-300 dark:!border-gray-700 dark:!bg-gray-900 dark:!text-gray-300 focus:!border-indigo-500 dark:!focus:border-indigo-600 focus:!ring-indigo-500 dark:!focus:ring-indigo-600 !rounded-lg !shadow-lg !p-2.5 !text-sm"
                    />
                </div>
                <button
                    class="!h-10 text-center w-full dark:!bg-gray-900 !bg-white !rounded-lg dark:!text-white !text-black !text-sm tracking-widest font-medium cursor-pointer hover:opacity-90 shadow-lg"
                >
                    Log In
                </button>
            </div>
        </form>
    </AuthLayout>
</template>
