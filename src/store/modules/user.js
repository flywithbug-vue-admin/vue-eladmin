import { getToken, setToken, removeToken } from '../../utils/auth'
import { getUserInfo, login, logout } from '@/api/user'
import { parseTime } from '@/utils/index'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    email: '',
    status: 0,
    userId: 0,
    // role:  -1 ,
    roles: [],
    createTime: undefined
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_CREATE_TIME: (state, createTime) => {
      state.createTime = createTime
    }
  },
  actions: {
    Login({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user.username, user.password).then(response => {
          const token = response.token
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.user
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_USER_ID', data.id)
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_STATUS', data.status)
          commit('SET_CREATE_TIME', parseTime(data.createTime))
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut(context) {
      context.commit('LogOut')
      return new Promise(resolve => {
        context.commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          reject(error)
        })
      })
    }
  }
}

export default user
