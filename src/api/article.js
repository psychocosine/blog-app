import request from '@/request'
import qs from "qs"
import { getUsernameById } from './login'
export function getArticles(query, page) {
  return new Promise((resolve,reject)=>{
    console.log("article.js "+query.author_id)
    
    request({
      url: '/article/list/',
      method: 'get',
      params: {
        size:page.size,
        // sort:"create_time",
        page:page.page,
        search:query.search,
        tag_name:query.tagId==''?undefined:query.tagId,
        author:query.author_id,
        content__contains:query.content==""?undefined:query.content,
        category_name:query.categoryId==''?undefined:query.categoryId,
        year:query.year,
        month:query.month
      }
    }).then(res=>{
      res = res.data.results
      var data = []
      for(var i=0;i<res.length;i++){
        var tg = []
        for(var j=0;j<res[i].tag_name.length;j++){
          tg[j]={tagname:res[i].tag_name[j]}
        }
        var tmp = {
          author:{nickname:res[i].author},
          commentCounts:res[i].comment_num,
          createDate:res[i].create_time,
          id:res[i].id,
          summary:res[i].summary,
          tags:tg,
          title:res[i].title,
          viewCounts:res[i].page_view,
          weight:0
        }
        data[i]=tmp;
      }
      resolve(data)
    })
  })
}

export function getHotArtices() {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/list/',
      method: 'get',
      params: {
        size:5,
        page:1,
        ordering:'-page_view'
      }
    }).then(res=>{
      var data = {
        data:[]
      }
      res = res.data.results;
      for(var i=0;i<res.length;i++){
        data.data.push({id:res[i].id,title:res[i].title})
      }
      resolve(data)
    })
  })
}

export function getNewArtices() {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/list/',
      method: 'get',
      params: {
        size:5,
        ordering:"-create_time",
        page:1,
      }
    }).then(res=>{
      var data = {
        data:[]
      }
      res = res.data.results;
      for(var i=0;i<res.length;i++){
        data.data.push({id:res[i].id,title:res[i].title})
      }
      resolve(data)
    })
  })
}

export function viewArticle(id) {
  return new Promise((resolve,reject)=>{
    request({
      url: ` /article/browse/?id=${id}`,
      method: 'get'
    }).then(res=>{
      res = res.data[0]
      var tg = [];
      for(var i=0;i<res.fields.tag_name.length;i++){
        tg.push({id:res.fields.tag_name[i],tagname:res.fields.tag_name[i]})
      }
      
      var data = {
        data:{
          author:{avatar:res.fields.author.avatar,id:res.fields.author.id,nickname:res.fields.author.username},
          body:{content:res.fields.content,contentHtml:res.content_HTML,id:res.pk},
          category:{categoryname:res.fields.category_name,id:res.fields.category_name},
          commentCounts:res.fields.comment_num,
          createDate:res.fields.create_time,
          id:res.pk,
          summary:res.fields.summary,
          tags:tg,
          title:res.fields.title,
          viewCounts:res.fields.page_view,
          weight:0
        }
      };
      resolve(data)
    }).catch(e=>{
      reject(e)
    })
  })
}
export function getArticleCt(id) {
  return request({
    url:''
  })
}

export function getArticlesByCategory(id) {
  return request({
    url: `/articles/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/articles/tag/${id}`,
    method: 'get'
  })
}


export function publishArticle(article) {
  return request({
    url: '/article/create/',
    method: 'post',
    data:article
    // data: qs.stringify(article)
  })
}

export function listArchives() {
  return new Promise((resolve,reject)=>{
    request({
      url: '/article/listArchives',
      method: 'get'
    }).then(r=>{
      var data = r.data.map(item=>({year:item.fields.year,month:item.fields.month,count:item.fields.count}))
      resolve(data)
    })
  })
}

export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  })
}

export function deleteArticle(id){
  return request({
    url: ` /article/delete/`,
    method: 'post',
    data:qs.stringify({id:id})
  })
}

export function updateArticle(article) {
  return request({
    url:'/article/update/',
    method:'post',
    data:qs.stringify(article)
  })
}