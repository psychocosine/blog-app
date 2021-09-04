import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

import {Message} from 'element-ui';


import store from '@/store'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/settings',
      component: r => require.ensure([], () => r(require('@/views/blog/Settings')), 'settings'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/admin',
      redirect:'/admin/user',
      component: r => require.ensure([], () => r(require('@/views/admin/index')), 'admin'),
      meta: {
        requireLogin: true,
        requireAdmin: true,
      },
      children:[
        {
          path:'user',
          component: r => require.ensure([], () => r(require('@/views/admin/user')), 'user'),
        },
        {
          path:'article',
          component: r => require.ensure([], () => r(require('@/views/admin/article')), 'article'),
        },
        {
          path:'browser-record',
          component: r => require.ensure([], () => r(require('@/views/admin/browser')), 'browser'),
        }
      ]
    },
    {
      path: '/write/:id?',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
      meta: {
        requireLogin: true
      },
    },
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
        },
        {
          path: '/archives/:year?/:month?',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives')
        },
        {
          path: '/messageBoard',
          component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
        },
        {
          path: '/view/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
        },
        {
          path: 'type/:type/all',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
        },
        {
          path: 'type/:type/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
        }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    },
    

  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('getUserInfo').then(r=>{
    if (store.state.account.length!=0) {
      if (to.path === '/login') {
        next({path: '/'})
      } else {
        if(to.matched.some(r=>r.meta.requireAdmin)&&!store.state.admin) {
          Message({
            type:'error',
            message:'您不是系统管理员'
          })
          
        } else {
          next()
        }
      }
    } else {
      if (to.matched.some(r => r.meta.requireLogin)) {
        Message({
          type: 'warning',
          showClose: true,
          message: '请先登录哦'
        })
      }
      else {
        next();
      }
    }
  })
  
  
})


export default router
