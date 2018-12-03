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
        meta: {
            requiresAuth: true,
            title: '系统设置'
        },
        children: [
            {
                name: "菜单管理",
                path: "/system/menu",
                icon: "folder-o",
                meta: {
                    requiresAuth: true,
                    title: '菜单管理'
                },
                component: "menu"
            }
        ]
    }
]