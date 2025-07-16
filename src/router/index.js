import { useAuthStore } from '@/stores/auth'
import { useResponseStore } from '@/stores/response'
import { useUIStore } from '@/stores/ui'
import { createRouter, createWebHistory } from 'vue-router'

const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
            title: 'Login',
            guest: true,
        },
    },
]
const adminRoutes = [
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: {
            auth: true,
            role: 'admin',
            title: 'Dashboard',
        },
    },
    {
        path: '/admin/domain',
        name: 'admin.domain',
        component: () => import('@/views/admin/domain/Index.vue'),
        meta: {
            auth: true,
            role: 'admin',
            title: 'Domain',
        },
    },
    {
        path: '/admin/pelanggan',
        name: 'admin.pelanggan.index',
        component: () => import('@/views/admin/pelanggan/Index.vue'),
        meta: {
            auth: true,
            role: 'admin',
            title: 'Pelanggan',
        },
    },
    {
        path: '/admin/todo',
        name: 'admin.todo.index',
        component: () => import('@/views/admin/todo/Index.vue'),
        meta: {
            auth: true,
            role: 'admin',
            title: 'Todo List',
        },
    },
    {
        path: '/admin/nameserver',
        name: 'admin.nameserver.index',
        component: () => import('@/views/admin/nameserver/Index.vue'), // <-- Sesuaikan folder dan nama file
        meta: {
            auth: true,
            role: 'admin',
            title: 'Name Server',
        },
    },
]


const karyawanRoutes = [
    {
        path: '/dashboard',
        name: 'karyawan.dashboard',
        component: () => import('@/views/karyawan/Dashboard.vue'),
        meta: {
            auth: true,
            role: 'karyawan',
            title: 'Dashboard',
        },
    },
    {
        path: '/todo',
        name: 'karyawan.todo',
        component: () => import('@/views/karyawan/todo/Index.vue'),
        meta: {
            auth: true,
            role: 'karyawan',
            title: 'Todo List',
        },
    },
]

const routes = [
    {
        path: '/',
        redirect: 'login',
    },
    ...adminRoutes,
    ...authRoutes,
    ...karyawanRoutes,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

// Loading
router.beforeEach((to, from, next) => {
    const ui = useUIStore()
    ui.startLoading()
    next()
})
router.afterEach(() => {
    const ui = useUIStore()
    setTimeout(() => ui.stopLoading(), 500)
})

// Auth Middleware
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token')
    const isLoggedIn = !!token

    if (to.matched.some((record) => record.meta.auth)) {
        if (!isLoggedIn) {
            return next({ name: 'login' })
        }

        try {
            const authStore = useAuthStore()
            const data = authStore.decryptedUserData

            if (!data) {
                localStorage.removeItem('jwt_token')
                localStorage.removeItem('userData')
                return next({ name: 'login' })
            }

            const requiredRole = to.meta.role
            if (requiredRole && data.role !== requiredRole) {
                const responseStore = useResponseStore()
                responseStore.addError('Anda Tidak Memiliki Akses ke Halaman ini!!')
                if (data.role === 'admin') {
                    return next({ name: 'admin.dashboard' })
                } else if (data.role === 'karyawan' || data.role === 'pkl') {
                    return next({ name: 'karyawan.dashboard' })
                } else {
                    return next({ name: 'login' })
                }
            }

            return next()
        } catch (err) {
            console.error('Terjadi error saat ambil data user:', err)
            return next({ name: 'login' })
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (isLoggedIn) {
            const authStore = useAuthStore()
            const data = authStore.decryptedUserData
            if (!data) {
                localStorage.removeItem('jwt_token')
                localStorage.removeItem('userData')
                return next()
            }
            if (data.role == 'admin') {
                return next({ name: 'admin.dashboard' })
            } else if (data.role == 'karyawan' || data.role == 'pkl') {
                return next({ name: 'karyawan.dashboard' })
            }
        }
        return next()
    } else {
        return next()
    }
})

const APP_NAME = import.meta.env.VITE_APP_NAME
router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find((r) => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find((r) => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) =>
        el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map((tagDef) => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach((key) => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach((tag) => document.head.appendChild(tag))

    next()
})

export default router
