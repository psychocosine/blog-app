import Vuex from 'vuex'
import Vue from 'vue'

import {login, getUserInfo, logout, register} from '@/api/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    account: '',
    avatar: '',
    admin:false
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_ADMIN:(state, admin) =>{
      state.admin = admin
    }
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user.username, user.password).then(data => {
          console.log(data.success)
          if(!data.success){
            throw Error('用户名或密码错误')
          }
          commit("SET_ACCOUNT",user.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this
      return new Promise((resolve, reject) => {
        getUserInfo().then(data => {
          if (data.is_login==true) {
            commit('SET_ACCOUNT', data.data[0].fields.username)
            // commit('SET_NAME', data.data.nickname)
            commit('SET_ID', data.data[0].pk)
            commit('SET_AVATAR', data.data[0].fields.avatar)
            commit('SET_ADMIN', data.data[0].fields.is_superuser)
          } else {
            commit('SET_ACCOUNT', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          commit('SET_ACCOUNT', '')
          commit('SET_AVATAR', '')
          commit('SET_ID', '')
          resolve()
          
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut({commit}) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        commit('SET_ACCOUNT', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        register(user).then((data) => {
          // commit('SET_TOKEN', data.data['Oauth-Token'])
          // setToken(data.data['Oauth-Token'])
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
