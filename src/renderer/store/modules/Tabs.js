const state = {
    homeShow: true,
    tabIdx: -1,
    tabs: [
        // {
        //     title: '百度',
        //     isShow: false,
        //     url: 'https://www.baidu.com/'
        // },
        // {
        //     title: '新浪',
        //     isShow: false,
        //     url: 'https://www.sina.com.cn/'
        // }
    ]
}
const mutations = {
    ALL_SHOW_FALSE(state, index) {
        state.homeShow = false
        state.tabIdx = index
        state.tabs.forEach(val => {
            val.isShow = false
        })
        state.tabs[index].isShow = true
    },
    SET_TAB_ATTR(state, { index, key, value }) {
        state.tabs[index][key] = value
    },
    ADD_TABS(state, res) {
        state.tabs.push(res)
        let index = state.tabs.length - 1
        this.commit('ALL_SHOW_FALSE', index)
    },
    DELETE_TABS(state, index) {
        state.tabs.splice(index, 1)
        let current = index - 1
        state.tabIdx = current

        if (current != -1) {
            state.tabs[state.tabIdx]['isShow'] = true
        } else {
            state.homeShow = true
        }
    },
    SET_TAB_SHOW(state, index) {
        this.commit('ALL_SHOW_FALSE', index)
    },
    SHOW_HOME(state) {
        state.tabs.forEach(val => {
            val.isShow = false
        })
        state.tabIdx = -1
        state.homeShow = true
    },
    REFRESH_HOME(state, val) {
        state.homeShow = val
    }
}

const actions = {
    REFRESH_HOME({ commit, state }) {
        if (!state.homeShow) {
            return
        }
        commit('REFRESH_HOME', false)
        setTimeout(() => {
            commit('REFRESH_HOME', true)
        }, 30)
    }
}

export default {
    state,
    mutations,
    actions
}
