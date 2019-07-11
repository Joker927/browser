const state = {
  groupId: '', //群组详情ID
  groupIdx: '', //群组index
  groupAddShow: false, //群组添加成员显示
  messageShow: false,
  messageType: 1, //1为解散群组，2为移除成员
  messageUserId: '', 
  isOperationGroupState: false, //监听解散或者退出群组操作
  GroupCodeShow: false, //群二维码
  GroupCodeId: null, //群二维码ID
  mapState: false,
  mapItem: '',
  mapMsgToInfo: {}, //发送地址消息信息
  forwardShow: false,
  forwardItem: {},
  webIMList: [],
  chatRecords: JSON.parse(localStorage.getItem('chatRecords'))
}

// webIMList: [{
//   userId: 206,
//   userName: 'Joker.',
//   avatar: 'http://139.196.98.22/resource/1539528025583_530.jpg',
//   type: "personal",
//   isShow: true,
//   width: '210px',
//   height: '168px',
//   msgList: [{
//     type: '1',
//     userName: 'Joker.',
//     avatar: 'http://139.196.98.22/resource/1539528025583_530.jpg',
//     messageType: 1,
//     msg: '你好'
//   }, {
//     type: '0',
//     messageType: 1,
//     msg: '你好'
//   }, {
//     type: '1',
//     userName: 'Joker.',
//     avatar: 'http://139.196.98.22/resource/1539528025583_530.jpg',
//     messageType: 3,
//     duration: 60,
//     msg: 'http://h5-test.qiumeiapp.com/zhangyiming/audio2.mp3'
//   }]
// }]

const mutations = {
  SET_MESSAGEBOX_STATE (state, {type,id}) {
    state.messageShow = !state.messageShow;
    state.messageType = type;
    state.messageUserId = id;
  },
  SET_GROUPADD_STATE (state, res) {
    state.groupAddShow = !state.groupAddShow;
  },
  SET_GROUP_ID (state, {id,idx}) {
    state.groupId = id;
    state.groupIdx = idx;
  },
  SET_ISOPERATION_STATE(state, res) {
    state.isOperationGroupState = !state.isOperationGroupState;
  },
  SET_GROUPCODE_STATE(state, res) {
    console.log(res)
    state.GroupCodeShow = !state.GroupCodeShow;
    state.GroupCodeId = res;
  },
  SET_MAP_STATE(state, {
    mapItem,
    mapMsgToInfo
  }) {
    state.mapState = !state.mapState;
    state.mapItem = mapItem;
    state.mapMsgToInfo = mapMsgToInfo;
  },
  EXIT_IMFORWARD() {
    state.forwardShow = false;
  },
  SET_IMFORWARD_STATE(state, res) {
    state.forwardShow = !state.forwardShow;
    state.forwardItem = res;
  },
  SAVE_RECORDS(state, res) {
    localStorage.setItem('chatRecords', res);
  },
  SET_WEBIM_SHOW(state, index) {
    state.webIMList[index].isShow = !state.webIMList[index].isShow;
    if (!state.webIMList[index].isShow) {
      state.webIMList[index].width = '210px';
      state.webIMList[index].height = '168px';
    }
  },
  SET_WEBIM_SIZE(state, index) {
    if (state.webIMList[index].width == '210px') {
      state.webIMList[index].width = '270px';
      state.webIMList[index].height = '410px';
    } else {
      state.webIMList[index].width = '210px';
      state.webIMList[index].height = '168px';
    }
  },
  SET_WEBIM_List(state, res) {
    let flag = state.webIMList.some(val => {
      if (res.groupId) {
        return val.groupId == res.groupId;
      } else {
        return val.userId == res.userId;
      }
    })
    if (flag) return;
    if (state.webIMList.length >= 4) state.webIMList.shift();

    let arr = [];
    if (localStorage.chatRecords) {
      arr = JSON.parse(localStorage.chatRecords);
      let equalIdx = 99;
      let flags = arr.some((val, index) => {
        if (res.groupId) {
          if (val.groupId == res.groupId) equalIdx = index;
          return val.groupId == res.groupId;
        } else {
          if (val.userId == res.userId) equalIdx = index;
          return val.userId == res.userId;
        }
      });
      if (flags) {
        arr[equalIdx] = res;
      } else {
        arr.push(res);
      }
    } else {
      arr.push(res);
    }
    localStorage.setItem('chatRecords', JSON.stringify(arr));

    state.webIMList.push(res);
  },
  SET_MSG_List(state, {
    index,
    msg
  }) {
    state.webIMList[index].msgList.push(msg);
    state.chatRecords.forEach(val => {
      if (val.groupId) {
        if (val.groupId == state.webIMList[index].groupId) {
          val.msgList = state.webIMList[index].msgList;
        }
      } else {
        if (val.userId == state.webIMList[index].userId) {
          val.msgList = state.webIMList[index].msgList;
        }
      }
    })
  },
  //音频获取时长后更换信息
  SPLICE_MSG_LIST(state, {
    index,
    msgIdx,
    msg
  }) {
    state.webIMList[index].msgList.splice(msgIdx, 1, msg);
  },
  //关闭一个im
  DELETE_WEBIM_LIST(state, index) {
    state.webIMList.splice(index, 1);
  },
  //删除消息
  DELETE_MSG(state, {
    opeIdx,
    msgIdx
  }) {
    state.webIMList[opeIdx].msgList.splice(msgIdx, 1);
  },
  CLEAR_MSG_LIST(state, index) {
    state.webIMList[index].msgList = [];
  }
}

export default {
  state,
  mutations
}