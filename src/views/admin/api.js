import request from '@/request'
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