<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  method: Function,
  pelanggan: Object,
})


const dialogVisible = ref(false)


const form = reactive({
  nama_pelanggan: '',
  alamat: '',
  no_hp: '',
})


watch(
  () => props.pelanggan,
  (val) => {
    form.nama_pelanggan = val.nama_pelanggan || ''
    form.alamat = val.alamat || ''
    form.no_hp = val.no_hp || ''
  },
  { immediate: true }
)


async function submit() {
  try {
    await props.method({ ...form }, props.pelanggan.id)
    dialogVisible.value = false
  } catch (error) {
    if (error.response?.data?.errors) {
      const messages = Object.values(error.response.data.errors).flat()
      alert(messages.join('\n'))
    } else {
      alert('Terjadi kesalahan saat update')
    }
    console.error('Edit error:', error)
  }
}
</script>

<template>
  <v-dialog v-model="dialogVisible" class="max-w-xl" :attach="null">
    <template #activator="{ props: activatorProps }">
      <button
        v-bind="activatorProps"
        class="flex gap-2 items-center text-white !bg-blue-500 hover:bg-opacity-90 rounded-lg px-3 py-1"
      >
        <i class="fa-solid fa-pen-to-square"></i>
        <p>Edit</p>
      </button>
    </template>

    <template #default>
      <div
        class="bg-white dark:!bg-dark-primary-1 !p-5 border dark:!border-white rounded-lg w-full"
      >
        <div
          class="flex border-b dark:!border-typography-2 items-center justify-between px-3 pt-1 !pb-3"
        >
          <p class="text-lg dark:!text-white">Edit Pelanggan</p>
          <button @click="dialogVisible = false">
            <i class="fa-solid fa-x dark:!text-white"></i>
          </button>
        </div>

        <div class="!px-3 !pt-3">
          <form @submit.prevent="submit">
            <div class="!space-y-3">
              <div>
                <label class="block mb-1 text-start dark:!text-white text-sm">Nama Pelanggan</label>
                <input
                  type="text"
                  v-model="form.nama_pelanggan"
                  required
                  placeholder="Masukkan nama pelanggan"
                  class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                />
              </div>

              <div>
                <label class="block mb-1 text-start dark:!text-white text-sm">No. HP</label>
                <input
                  type="text"
                  v-model="form.no_hp"
                  placeholder="Masukkan no HP (opsional)"
                  class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                />
              </div>

              <div>
                <label class="block mb-1 text-start dark:!text-white text-sm">Alamat</label>
                <textarea
                  v-model="form.alamat"
                  required
                  placeholder="Masukkan alamat pelanggan"
                  class="w-full !p-2.5 border dark:!border-typography-3 dark:!bg-dark-primary-2 rounded-lg dark:!text-white !text-sm"
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="!bg-green-200 px-5 py-1 !text-sm !text-green-800 !font-medium border !border-green-800 rounded-lg"
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
</template>
