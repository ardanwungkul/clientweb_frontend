import api from '@/config/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDomainStore = defineStore({
    id: 'domain',
    state: () => ({
        datas: [],
        data: {},
    }),
    actions: {},
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDomainStore, import.meta.hot))
}
