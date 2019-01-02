const state = {
    homeShow: true,
    tabIdx: '-1',
    tabs: [{
        title: '百度',
        isShow: false,
        url: 'https://www.baidu.com/'
    }, {
        title: '新浪',
        isShow: false,
        url: 'https://www.sina.com.cn/'
    }]
}

const mutations = {
    ALL_SHOW_FALSE(state, index) {
        state.homeShow = false;
        state.tabIdx = index;
        state.tabs.forEach(val => {
            val.isShow = false
        })
        state.tabs[index].isShow = true;
    },
    ADD_TABS(state, res) {
        state.tabs.push(res);
        let index = state.tabs.length - 1;
        this.commit('ALL_SHOW_FALSE', index);
    },
    DELETE_TABS(state, index) {
        state.tabs.splice(index,1);
        this.commit('SHOW_HOME');
    },
    SET_TAB_SHOW(state, index) {
        this.commit('ALL_SHOW_FALSE', index)
    },
    SET_TAB_TITLE(state, {
        index,
        title
    }) {
        state.tabs[index].title = title;
    },
    SHOW_HOME(state) {
        state.tabs.forEach(val => {
            val.isShow = false
        })
        state.tabIdx = '-1';
        state.homeShow = true;
    }
}

export default {
    state,
    mutations
}