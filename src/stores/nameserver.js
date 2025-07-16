import { defineStore } from 'pinia'
import axios from 'axios'

export const useNameserverStore = defineStore('nameserver', {
  state: () => ({
    items: [],
    token: localStorage.getItem('token') || '',
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
    },
    loading: false,
  }),

  actions: {
    async getAll(page = 1, perPage = 10) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:8000/api/name-servers?page=${page}&per_page=${perPage}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.items = res.data.data               // <-- ambil data
        this.pagination.total = res.data.total   // <-- total untuk pagination
        this.pagination.page = res.data.current_page
      } catch (error) {
        console.error('Gagal ambil data:', error)
      } finally {
        this.loading = false
      }
    },

    async save(data) {
      try {
        if (data.id) {
          await axios.put(`http://localhost:8000/api/name-servers/${data.id}`, data, {
            headers: { Authorization: `Bearer ${this.token}` }
          })
        } else {
          await axios.post('http://localhost:8000/api/name-servers', data, {
            headers: { Authorization: `Bearer ${this.token}` }
          })
        }

        await this.getAll(this.pagination.page, this.pagination.perPage)
      } catch (error) {
        console.error('Gagal simpan:', error)
      }
    },

    async remove(id) {
      try {
        await axios.delete(`http://localhost:8000/api/name-servers/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })

        const totalAfterDelete = this.pagination.total - 1
        const lastPage = Math.max(Math.ceil(totalAfterDelete / this.pagination.perPage), 1)
        const currentPage = Math.min(this.pagination.page, lastPage)

        await this.getAll(currentPage, this.pagination.perPage)
      } catch (error) {
        console.error('Gagal hapus:', error)
      }
    }
  }
})
