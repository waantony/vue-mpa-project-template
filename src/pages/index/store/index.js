import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import { removeAllSession, removeAllLocal } from '@/utils/storage'
import { getType } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  state: {
    userInfo: {},
  },

  // mutations 下的方法以 handle 开始，表示同步执行
  mutations: {
    /**
     * 改变 state 中存储的数据的方法
     *
     * @param { Object } payload 要改变的 state 中的属性（key）和值(value)组成的对象，或对象数组
     */
    handleChangeState (state, payload) {
      const payloadType = getType(payload)
      if (payloadType !== 'Object') {
        return
      }
      Object.entries(payload).forEach(entry => {
        state[entry[0]] = entry[1]
      })
    },
    /**
     * 注销登录的方法
     */
    handleLogout (state) {
      state.userInfo = {}
      removeAllSession()
      removeAllLocal()
    },
  },

  // actions 下的方法命名以 action 开头，表示是异步执行的 action
  actions: {
    /**
     * 请求用户信息的方法
     *
     * @param { * } payload 用户传入的参数
     */
    actionReqUserInfo ({ commit, dispatch, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        // 发送请求，在 .then() 中执行以下代码
        commit('handleChangeState', {
          userInfo: {}, // {} 应为请求响应回来的数据
        })
        resolve()
      })
    },
  },
  modules: {
  },
})
