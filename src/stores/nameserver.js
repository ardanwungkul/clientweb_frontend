import { defineStore } from 'pinia'
import api from '@/config/axios'
import { useUIStore } from './ui'
import { useResponseStore } from './response'

export const useNameserverStore = defineStore('nameserver', {
    state: () => ({
        datas: [],
        data: {},
    }),

    actions: {
        async getData() {
            const uiStore = useUIStore()
            uiStore.startLoading()
            try {
                const response = await api.get(`/name-servers`)

                this.datas = response.data.data
            } catch (error) {
                console.error('Gagal ambil data:', error)
            } finally {
                uiStore.stopLoading()
            }
        },

        async addData(form) {
            const uiStore = useUIStore()
            uiStore.startLoading()

            const responseStore = useResponseStore()
            try {
                const response = await api.post(`/name-servers`, form)
                this.datas.push(response.data.data)

                responseStore.addSuccess(response.data.message)
            } catch (error) {
                const errors = Object.values(error.response.data.errors)
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
            uiStore.startLoading()

            const responseStore = useResponseStore()
            try {
                const response = await api.put(`/name-servers/${id}`, form)
                const updatedData = response.data.data
                this.datas = this.datas.map((item) => {
                    return item.id === Number(id) ? { ...item, ...updatedData } : item
                })

                responseStore.addSuccess(response.data.message)
            } catch (error) {
                const errors = Object.values(error.response.data.errors)
                errors.forEach((e) => {
                    responseStore.addError(e)
                })
                console.error('Gagal simpan:', error)
            } finally {
                uiStore.stopLoading()
            }
        },

        async deleteData(id) {
            const responseStore = useResponseStore()
            const uiStore = useUIStore()
            uiStore.startLoading()

            try {
                const response = await api.delete(`/name-servers/${id}`)

                responseStore.addSuccess(response.data.message)
                this.datas = this.datas.filter((ns) => {
                    return ns.id !== id
                })
            } catch (error) {
                console.error('Gagal hapus:', error)
            } finally {
                uiStore.stopLoading()
            }
        },
    },
})
