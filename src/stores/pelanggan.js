import { defineStore } from 'pinia'
import api from '@/config/axios'
import { useUIStore } from './ui'
import { useResponseStore } from './response'

export const usePelangganStore = defineStore('pelanggan', {
  state: () => ({
    datas: [],
    data: {},
  }),

  actions: {
    async getData() {
      const uiStore = useUIStore()
      uiStore.startLoading()
      try {
        const response = await api.get(`/pelanggan`)
        this.datas = response.data.data
      } catch (error) {
        console.error('Gagal ambil data:', error)
      } finally {
        uiStore.stopLoading()
      }
    },

    async addData(form) {
      const uiStore = useUIStore()
      const responseStore = useResponseStore()

      if (!form.email || !form.password) {
        responseStore.addError('Email dan password wajib diisi')
        return
      }

      uiStore.startLoading()
      try {
        const payload = new FormData()
        payload.append('email', form.email)
        payload.append('password', form.password)
        payload.append('nama_pelanggan', form.nama_pelanggan)
        payload.append('alamat', form.alamat)
        payload.append('no_hp', form.no_hp ?? '') // safe null
        if (form.image) {
          payload.append('image', form.image)
        }

        const response = await api.post(`/pelanggan`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        this.datas.push(response.data.data)
        responseStore.addSuccess(response.data.message)
      } catch (error) {
        const errors = Object.values(error.response?.data?.errors || {}).flat()
        errors.forEach((e) => {
          responseStore.addError(e)
        })
        console.error('Gagal simpan:', error)
      } finally {
        uiStore.stopLoading()
      }
    },

    async editData(form, id) {
      const uiStore = useUIStore()
      const responseStore = useResponseStore()
      uiStore.startLoading()

      try {
        const payload = new FormData()
        payload.append('nama_pelanggan', form.nama_pelanggan)
        payload.append('alamat', form.alamat)
        payload.append('no_hp', form.no_hp ?? '')
        if (form.image) {
          payload.append('image', form.image)
        }
        payload.append('_method', 'PUT')

        const response = await api.post(`/pelanggan/${id}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const updatedData = response.data.data
        this.datas = this.datas.map((item) =>
          item.id === Number(id) ? { ...item, ...updatedData } : item
        )
        responseStore.addSuccess(response.data.message)
      } catch (error) {
        const errors = Object.values(error.response?.data?.errors || {}).flat()
        errors.forEach((e) => {
          responseStore.addError(e)
        })
        console.error('Gagal update:', error)
      } finally {
        uiStore.stopLoading()
      }
    },

    async deleteData(id) {
      const uiStore = useUIStore()
      const responseStore = useResponseStore()
      uiStore.startLoading()

      try {
        const response = await api.delete(`/pelanggan/${id}`)
        this.datas = this.datas.filter((item) => item.id !== id)
        responseStore.addSuccess(response.data.message)
      } catch (error) {
        console.error('Gagal hapus:', error)
      } finally {
        uiStore.stopLoading()
      }
    },
  },
})
