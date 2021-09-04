import request from '@/request'

export function getAllTags() {
  return request({
    url: '/article/tag/query/',
    method: 'get',
    params:{
      all:1
    }
  })
}

export function getAllTagsDetail() {
  return request({
    url: '/article/tag/query/?all=1',
    method: 'get',
  })
}

export function getHotTags() {
  return request({
    url: '/article/tag/query/?all=1',
    method: 'get',
  })
}

export function getTag(id) {
  return request({
    url: `/tags/${id}`,
    method: 'get',
  })
}

export function getTagDetail(id) {
  return request({
    url: `/article/tag/query/`,
    method: 'get',
    params:{
      name:id
    }
  })
}
