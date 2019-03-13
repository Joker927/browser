const state = {
    modalState: false, //选择好友弹窗状态
    title: '',
    selected: [],
    menuState: null, //动态菜单显示状态
    accessMenuState: false, //权限菜单
    accessMenuPermission: 0, //动态查看权限
    accessMenuStyle: {
        top: 0,
        left: 0
    },
    dynamicItem: {}, // 转发item
    parentDynamicId: null,
    payLookId: null,
    payLookItem: {},
    rewardId: null, //打赏ID
    rewardItem: {}, //打赏item
    likeStyle: {
        top: 0,
        left: 0
    },
    likeState: false,
    dynamicId: '',
    previewList: [],
    previewCurrent: 0,
    collectBtnStyle: {
        top: 0,
        left: 0
    },
    collectBtnState: false,
    collectSourse: null
}

const mutations = {
    SET_FEED_MENU_STATE(state, res) {
        if (res && state.menuState === res) {
            state.menuState = null
        } else {
            state.menuState = res
        }
    },
    SET_FEED_ACCESS_MENU_STATE(state, res) {
        state.accessMenuState = res.state
        if (res.pos) state.accessMenuStyle = res.pos
    },
    SET_FEED_ACCESS_PERMISSION(state, res) {
        state.accessMenuPermission = res
    },
    SET_FEED_PARENT_DYNAMIC(state, res) {
        let item = JSON.parse(JSON.stringify(res.item))
        let id = res.id
        state.dynamicItem = item
        state.parentDynamicId = id
    },
    SET_FEED_REWARD(state, res) {
        let item = JSON.parse(JSON.stringify(res.item))
        let id = res.id
        state.rewardId = res.id
        state.rewardItem = item
    },
    SET_FEED_PAY_LOOK(state, res) {
        let item = JSON.parse(JSON.stringify(res.item))
        let id = res.id
        state.payLookItem = res.item
        state.payLookId = res.id
    },
    SET_FEED_MODAL_STATE(state, res) {
        state.modalState = res.state
        state.title = res.title
    },
    SET_FEED_MODAL_SELECTED(state, res) {
        state.selected = res
    },
    SET_FEED_LIKE_STATE(state, res) {
        state.likeState = res.state
        state.dynamicId = res.id
    },
    SET_FEED_LIKE_STYLE(state, res) {
        state.likeStyle = res
    },
    SET_FEED_COLLECT_BTN(state, res) {
        state.collectBtnState = res.state
        state.collectBtnStyle = res.style
        state.collectSourse = res.sourse
    },
    SET_FEED_PREVIEW(state, res) {
        state.previewList = res.list
        state.previewCurrent = res.index
    }
}

const actions = {
    someAsyncTask({
        commit
    }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    state,
    mutations,
    actions
}