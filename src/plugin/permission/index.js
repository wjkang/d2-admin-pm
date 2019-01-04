export default {
    install(Vue, options) {
        let store = options.store
        Vue.directive('permission', {
            bind: function (el, binding, vnode) {
                let isAdmin = store.state.d2admin.permission.isAdmin;
                if (isAdmin) {
                    return
                }
                let checkCodes = [];
                if (binding.arg === "function") {
                    checkCodes = store.state.d2admin.permission.functions;
                } else if (binding.arg === "role") {
                    checkCodes = store.state.d2admin.permission.roles;
                } else {
                    checkCodes = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
                }
                let access = true;
                if (binding.modifiers.all) {
                    for (let need of binding.value) {
                        if (checkCodes.some(s => s !== need)) {
                            access = false;
                            break;
                        }
                    }
                } else {
                    access = false;
                    for (let need of binding.value) {
                        if (checkCodes.some(s => s === need)) {
                            access = true;
                            break;
                        }
                    }
                }
                if (!access) {
                    el.parentNode.removeChild(el);
                }
            }
        })
        Vue.prototype.hasPermissions = (permissions) => {
            let isAdmin = store.state.d2admin.permission.isAdmin;
            if (isAdmin) {
                return true
            }
            let has = false;
            let checkCodes = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
            for (let need of permissions) {
                if (checkCodes.some(s => s === need)) {
                    has = true;
                    break;
                }
            }
            return has
        }
        Vue.prototype.hasFunctions = (functions) => {
            let isAdmin = store.state.d2admin.permission.isAdmin;
            if (isAdmin) {
                return true
            }
            let has = false;
            let checkCodes = store.state.d2admin.permission.functions
            for (let need of functions) {
                if (checkCodes.some(s => s === need)) {
                    has = true;
                    break;
                }
            }
            return has;
        }
        Vue.prototype.hasRoles = (roles) => {
            let isAdmin = store.state.d2admin.permission.isAdmin;
            if (isAdmin) {
                return true
            }
            let has = false;
            let checkCodes = store.state.d2admin.permission.roles
            for (let need of roles) {
                if (checkCodes.some(s => s === need)) {
                    has = true;
                    break;
                }
            }
            return has;
        }
    }
}