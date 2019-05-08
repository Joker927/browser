let arr = [{
  "address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "decimals": 0,
  "name": "GIT",
  "owner": "",
  "rate": "1",
  "symbol": "Git",
  "type": "0",
  "totalsupply": 0,
  "totalValue": 0
}];

const state = {
  dealState: false, //交易信息显示隐藏
  dealInfo: {},
  addPropertyShow: false, //添加资产显示隐藏
  CNYRechargeShow: false, //CNY充值二维码显示隐藏
  CNYInfo: {},
  propertyList: JSON.parse(localStorage.getItem('PROPERTYLIST')) || arr,
}

const mutations = {
  //设置交易信息显示隐藏
  SET_DEAL_STATE(state, res) {
    state.dealState = !state.dealState;
    if (res) state.dealInfo = res;
  },
  //设置添加资产显示隐藏
  SET_ADDPROPERTY_STATE(state, res) {
    state.addPropertyShow = !state.addPropertyShow;
  },
  //设置CNY充值显示隐藏
  SET_CNY_STATE(state, res) {
    state.CNYRechargeShow = !state.CNYRechargeShow
  },
  //设置CNY充值信息
  SET_CNY_INFO(state, res) {
    state.CNYInfo = res;
  },
  //设置资产列表
  SET_PROPERTY_LIST(state, res) {
    localStorage.PROPERTYLIST = JSON.stringify(res);
    state.propertyList = res || arr;
  },
  SET_PROPERTY_TOTAL(state, {
    idx,
    totalValue
  }) {
    state.propertyList[idx].totalValue = 0;
  }
}

export default {
  state,
  mutations
}