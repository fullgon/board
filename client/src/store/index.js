import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    logout(state){
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  }
})
