const state = {
    mailState: false, //邮件显示
    mailListState: false, // 邮件黑白名单窗口
    sideButtomState: true, //邮件按钮
    titleStatus: '0',
    editPanel: false,
    mailBridge: 0,
    storageDialogState: false,
    storageIds: [],
    isUpload: true
}

const mutations = {
    SET_MAIL_STATE(state) {
        state.mailState = !state.mailState
        state.sideButtomState = !state.mailState
    },
    SET_MAIL_LIST_STATE(state) {
        state.mailListState = !state.mailListState
    },
    SET_MAIL_PANEL_STATE(state, res) {
        state[res['name']] = res['state']
    },
    SET_MAIL_BRIDGE(state) {
        state.mailBridge++
    },
    SET_STORAGEDIALOG_STATE(state, res) {
        state.storageDialogState = res
    },
    SET_STORAGEIDS(state, res) {
        state.storageIds = res
    },
    SET_ISUPLOAD(state, res) {
        state.isUpload = res
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
