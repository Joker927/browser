import * as api from '@/api'

const delay = 30000000
const timer = {
    requestsTimer: null,
    dynamicTimer: null
}
const state = {
    requestsCount: 0,
    dynamicCount: 0
}

const mutations = {
    SET_COUNT(state, res) {
        state[res.name] = res.count
    }
}

const actions = {
    SET_BADGE_COUNT({ dispatch }) {
        let userInfo = localStorage.getItem('USERINFO')
        let userId = null
        if (typeof userInfo === 'string') {
            userInfo = JSON.parse(userInfo)
            userId = userInfo.userId
        }
        if (!userId) return false
        let data = {
            userId
        }
        dispatch('SET_REQUESTS_COUNT', { data, delay })
        dispatch('SET_DYNAMIC_COUNT', { data, delay })
    },
    SET_REQUESTS_COUNT({ commit }, data) {
        let { data: reqs, delay } = data
        const fn = reqs => {
            api.friendRequestList(reqs).then(res => {
                if (res.code === 0) {
                    commit('SET_COUNT', {
                        name: 'requestsCount',
                        count: res.data.length
                    })
                } else {
                    clearInterval(timer.requestsTimer)
                }
            })
        }

        fn(reqs)
        timer.requestsTimer = setInterval(() => {
            fn(reqs)
        }, delay)
    },
    SET_DYNAMIC_COUNT({ commit }, data) {
        let { data: reqs, delay } = data
        const fn = reqs => {
            api.snsInfromlist(reqs).then(res => {
                if (res.code === 0) {
                    commit('SET_COUNT', {
                        name: 'dynamicCount',
                        count: res.data.totalCount
                    })
                } else {
                    clearInterval(timer.dynamicTimer)
                }
            })
        }
        fn(reqs)
        timer.dynamicTimer = setInterval(() => {
            fn(reqs)
        }, delay)
    }
}

export default {
    state,
    mutations,
    actions
}
