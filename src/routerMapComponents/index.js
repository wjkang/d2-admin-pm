import layoutHeaderAside from '@/layout/header-aside'
export default {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import('@/pages/sys/menu'),
    "route": () => import('@/pages/sys/route'),
    "function": () => import('@/pages/permission/function'),
    "role": () => import('@/pages/permission/role'),
    "rolePermission": () => import('@/pages/permission/rolePermission'),
    "roleUser": () => import('@/pages/permission/roleUser'),
    "userRole": () => import('@/pages/permission/userRole'),
    "user": () => import('@/pages/permission/user')
}