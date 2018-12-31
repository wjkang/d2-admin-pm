import { match } from 'matchit';
export default {
    access: function (config, store) {
        let functionAccess = true
        let interfaceAccess = true
        let isAdmin = store.state.d2admin.permission.isAdmin;
        if (config.permission && config.permission.length > 0) {
            let needPermissions = config.permission;
            let permissions = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
            let hasPermission = permissions.some(s => {
                return needPermissions.indexOf(s) > -1;
            })
            if (!hasPermission && !isAdmin) {
                functionAccess = false
            }
        }
        if (config.interfaceCheck) {
            let path = config.url.replace(config.baseURL, "");
            let method = config.method.toUpperCase();
            let interfaces = store.state.d2admin.permission.interfaces[method]
            let matched = match(path, interfaces)
            if (matched.length == 0) {
                interfaceAccess = false
            }
        }
        return functionAccess && interfaceAccess
    }
}