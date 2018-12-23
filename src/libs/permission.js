export default {
    access: function (config, store) {
        if (config.permission && config.permission.length > 0) {
            let needPermissions = config.permission;
            let permissions = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
            let isAdmin = store.state.d2admin.permission.isAdmin;
            let hasPermission = permissions.some(s => {
                return needPermissions.indexOf(s) > -1;
            })
            if (!hasPermission && !isAdmin) {
                return false
            }
        }
        return true
    }
}