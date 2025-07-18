<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    method: Function,
    user: Object
})

const form = ref({
    name: props.user.name,
    email: props.user.email,
    password: '',
    role: props.user.role,
})

watch(
  () => props.user,
  (newUser) => {
    form.value = {
      name: newUser.name,
      email: newUser.email,
      password: '',
      role: newUser.role,
    }
  },
  { immediate: true }
)

async function submit(isActive) {
    try {
        await props.method(form.value, props.user.id)
        form.value.name = null
        form.value.email = null
        form.value.password = null
        form.value.role = ''
        isActive.value = false
    } catch (error) {}
}
</script>

<template>
  <div v-if="props.user.role?.toLowerCase() !== 'admin'">
    <v-dialog class="max-w-xl" :attach="null">
      <template v-slot:activator="{ props: activatorProps }">
        <button
          v-bind="activatorProps"
          class="flex gap-2 items-center text-white !bg-blue-500 hover:bg-opacity-90 rounded-lg px-3 py-1"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
        </button>
      </template>

      <template v-slot:default="{ isActive }">
        <div class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full">
          <div class="flex border-b dark:!border-typography-2 items-center justify-between px-3 pt-1 !pb-3">
            <p class="text-lg dark:!text-white">Edit User</p>
            <button @click="isActive.value = false">
              <i class="fa-solid fa-x dark:!text-white"></i>
            </button>
          </div>

          <div class="!px-3 !pt-3">
            <form @submit.prevent="submit(isActive)">
              <div class="!space-y-3">
                <div>
                  <label class="block mb-1 text-sm dark:!text-white">*Nama</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Masukkan Nama"
                    required
                    class="w-full !p-2.5 border dark:!bg-dark-primary-2 dark:!border-typography-3 rounded-lg dark:!text-white !text-sm"
                  />
                </div>

                <div>
                  <label class="block mb-1 text-sm dark:!text-white">*Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Masukkan Email"
                    required
                    class="w-full !p-2.5 border dark:!bg-dark-primary-2 dark:!border-typography-3 rounded-lg dark:!text-white !text-sm"
                  />
                </div>

                <div>
                  <label class="block mb-1 text-sm dark:!text-white">Password</label>
                  <input
                    v-model="form.password"
                    type="password"
                    placeholder="Masukkan Password Baru"
                    class="w-full !p-2.5 border dark:!bg-dark-primary-2 dark:!border-typography-3 rounded-lg dark:!text-white !text-sm"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="!bg-green-200 px-5 py-1 !text-sm !text-green-800 font-medium border !border-green-800 rounded-lg"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </template>
    </v-dialog>
  </div>
</template>
