import Vue from 'vue'
import Vuex from 'vuex'
import PostsService from '@/services/PostsService'
Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    userInfo: null,
    testfield: ''
  },
  actions: {
    LOAD_USER_INFO: async ({ commit }) => {
      const data = await PostsService.fetchPosts()
      commit('SET_USER_INFO', { userInfo: data })
    },
    UPDATE_USER_INFO: ({ commit }, param) => {
      commit('UPDATE_USER_INFO', { updateInfo: param })
    },
    CHANGE_TEXT_FIELD: ({ commit }, param) => {
      commit('CHANGE_MESSAGE', { updateInfo: param })
    }
  },
  mutations: {
    SET_USER_INFO: (state, { userInfo }) => {
      state.userInfo = userInfo
    },
    UPDATE_USER_INFO: (state, { updateInfo }) => {
      state.userInfo.data.tasks.splice(updateInfo.idx, 1, updateInfo.prm)
      PostsService.updateInfo(state.userInfo.data)
    },
    CHANGE_MESSAGE: (state, { updateInfo }) => {
      state.testfield = updateInfo
    }
  }
})

export default store
