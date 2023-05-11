import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/pages/Login.vue'),
    },
    {
        path: '/enterprises',
        name: 'enterprises',
        component: () => import('@/pages/Enterprise/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/enterprises/create',
        name: 'enterprise.add',
        component: () => import('@/pages/Enterprise/Create.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
