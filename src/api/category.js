import request from '@/request'

export function getAllCategorys() {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/category/query/?all=1',
      method: 'get',
    }).then(r=>{
      var res= {
        data:[]
      };
      for(var i=0;i<r.data.length;i++){
        res['data'].push({
          number_with_this:r.data[i].number_with_this,
          categoryname:r.data[i].name,
        })
      }
      resolve(res);
    })
  })
}

export function getAllCategorysDetail() {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/category/query/?all=1',
      method: 'get',
    }).then(r=>{
      var res= {
        data:[]
      };
      for(var i=0;i<r.data.length;i++){
        res['data'].push({
          number_with_this:r.data[i].number_with_this,
          categoryname:r.data[i].name,
        })
      }
      resolve(res);
    })
  })
}

export function getCategory(id) {
  return request({
    url: `/categorys/${id}`,
    method: 'get',
  })
}

export function getCategoryDetail(id) {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/category/query/',
      method: 'get',
      params:{
        name:id,
      }
    }).then(r=>{
      var res= {
        data:{
          categoryname:r.data[0].name,
          number_with_this:r.data[0].number_with_this
        }
      };
      resolve(res)
    })
  })
}
