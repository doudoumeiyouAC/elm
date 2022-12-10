import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ // 插件，用于对vuex中某些状态进行持久化
    reducer: state => {
      return {
        userName: state.userName,
        isManage: state.isManage
      }
    }
  })],
  state: {
    isFooterShow: true,
    userName: '立即登录',
    isManage: false,
    city: {}
  },
  getters: {
  },
  mutations: {
    setIsFooterShow: (state,isShow) => {
      state.isFooterShow = isShow
    },
    setUserName: (state, userName) => {
      state.userName = userName
    },
    setIsManage: (state, bl) => {
      state.isManage = bl
    },
    setCity: (state, city) => {
      state.city = city
    }
  },
  actions: {
  },
  modules: {
  }
})
