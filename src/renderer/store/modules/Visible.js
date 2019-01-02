const state = {
    menuState: null, //导航菜单显示状态
    groupState: false, //群组显示
    groupId: '', //群组ID
    groupAdd: false //true:新建立群组、群组添加成员
}

const mutations = {
    SET_MENU_STATE(state, res) {
        if (state.menuState === res && res) {
            state.menuState = null
        } else {
            state.menuState = res
        }
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
