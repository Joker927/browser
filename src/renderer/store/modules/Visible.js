const state = {
    menuState: null, //导航菜单显示状态

    groupState: false, //群组显示
    groupId: '', //群组ID
    groupAdd: false, //true:新建立群组、群组添加成员
    loading: false
}

const mutations = {
    SET_NAV_MENU_STATE(state, res) {
        if (res && state.menuState === res) {
            state.menuState = null
        } else {
            state.menuState = res
        }
    },
    SET_LOADING_STATE(state, bol) {
        state.loading = bol
    },
    SET_GROUP_STATE(state, res) {
        if (res) {
            res.id ? (state.groupId = res.id) : (state.groupId = '')
            res.add ? (state.groupAdd = true) : (state.groupAdd = '')
            state.groupState = true
        } else {
            state.groupState = !state.groupState
        }
    }
}

const actions = {
    someAsyncTask({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    state,
    mutations,
    actions
}
