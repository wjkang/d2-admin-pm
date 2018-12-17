import request from '@/plugin/axios'

export function getMenuList() {
    return request({
        url: '/menu',
        method: 'get',
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        }
    })
}
export function getMenu(id) {
    return request({
        url: '/menu/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function saveMenu(data) {
    return request({
        url: '/menu/save',
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
export function delMenu(id) {
    return request({
        url: '/menu/' + id,
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