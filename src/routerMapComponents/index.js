import layoutHeaderAside from '@/layout/header-aside'
export default {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import(/* webpackChunkName: "menu" */'@/pages/sys/menu'),
    "route": () => import(/* webpackChunkName: "route" */'@/pages/sys/route'),
    "role": () => import(/* webpackChunkName: "role" */'@/pages/sys/role'),
    "user": () => import(/* webpackChunkName: "user" */'@/pages/sys/user')
}