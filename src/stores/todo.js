import api from '@/config/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUIStore } from './ui'
import { useResponseStore } from './response'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        datas: [],
        data: {},
    }),

    actions: {
        async getDataByUser(whereNot = null, orderBy = null) {
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
                if (Array.isArray(orderBy)) {
                    orderBy.forEach((item, index) => {
                        for (const key in item) {
                            params.append(`orderBy[${index}][${key}]`, item[key])
                        }
                    })
                }
                params.append('type', 'by-user-auth')
                const response = await api.get(`/todo?${params.toString()}`)
                this.datas = response.data.data
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async getDataByUserId(id, whereNot = null, orderBy = null) {
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
                if (Array.isArray(orderBy)) {
                    orderBy.forEach((item, index) => {
                        for (const key in item) {
                            params.append(`orderBy[${index}][${key}]`, item[key])
                        }
                    })
                }
                params.append('type', 'by-user-id')
                params.append('user_id', id)
                const response = await api.get(`/todo?${params.toString()}`)
                this.datas = response.data.data
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async tambahTodo(form) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()

            uiStore.isLoading = true
            try {
                const response = await api.post(`/todo`, form)
                console.log(this.datas)

                this.datas.push(response.data.data)
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async editStatus(form, id) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()

            uiStore.isLoading = true
            try {
                const response = await api.put(`/todo/${id}`, form)
                const updatedData = response.data.data
                this.datas = this.datas.map((item) => {
                    return item.id === Number(id) ? { ...item, ...updatedData } : item
                })
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async editSubject(form, id) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()

            uiStore.isLoading = true
            try {
                const response = await api.put(`/todo/${id}`, form)
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async editCatatan(form, id) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()

            uiStore.isLoading = true
            try {
                const response = await api.put(`/todo/${id}`, form)
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async editOrder(orderList) {
            const uiStore = useUIStore()
            uiStore.isLoading = true
            try {
                await api.post('/todo/update-order', {
                    order: orderList,
                })
            } catch (error) {
                console.error(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async delete(id) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()

            uiStore.isLoading = true
            try {
                const response = await api.delete(`/todo/${id}`)
                this.datas = this.datas.filter((todo) => {
                    return todo.id !== id
                })
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
        async submitTodo(form) {
            const uiStore = useUIStore()
            const responseStore = useResponseStore()
            uiStore.isLoading = true
            try {
                const response = await api.post(`/todo/submit`, form)
                response.data.data.forEach((item) => {
                    this.datas = this.datas.filter((todo) => {
                        return todo.id !== item.id
                    })
                })
                responseStore.addSuccess(response.data.message)
            } catch (error) {
                console.log(error)
            } finally {
                uiStore.isLoading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
