import request from '@/request'
import qs from "qs"

export function getCommentsByArticle(id) {
  return request({
    url: `/article/comment/query/`,
    method: 'get',
    params:{
      type:'get_comments_by_article',
      article_id:id
    }
  })
}

export function publishComment(comment) {

  return request({
    url: '/article/comment/create/',
    method: 'post',
    data: qs.stringify({
      article_id:comment.article.id,
      content:comment.content,
      level:comment.level,
      toUser:comment.toUser==""?undefined:comment.toUser.id,
      reply_to:comment.parent.id,
    })
  })
}
export function deleteComment(id){
  return request({
    url:'/article/comment/delete/',
    method:'post',
    data:qs.stringify({
      comment_id:id
    })
  })
}