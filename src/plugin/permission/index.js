export default {
    install(Vue, options) {
        let store = options.store
        Vue.directive('permission', {
            bind: function (el, binding, vnode) {
                let isAdmin = store.state.d2admin.permission.isAdmin;
                if (isAdmin) {
                    return
                }
                let needPermissions = binding.value;
                let permissions = store.state.d2admin.permission.functions.concat(store.state.d2admin.permission.roles);
                let hasPermission = permissions.some(s => {
                    return needPermissions.indexOf(s) > -1;
                })
                if (!hasPermission && !isAdmin) {
                    el.parentNode.removeChild(el);
                }

                let checkCodes = [];
                if (binding.arg === "function") {
                    checkCodes = USER_PERMISSION;
                } else if (binding.arg === "role") {
                    checkCodes = USER_ROLE;
                } else {
                    checkCodes = USER_PERMISSION.join(USER_ROLE);
                }
                let access = true;
                if (binding.modifiers.all) {
                    for (let need of binding.value) {
                        if (!checkCodes.some(s => s === need)) {
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
            }
        })
    }
}