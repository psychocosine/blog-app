import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'


const service = axios.create({
  baseURL: '',
  timeout: 10000
})
service.defaults.xsrfHeaderName = 'X-CSRFToken'
service.defaults.xsrfCookieName = 'csrftoken'

//request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {

    //全局统一处理 Session超时
    // if (response.headers['session_time_out'] == 'timeout') {
    //   store.dispatch('fedLogOut')
    // }

    const res = response.data;
    //0 为成功状态
    return response.data;
    if (res.success !="True") {
      //90001 Session超时
      if (res.code === 90001) {
        return Promise.reject('error');
      }

      //20001 用户未登录
      if (res.code === 20001) {
        console.info("用户未登录")

        Message({
          type: 'warning',
          showClose: true,
          message: '未登录或登录超时，请重新登录哦'
        })

        return Promise.reject('error');
      }

      //70001 权限认证错误
      if (res.code === 70001) {
        console.info("权限认证错误")
        Message({
          type: 'warning',
          showClose: true,
          message: '你没有权限访问哦'
        })
        
        return Promise.reject('error');
      }

      return Promise.reject(res.msg);
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject('error')
  })

export default service