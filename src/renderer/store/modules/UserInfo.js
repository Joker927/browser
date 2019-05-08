const state = {
    userInfo: {},
    token: '',
    seed: localStorage.getItem('SEED'),
    addressList: JSON.parse(localStorage.getItem('ADDRESSLIST')), //用户账户地址列表
    lastAddress: localStorage.getItem('LASTADDRESS')
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
        localStorage.setItem('TOKEN', res.userInfo.token)
    },
    REFRESH_USER_INFO(state, res) {
        state.userInfo = res
        localStorage.setItem('USERINFO', JSON.stringify(res))
    },
    GET_USER_INFO(state) {
        let userInfo = localStorage.getItem('USERINFO')
        state.token = localStorage.getItem('TOKEN') || ''
        if (userInfo) {
            state.userInfo = JSON.parse(userInfo)
        } else {
            state.userInfo = {}
        }
    },
    SET_ADDRESS_LIST(state, res) {
        state.addressList = res
        localStorage.setItem('ADDRESSLIST', JSON.stringify(res))
    },
    SET_ADDRESS_LAST(state, res) {
        localStorage.setItem('LASTADDRESS', res)
    },
    SET_SEED(state, res) {
        state.seed = res
        localStorage.setItem('SEED', res)
    }
}

const actions = {
    SET_USER_INFO({ commit }, data) {
        commit('SET_USER_INFO', data)
    },
    LOG_OUT({ commit }) {
        commit('REMOVE_USER_INFO')
        commit('SET_COUNT', { name: 'requestsCount', count: 0 }, { root: true })
        commit('SET_COUNT', { name: 'dynamicCount', count: 0 }, { root: true })
    }
}

export default {
    state,
    mutations,
    actions
}
