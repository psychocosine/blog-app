import request from '@/request'
import qs from "qs"
export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/account/login/',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/account/logout/',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/account/is_login/',
    method: 'get'
  })
}

export function register(userData) {
  const data = {
    username:userData.username,
    password:userData.password,
    email:userData.email,
    birthday:userData.birthday
  }

  return request({
    url: '/account/register/',
    method: 'post',
    data:qs.stringify(data)
  })
}
export async function getUsernameById(id){
   var res = await request({
    url:`/account/query_username_by_id/?id=${id}`,
    method:'get'
  })
  return res.data;
  
}
export function changeUserInfo(data){
  return request({
    url:`/account/${data.id}/`,
    method:'patch',
    data:data
  })
}