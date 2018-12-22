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
                    },
                    {
                        title: "角色管理",
                        path: "/system/role",
                        icon: "folder-o"
                    },
                    {
                        title: "用户管理",
                        path: "/system/user",
                        icon: "folder-o"
                    },
                    {
                        title: "接口管理",
                        path: "/system/interface",
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
            }
        ]
    }
]

export const permissionRouter = [
    {
        name: "系统设置",
        path: "/system",
        component: "layoutHeaderAside",
        componentPath: 'layout/header-aside/layout',
        meta: {
            title: '系统设置'
        },
        children: [
            {
                name: "MenuPage",
                path: "/system/menu",
                meta: {
                    cache: true,
                    title: '菜单管理'
                },
                component: "menu",
                componentPath: 'pages/sys/menu/index',
            },
            {
                name: "RoutePage",
                path: "/system/route",
                meta: {
                    cache: true,
                    title: '路由管理'
                },
                component: "route",
                componentPath: 'pages/sys/route/index',
            },
            {
                name: "RolePage",
                path: "/system/role",
                meta: {
                    cache: true,
                    title: '角色管理'
                },
                component: "role",
                componentPath: 'pages/sys/role/index',
            },
            {
                name: "UserPage",
                path: "/system/user",
                meta: {
                    cache: true,
                    title: '用户管理'
                },
                component: "user",
                componentPath: 'pages/sys/user/index',
            }
        ]
    }
]