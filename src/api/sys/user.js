import request from '@/plugin/axios'
export function getUser(id) {
    return request({
        url: '/user/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getUserPagedList(query) {
    return request({
        url: '/user/pagedlist',
        method: 'get',
        params: query
    })
}
export function editRoleUser(data) {
    return request({
        url: '/user/editroleuser',
        method: 'post',
        data: data
    })
}
export function saveUser(data) {
    return request({
        url: '/user/save',
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