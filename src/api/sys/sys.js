import request from '@/plugin/axios'
export function resetDb() {
    return request({
        url: '/resetdb',
        method: 'post',
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '初始化...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        },
        success: {
            type: 'message',
            options: {
                message: '初始化成功',
                type: 'success'
            }
        }
    })
}
