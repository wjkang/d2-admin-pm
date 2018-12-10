import request from '@/plugin/axios'

export function getMenuList(data) {
    return request({
        url: '/login',
        method: 'post',
        data,
        success:{
            type:'message',
            options:{
                message:'加载成功',
                type:'success'
            }
        }
    })
}