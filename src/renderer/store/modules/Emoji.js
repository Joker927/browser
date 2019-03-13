const state = {
    text: '',
    state: false,
    style: {
        top: 0,
        left: 0
    },
    dom: ''
}

const mutations = {
    SET_EMOJI_TEXT(state, value) {
        let startPos = state.dom.selectionStart
        let endPos = state.dom.selectionEnd
        let scrollTop = state.dom.scrollTop
        state.dom.value =
            state.dom.value.substring(0, startPos) +
            value +
            state.dom.value.substring(endPos, state.dom.value.length)
        state.dom.focus()
        state.dom.selectionStart = startPos + value.length
        state.dom.selectionEnd = startPos + value.length
        state.dom.scrollTop = scrollTop

        state.text = value
    },
    SET_EMOJI_STATE(state, res) {
        state.state = res
    },
    SET_EMOJI_STYLE(state, res) {
        state.style = res
    },
    SET_EMOJI_NODE(state, res) {
        state.dom = res
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
