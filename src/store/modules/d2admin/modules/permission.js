export default {
    namespaced: true,
    state: {
        //功能编码
        functions: [],
        //角色编码
        roles: [],
        //接口
        interfaces: [],
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