const state = {
  userInfo: {},
  token: ''
}

const mutations = {
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
    localStorage.removeItem('USERINFO')
    localStorage.removeItem('TOKEN')
  },
  SET_USER_INFO(state, res) {
    state.userInfo = res
    localStorage.setItem('USERINFO', JSON.stringify(res.userInfo))
    localStorage.setItem('TOKEN', res.token)
  },
  GET_USER_INFO(state) {
    let userInfo = localStorage.getItem('USERINFO')
    state.token = localStorage.getItem('TOKEN') || ''
    if (userInfo) {
      state.userInfo = JSON.parse(userInfo)
    } else {
      state.userInfo = {}
    }
  }
}

const actions = {
  SET_USER_INFO({ commit }, data) {
    commit('SET_USER_INFO', data)
  },
  REMOVE_USER_INFO({ commit }) {
    commit('REMOVE_USER_INFO')
  }
}

export default {
  state,
  mutations,
  actions
}
