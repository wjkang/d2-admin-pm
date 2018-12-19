import request from '@/plugin/axios'
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