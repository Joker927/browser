const state = {
  webIMList: [{
    userId: 106,
    userName: 'Joker.',
    avatar: 'http://139.196.98.22/resource/1539528025583_530.jpg',
    type: "personal",
    isShow: true,
    width: '194px',
    height: '168px',
    msgList: [{
      type: '1',
      messageType: 1,
      msg: '你好'
    }, {
      type: '0',
      messageType: 1,
      msg: '你好'
    }, {
      type: '1',
      messageType: 3,
      msg: 'http://h5-test.qiumeiapp.com/zhangyiming/audio2.mp3'
    }]
  }]
}

const mutations = {
  SAVE_RECORDS(state, res) {
    localStorage.chatRecords = res;
  },
  SET_WEBIM_SHOW(state, index) {
    state.webIMList[index].isShow = !state.webIMList[index].isShow;
    if (!state.webIMList[index].isShow) {
      state.webIMList[index].width = '194px';
      state.webIMList[index].height = '168px';
    }
  },
  SET_WEBIM_SIZE(state, index) {
    if (state.webIMList[index].width == '194px') {
      state.webIMList[index].width = '270px';
      state.webIMList[index].height = '410px';
    } else {
      state.webIMList[index].width = '194px';
      state.webIMList[index].height = '168px';
    }
  },
  SET_WEBIM_List(state, res) {
    let flag = state.webIMList.some(val => {
      return val.userId == res.userId;
    })
    if (flag) return;
    if (state.webIMList.length >= 4) state.webIMList.shift();
    state.webIMList.push(res);
  },
  SET_MSG_List(state, {
    index,
    msg
  }) {
    state.webIMList[index].msgList.push(msg);
  },
}

export default {
  state,
  mutations
}