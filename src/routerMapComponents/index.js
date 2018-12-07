import layoutHeaderAside from '@/layout/header-aside'
export default {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import(/* webpackChunkName: "menu" */'@/pages/sys/menu'),
    "route": () => import(/* webpackChunkName: "route" */'@/pages/sys/route'),
    "function": () => import(/* webpackChunkName: "function" */'@/pages/permission/function'),
    "role": () => import(/* webpackChunkName: "role" */'@/pages/permission/role'),
    "rolePermission": () => import(/* webpackChunkName: "rolepermission" */'@/pages/permission/rolePermission'),
    "roleUser": () => import(/* webpackChunkName: "roleuser" */'@/pages/permission/roleUser'),
    "userRole": () => import(/* webpackChunkName: "userrole" */'@/pages/permission/userRole'),
    "user": () => import(/* webpackChunkName: "user" */'@/pages/permission/user')
}