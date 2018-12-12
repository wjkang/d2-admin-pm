import request from '@/plugin/axios'
export function getRole(id) {
    return request({
        url: '/role/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getRolePagedList(query) {
    return request({
        url: '/role/pagedlist',
        method: 'get',
        params: query,
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function delRole(id) {
    return request({
        url: '/role/del',
        method: 'delete',
        params: id
    })
}
export function delRoles(ids) {
    return request({
        url: '/role/batchdel',
        method: 'delete',
        params: ids
    })
}
export function saveRole(data) {
    return request({
        url: '/role/save',
        method: 'post',
        data: data,
        success: {
            type: 'message',
            options: {
                message: '保存成功',
                type: 'success'
            }
        }
    })
}