export const permissionMenu = [
    {
        title: "系统",
        path: "/system",
        icon: "folder-o",
        children: [
            {
                title: "系统设置",
                icon: "folder-o",
                children: [
                    {
                        title: "菜单管理",
                        path: "/system/menu",
                        icon: "folder-o"
                    },
                    {
                        title: "路由管理",
                        path: "/system/route",
                        icon: "folder-o"
                    }
                ]
            },
            {
                title: "权限管理",
                icon: "folder-o",
                children: [
                    {
                        title: "功能管理",
                        path: "/system/function",
                        icon: "folder-o"
                    },
                    {
                        title: "角色管理",
                        path: "/system/role",
                        icon: "folder-o"
                    },
                    {
                        title: "角色权限管理",
                        path: "/system/rolepermission",
                        icon: "folder-o"
                    },
                    {
                        title: "角色用户管理",
                        path: "/system/roleuser",
                        icon: "folder-o"
                    },
                    {
                        title: "用户角色管理",
                        path: "/system/userrole",
                        icon: "folder-o"
                    }
                ]
            },
            {
                title: "组织架构",
                icon: "folder-o",
                children: [
                    {
                        title: "部门管理",
                        path: "",
                        icon: "folder-o"
                    },
                    {
                        title: "职位管理",
                        path: "",
                        icon: "folder-o"
                    }
                ]
            },
            {
                title: "用户管理",
                icon: "folder-o",
                children: [
                    {
                        title: "用户管理",
                        path: "/system/user",
                        icon: "folder-o"
                    }
                ]
            }
        ]
    }
]

export const permissionRouter = [
    {
        name: "系统设置",
        path: "/system",
        component: "layoutHeaderAside",
        componentPath:'layout/header-aside/layout',
        meta: {
            requiresAuth: true,
            title: '系统设置'
        },
        children: [
            {
                name: "menuPage",
                path: "/system/menu",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    cache:true,
                    title: '菜单管理'
                },
                component: "menu",
                componentPath:'pages/sys/menu/index',
            },
            {
                name: "routePage",
                path: "/system/route",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '路由管理'
                },
                component: "route",
                componentPath:'pages/sys/menu/index',
            }
        ]
    },
    {
        name: "权限管理",
        path: "/system",
        component: "layoutHeaderAside",
        componentPath:'layout/header-aside/layout',
        meta: {
            requiresAuth: true,
            title: '权限管理'
        },
        children: [
            {
                name: "功能管理",
                path: "/system/function",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '功能管理'
                },
                component: "function",
                componentPath:'pages/sys/menu/index',
            },
            {
                name: "角色管理",
                path: "/system/role",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '角色管理'
                },
                component: "role",
                componentPath:'pages/sys/menu/index',
            },
            {
                name: "角色权限管理",
                path: "/system/rolepermission",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '角色权限管理'
                },
                component: "rolePermission",
                componentPath:'pages/sys/menu/index',
            },
            {
                name: "角色用户权限管理",
                path: "/system/roleuser",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '角色用户管理'
                },
                component: "roleUser",
                componentPath:'pages/sys/menu/index',
            },
            {
                name: "用户角色权限管理",
                path: "/system/userrole",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '用户角色管理'
                },
                component: "userRole",
                componentPath:'pages/sys/menu/index',
            }
        ]
    },
    {
        name: "用户管理",
        path: "/system",
        component: "layoutHeaderAside",
        componentPath:'layout/header-aside/layout',
        meta: {
            requiresAuth: true,
            title: '用户管理'
        },
        children: [
            {
                name: "用户管理",
                path: "/system/user",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '用户管理'
                },
                component: "user",
                componentPath:'pages/sys/menu/index',
            }
        ]
    }
]