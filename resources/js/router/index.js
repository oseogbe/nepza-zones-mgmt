import { createRouter, createWebHistory } from "vue-router";
import useUser from "@/composables/user";

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("@/pages/Login.vue"),
        meta: {
            guestOnly: true,
        },
    },
    {
        path: "/enterprises",
        name: "enterprises",
        component: () => import("@/pages/Enterprise/Index.vue"),
        meta: {
            authOnly: true,
        },
    },
    {
        path: "/enterprises/create",
        name: "enterprise.add",
        component: () => import("@/pages/Enterprise/Create.vue"),
        meta: {
            authOnly: true,
        },
    },
    {
        path: "/enterprises/:id",
        name: "enterprise",
        component: () => import("@/pages/Enterprise/Single.vue"),
        meta: {
            authOnly: true,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/pages/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { initUser, user } = useUser();
    await initUser();

    if (to.matched.some((record) => record.meta.authOnly)) {
        if (!user.value) {
            next({
                name: "login",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
        if (user.value) {
            next({
                name: "enterprises",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
