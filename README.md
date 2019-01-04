### 对d2-admin-start-kit的修改
`main.js`中`created`的内容转到`router/index.js`内，并添加相关逻辑

修改了**axios**相关代码`plugin/axios/index.js`，支持接口级权限控制，并且支持配置loading效果

vuex store中添加**menu**模块添加**fullAside**，完整路径`store.state.d2admin.menu.fullAside`

vuex store中添加**permission**模块，存储用户具备的功能权限码，角色编码，具备访问权限的接口以及是否管理员标识
```js
export default {
    namespaced: true,
    state: {
        //功能编码
        functions: [],
        //角色编码
        roles: [],
        //接口
        interfaces: {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        },
        //是否管理员
        isAdmin: false
    },
    mutations: {
        set(state, data) {
            state.functions = data.functions;
            state.roles = data.roles;
            state.isAdmin = data.isAdmin;
            state.interfaces = data.interfaces;
        }
    }
}
```

vuex store中的`account`模块的`load`action的这部分:
```js
 // DB -> store 持久化数据加载上次退出时的多页列表
await dispatch('d2admin/page/openedLoad', null, { root: true })
```
转到`router/index.js`内,需要在加载完权限路由后才执行

<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>