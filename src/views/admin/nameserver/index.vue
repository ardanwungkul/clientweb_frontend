<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { ref, onMounted } from 'vue'
import { useNameserverStore } from '@/stores/nameserver'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'

// Store
const nsStore = useNameserverStore()

// Kolom tabel
const headers = [
  { title: 'No', key: 'no' },
  { title: 'Nameserver 1', key: 'nameserver1' },
  { title: 'Nameserver 2', key: 'nameserver2' },
  { title: 'Tanggal NS', key: 'tanggal_ns' },
  { title: 'Status NS', key: 'status_ns' },
  { title: 'Aksi', key: 'actions', sortable: false },
]

// State untuk pagination
const page = ref(1)
const perPage = ref(nsStore.pagination.perPage)

// Ambil data saat mount
onMounted(() => {
  nsStore.getAll(page.value, perPage.value)
})

// Simpan (tambah/update)
const saveItem = async () => {
  try {
    await nsStore.save(editedItem.value)
    dialog.value = false
  } catch (error) {
    console.error('Gagal simpan:', error)
  }
}

// Edit
const editItem = (item) => {
  editedItem.value = { ...item }
  dialog.value = true
}

// Tambah
const newItem = () => {
  editedItem.value = {
    id: null,
    nameserver1: '',
    nameserver2: '',
    tanggal_ns: '',
    status_ns: '',
  }
  dialog.value = true
}

// Hapus
const deleteItem = async (id) => {
  await nsStore.remove(id)
}

// Ganti halaman
const onPageChange = (newPage) => {
  page.value = newPage
  nsStore.getAll(newPage, perPage.value)
}

// Ganti jumlah item per halaman
const onPerPageChange = (newPerPage) => {
  perPage.value = newPerPage
  page.value = 1
  nsStore.pagination.perPage = newPerPage
  nsStore.getAll(page.value, newPerPage)
}

// Dialog form
const dialog = ref(false)
const editedItem = ref({
  id: null,
  nameserver1: '',
  nameserver2: '',
  tanggal_ns: '',
  status_ns: '',
})
</script>

<template>
  <AuthenticatedLayout>
    <!-- Tombol tambah -->
    <div class="mb-4">
      <v-btn color="primary" size="small" @click="newItem">Tambah Server</v-btn>
    </div>

    <!-- Tabel data -->
    <div class="bg-light-primary-1 dark:bg-dark-primary-2 !p-5 !rounded-lg !space-y-3 shadow-lg">
      <v-data-table
        :headers="headers"
        :items="nsStore.items"
        :page="page"
        :items-per-page="perPage"
        :server-items-length="nsStore.pagination.total"
        :loading="nsStore.loading"
        @update:page="onPageChange"
        @update:items-per-page="onPerPageChange"
        class="border dark:!border-typography-2/20 !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1 !overflow-hidden"
      >
        <!-- Kolom nomor urut -->
        <template #item.no="{ index }">
          {{ (page - 1) * perPage + index + 1 }}
        </template>

        <!-- Kolom aksi -->
        <template #item.actions="{ item }">
          <div class="d-flex align-center gap-2">
            <button @click="editItem(item)">
              <div class="flex gap-2 items-center text-white bg-blue-500 hover:bg-opacity-90 rounded-lg px-3 py-1">
                <i class="fa-solid fa-pen-to-square"></i>
                <p>Edit</p>
              </div>
            </button>

            <ConfirmDelete :type="'nameserver'" :id="item.id" :method="deleteItem">
              <template #activator="{ props }">
                <button v-bind="props">
                  <div class="flex gap-2 items-center text-white bg-red-500 hover:bg-opacity-90 rounded-lg px-3 py-1">
                    <i class="fa-solid fa-trash"></i>
                    <p>Delete</p>
                  </div>
                </button>
              </template>
            </ConfirmDelete>
          </div>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog tambah/edit -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
          {{ editedItem.id ? 'Edit' : 'Tambah' }} Name Server
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nameserver1" label="Nameserver 1" />
          <v-text-field v-model="editedItem.nameserver2" label="Nameserver 2" />
          <v-text-field v-model="editedItem.tanggal_ns" label="Tanggal NS" type="date" />
          <v-select v-model="editedItem.status_ns" :items="['aktif', 'nonaktif']" label="Status" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="primary" @click="saveItem">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </AuthenticatedLayout>
</template>
