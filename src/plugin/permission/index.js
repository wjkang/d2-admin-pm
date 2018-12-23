export default {
    install(Vue, options) {
        let store = options.store
        Vue.directive('permission', {
            bind: function (el, binding, vnode) {
                let needPermissions = binding.value;
                let permissions = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
                let isAdmin = store.state.d2admin.permission.isAdmin;
                let hasPermission = permissions.some(s => {
                    return needPermissions.indexOf(s) > -1;
                })
                if (!hasPermission && !isAdmin) {
                    el.parentNode.removeChild(el);
                }
            }
        })
    }
}