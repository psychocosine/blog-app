import request from '@/request'
import qs from 'qs'
export function getAllArticles(query) {
    var params = query;
    params['format'] = 'json'
    return request({
        method: 'get',
        url: '/blog_admin/articles',
        params: params
    })
}

export function getAllUsers(query) {
    var params = query;
    params['format'] = 'json'
    return request({
        method: 'get',
        url: '/blog_admin/users',
        params: params
    })
}
export function getBrowserRecords(query) {
    var params = query;
    params['format'] = 'json'
    return request({
        method: 'get',
        url: '/blog_admin/browser-record',
        params: params
    })
}
export function deleteObj(pk,url){
    return request({
        method:'delete',
        url:'/blog_admin'+url+`/${pk}`,
    })
}
export function deleteZero(){   
    return request({
        method:'delete',
        url:'/blog_admin/delete-zero/',
    })
}
export function batch_create(data){
    data.default_password = data.default_password==''?undefined:data.default_password;
    return request({
        method:'post',
        url:'/account/create_users/',
        data:qs.stringify(data)
    })
}