import layoutHeaderAside from '@/layout/header-aside'
export default {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import('@/pages/sys/menu'),
    "route": () => import('@/pages/sys/route')
}