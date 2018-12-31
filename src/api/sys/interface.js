import request from '@/plugin/axios'
export function getInterface(id) {
    return request({
        url: '/interface/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getInterfacePagedList(query) {
    return request({
        url: '/interface/paged',
        method: 'get',
        params: query
    })
}
export function saveInterface(data) {
    return request({
        url: '/interface/save',
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
export function delInterface(id) {
    return request({
        url: '/interface/del',
        method: 'delete',
        params: { id: id },
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}
export function delInterfaces(ids) {
    return request({
        url: '/interface/batchdel',
        method: 'delete',
        params: ids,
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}
export function relateInterface(data) {
    return request({
        url: '/interface/relate',
        method: 'post',
        data: data
    })
}