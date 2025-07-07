import api from '@/config/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUIStore } from './ui'

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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
