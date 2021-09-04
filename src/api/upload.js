import request from '@/request'

export function upload(formdata) {
  return request({
    url: '/article/upload_file/',
    method: 'post',
    data: formdata
  })
}
