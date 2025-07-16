import api from '@/config/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUIStore } from './ui'
import { useResponseStore } from './response'

export const useUserStore = defineStore('user', {
    state: () => ({
        datas: [],
        data: {},
    }),
    actions: {
        async getData(whereNot = null) {
            const uiStore = useUIStore()
            uiStore.isLoading = true

            try {
                const params = new URLSearchParams()
                if (Array.isArray(whereNot)) {
                    whereNot.forEach((item, index) => {
                        for (const key in item) {
                            params.append(`whereNot[${index}][${key}]`, item[key])
                        }
                    })
                }
                const response = await api.get(`/user?${params.toString()}`)
                this.datas = response.data.data
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async addData(form) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()
            uiStore.isLoading = true

            try {
                const response = await api.post(`/user`, form)
                responseStore.addSuccess(response.data.message)
                this.datas.push(response.data.data)
            } catch (error) {
                const errors = Object.values(error.response.data.errors)
                errors.forEach((e) => {
                    responseStore.addError(e)
                })
                throw error
            } finally {
                uiStore.isLoading = false
            }
        },
        async deleteData(id) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()
            uiStore.isLoading = true

            try {
                const response = await api.delete(`/user/${id}`)
                responseStore.addSuccess(response.data.message)
                this.datas = this.datas.filter((user) => {
                    return user.id !== id
                })
            } catch (error) {
                const errors = Object.values(error.response.data.errors)
                errors.forEach((e) => {
                    responseStore.addError(e)
                })
                throw error
            } finally {
                uiStore.isLoading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
