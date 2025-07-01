import api from '@/config/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        datas: [],
        data: {},
    }),
    actions: {},
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
