import request from '@/plugin/axios'

export function getRouteList() {
    return request({
        url: '/route',
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getRoute(id) {
    return request({
        url: '/route/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function saveRoute(data) {
    return request({
        url: '/route/save',
        method: 'post',
        data,
        loading: {
            type: 'nprogress',
            interval: 1000
        },
        success: {
            type: 'message',
            options: {
                message: '保存成功',
                type: 'success'
            }
        }
    })
}
export function delRoute(id) {
    return request({
        url: '/route/' + id,
        method: 'delete',
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}