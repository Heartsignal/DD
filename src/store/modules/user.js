import {  logout, getInfo } from '@/api/login'
import login from '@/api/edu/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: sessionStorage.getItem("id")!=undefined? JSON.parse(sessionStorage.getItem("id")) : '',
    haveCourseIds: sessionStorage.getItem("haveCourseIds")!=undefined? JSON.parse(sessionStorage.getItem("haveCourseIds")) : [],
    role: sessionStorage.getItem("role")!=undefined?JSON.parse(sessionStorage.getItem("role")) : ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
      sessionStorage.setItem("id", JSON.stringify(id))
    },
    SET_HAVECOURSEIDS: (state, haveCourseIds) => {
      state.haveCourseIds = haveCourseIds
      sessionStorage.setItem("haveCourseIds", JSON.stringify(haveCourseIds))
    },
    SET_ROLE: (state, role) => {
      state.role = role
      sessionStorage.setItem("role", JSON.stringify(role))
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data
    //       setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    Login({ commit }, userInfo) {
      console.log("哈哈哈哈哈哈")
      const username = userInfo.username
      return new Promise((resolve, reject) => {
        login.login(username, userInfo.password).then(response => {
          console.log("哈哈哈哈哈哈")
          const data = response.data
          commit('SET_ID', data.id)
          commit('SET_HAVECOURSEIDS',data.results)
          resolve()
        }).catch(error => {
          console.log("xixiixixixxi")
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
