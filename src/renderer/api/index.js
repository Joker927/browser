import http from './http'
import store from '@/store'
const defaultHost = 'http://139.196.98.22:8081/angel/'

let walletHost =
    JSON.parse(localStorage.getItem('WALLETHOST')) ||
    'http://101.132.177.123:3000/'

let baseURL = () => {
    let host = store.state.UserInfo.nodes.host
    if (host) {
        host = host + 'angel/'
    }
    return host || defaultHost
}

//获取结点信息
export const getNodes = () => {
    const req = {
        url: defaultHost + 'api/common/getNodes'
    }
    return http.post(req)
}

export const areaCode = () => {
    const req = {
        // contentType: 'application/x-www-form-urlencoded',
        data: {
            type: 'areaCode'
        },
        url: baseURL() + 'api/dict/areacode'
    }
    return http.post(req)
}
export const regCode = data => {
    let { acceptNo, flag } = data
    //acceptNo (string, optional): 接收账号（邮箱或者手机号）
    //flag (string, optional): 0:发送邮箱验证码 1：发送手机验证码
    const req = {
        data: {
            acceptNo,
            flag
        },
        url: baseURL() + 'api/code/sendregcode'
    }
    return http.post(req)
}

//注册
export const register = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/register'
    }
    return http.post(req)
}
//登录
export const login = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/login'
    }
    return http.post(req)
}

//登出
export const loginOut = data => {
    const req = {
        data,
        url: baseURL() + 'api/im/loginOut'
    }
    return http.post(req)
}

//获取用户信息
export const userInfo = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/info'
    }
    return http.post(req)
}

//批量邀请加群
export const addGroupMembers = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/addgroupmembers'
    }
    return http.post(req)
}

//移除成员
export const deleteMember = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/removegroupmembers'
    }
    return http.post(req)
}

//更新用户信息
export const updateUserInfo = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/updateuserinfo'
    }
    return http.post(req)
}
//忘记密码
export const forgetPwd = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/forgetpwd'
    }
    return http.post(req)
}

//校验验证码
export const checkCode = data => {
    const req = {
        data,
        url: baseURL() + 'api/code/checkCode'
    }
    return http.post(req)
}

//发送验证码
export const sendkCode = data => {
    const req = {
        data,
        url: baseURL() + 'api/code/sendCode'
    }
    return http.post(req)
}

//上传头像
export const userUploadAvater = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/uploadAvater'
    }
    return http.form(req)
}

//修改密码
export const userUploadPwd = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/updatepwd'
    }
    return http.post(req)
}
//新建群组并添加成员
export const groupCreateAndAddMember = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/createAndAddMember'
    }
    return http.post(req)
}
//删除群组信息
export const groupDelete = ids => {
    const req = {
        data: {
            ids: ids
        },
        url: baseURL() + 'pc/api/group/delete'
    }
    return http.post(req)
}
//群组详情信息
export const groupInfo = id => {
    const req = {
        data: {
            id: id
        },
        url: baseURL() + 'pc/api/group/info'
    }
    return http.post(req)
}

//解散群组
export const dissolveGroup = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/ungroup'
    }
    return http.post(req)
}

//退出群组
export const exitGroup = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/quitgroup'
    }
    return http.post(req)
}

//用户群列表

export const groupList = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/list'
    }
    return http.post(req)
}

//新建群组
export const groupSave = () => {
    const req = {
        url: baseURL() + 'pc/api/group/save'
    }
    return http.post(req)
}

//群组申请
export const groupApply = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/grouprequest/apply'
    }
    return http.post(req)
}

//拒绝加群请求
export const groupRefust = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/grouprequest/refust'
    }
    return http.post(req)
}

//群组邀请
export const groupInvite = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/grouprequest/invitelist'
    }
    return http.post(req)
}
//同意加群请求
export const groupAgree = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/grouprequest/agree'
    }
    return http.post(req)
}
//更新群组信息
export const groupUpdate = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/update'
    }
    return http.post(req)
}

//加群申请请列表
export const groupRequestList = () => {
    const req = {
        url: baseURL() + 'pc/api/grouprequest/list'
    }
    return http.post(req)
}
//上传头像
export const groupUploadImage = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/uploadImage'
    }
    return http.form(req)
}
//搜索
export const searchFriend = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/searchFriend'
    }
    return http.post(req)
}

//搜索所有用户和群组
export const searchAll = data => {
    let { searchName } = data
    const req = {
        data: {
            searchName
        },
        url: baseURL() + 'pc/api/search/searchuserandgroup'
    }
    return http.post(req)
}

//搜索好友和群组
export const searchFriendOrGroup = data => {
    let { searchName } = data
    const req = {
        data: {
            searchName
        },
        url: baseURL() + 'pc/api/search/searchfriendandgroup'
    }
    return http.post(req)
}

//推荐群组
export const recommendGroup = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/group/recommendgroup'
    }
    return http.post(req)
}

//推荐好友
export const recommendFriendes = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/recommendfriend'
    }
    return http.post(req)
}
export const friendsListData = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/listdata'
    }
    return http.post(req)
}
//好友列表
export const friendsList = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/list'
    }
    return http.post(req)
}

//添加好友
export const friendeAdd = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/add'
    }
    return http.post(req)
}

//删除好友
export const friendDelete = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/userfriend/delete'
    }
    return http.post(req)
}
//获取好友信息
export const friendInfo = data => {
    let { id } = data
    const req = {
        data: {
            id
        },
        url: baseURL() + 'pc/api/userfriend/info'
    }
    return http.post(req)
}

//申请加好友
export const friendApply = data => {
    let { requesterId } = data
    const req = {
        data: {
            requesterId
        },
        url: baseURL() + 'pc/api/friendrequest/apply'
    }
    return http.post(req)
}
//拒绝好友请求
export const friendeReject = data => {
    let { requesterId } = data
    const req = {
        data: {
            requesterId
        },
        url: baseURL() + 'pc/api/friendrequest/refust'
    }
    return http.post(req)
}
//好友请求列表
export const friendRequestList = data => {
    //userId
    let { userId } = data
    const req = {
        data: {
            userId
        },
        url: baseURL() + 'pc/api/friendrequest/list'
    }
    return http.post(req)
}

//我的邮件列表
export const emailList = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailsendacceptrecord/list'
    }
    return http.post(req)
}
//我的好友用户信息列表
export const emailFriendlist = id => {
    const req = {
        url: baseURL() + 'email/emailbwcommon/friendlist?userId=' + id
    }
    return http.post(req)
}

//pc黑白名单批量操作（新增或删除）
export const emailOperatebatch = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailbwcommon/pc/operatebatch'
    }
    return http.post(req)
}
//我最近的发件人
export const emailRecentuserlist = id => {
    const req = {
        url: baseURL() + 'email/emailbwcommon/recentuserlist?userId=' + id
    }
    return http.post(req)
}
//邮件用户白名单列表
export const emailWhitelist = id => {
    const req = {
        url: baseURL() + 'email/emailwhitelist/list?userId=' + id
    }
    return http.post(req)
}

//邮件用户黑名单列表
export const emailBlacklist = id => {
    const req = {
        url: baseURL() + 'email/emailblacklist/list?userId=' + id
    }
    return http.post(req)
}
//邮件删除收藏操作
export const emailOperate = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailsendacceptrecord/operate'
    }
    return http.post(req)
}
//邮件详情
export const emailDetails = data => {
    const req = {
        url: baseURL() + 'email/emailsendacceptrecord/info/',
        data
    }
    return http.post(req)
}
//邮件附件
export const emailUpload = (data, cb, id) => {
    const req = {
        data,
        cb,
        url: baseURL() + 'email/emailattachments/uploadAttachment'
    }
    return http.form(req)
}
//发送邮件
export const emailSend = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailsendacceptrecord/savebatch'
    }
    return http.post(req)
}
//我的未读邮件总数
export const emailUnreadnum = data => {
    const req = {
        data,

        url: baseURL() + 'email/emailsendacceptrecord/unreadnum'
    }
    return http.post(req)
}

//模糊匹配查询收件人(范围：所有收件人)
export const emailFuzzyUser = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailsendacceptrecord/fuzzyuser'
    }
    return http.post(req)
}

//修改邮件云端路径
export const emailUpdateCloudPath = data => {
    const req = {
        data,
        url: baseURL() + 'email/emailsendacceptrecord/updateCloudPath'
    }
    return http.post(req)
}

//IM发送消息
export const sendMessage = data => {
    const req = {
        data,
        url: baseURL() + 'api/im/sendMessage'
    }
    return http.post(req)
}

//IM接收消息
export const getMessage = id => {
    const req = {
        data: {
            id: id
        },
        url: baseURL() + 'api/im/getMessage'
    }
    return http.post(req)
}

//IM发送图片消息
export const sendImgMessage = data => {
    const req = {
        data,
        url: baseURL() + 'api/im/sendImageMessage'
    }
    return http.form(req)
}

//IM发送群组消息
export const sendGroupMessage = data => {
    const req = {
        data,
        url: baseURL() + 'api/groupim/sendMessage'
    }
    return http.post(req)
}

//IM接收群组消息
export const getGroupMessage = id => {
    const req = {
        data: {
            id: id
        },
        url: baseURL() + 'api/groupim/getMessage'
    }
    return http.post(req)
}

//IM启动群聊监听
export const startListener = data => {
    const req = {
        data,
        url: baseURL() + 'api/groupim/startlistener'
    }
    return http.post(req)
}

//IM发送群组图片消息
export const sendGroupImgMessage = data => {
    const req = {
        data,
        url: baseURL() + 'api/groupim/sendImageMessage'
    }
    return http.form(req)
}

//IM使用seed获取用户地址列表
export const getAddressBySeed = data => {
    const req = {
        data,
        url: walletHost + 'api/getAddressList'
    }
    return http.post(req)
}

//获取币种列表
export const getCuurrercyList = data => {
    const req = {
        url: walletHost + 'api/getContractList'
    }
    return http.get(req)
}

//IM使用seed转账
export const transferToSeedAddress = data => {
    const req = {
        data,
        url: walletHost + 'api/sendTransfer'
    }
    return http.post(req)
}

//seed获取可充值币种列表
export const getCanRechargeCurrencyList = data => {
    const req = {
        url: walletHost + 'api/getChargeCurrencyList'
    }
    return http.get(req)
}

//获取币种汇率
export const getExchangeRate = data => {
    const req = {
        url: walletHost + 'api/getExchangeRate'
    }
    return http.get(req)
}

//seed充值
export const seedRecharge = data => {
    const req = {
        data,
        url: walletHost + 'api/recharge'
    }
    return http.post(req)
}

//seed获取充值记录
export const seedGetRechargeRecord = data => {
    const req = {
        data,
        url: walletHost + 'api/getRechargeList'
    }
    return http.post(req)
}

//seed获取充值汇率
export const seedGetRechargeRate = data => {
    const req = {
        data,
        url: 'http://test.gitium.io/gitium/charge/getRealTimeExchangeRate'
    }
    return http.post(req)
}

//seed获取充值汇率
export const seedGetRechargeRate2 = data => {
    const req = {
        data,
        url: walletHost + 'api/getRealTimeExchangeRate'
    }
    return http.post(req)
}

//seed获取充值记录
export const seedGetTransferList = data => {
    const req = {
        data,
        url: walletHost + 'api/getTransactionList'
    }
    return http.post(req)
}

//获取GIM币种余额
export const getGIMCurrentySum = data => {
    const req = {
        data,
        url: walletHost + 'api/getGimBalance'
    }
    return http.post(req)
}

//获取多货币余额
export const getMuchCurrentySum = data => {
    const req = {
        data,
        url: walletHost + 'api/getCurrencyBalance'
    }
    return http.post(req)
}

//用户主页的动态列表
export const snsIndexlist = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/indexlist'
    }
    return http.post(req)
}

//动态列表
export const snsList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/list'
    }
    return http.post(req)
}
//添加或更新照片墙
export const snsUpdatePhotoWall = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/updatePhotoWall'
    }
    return http.form(req)
}

//获取用户照片墙
export const snsGetUserPhotoWall = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/getUserPhotoWall'
    }
    return http.post(req)
}

//获取登录用户照片墙
export const snsGetPhotoWall = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/getPhotoWall'
    }
    return http.post(req)
}
//发表动态
export const snsPublish = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/publish'
    }
    return http.post(req)
}

//点赞
export const snsLike = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dyanmiclike/save'
    }
    return http.post(req)
}

//打赏配置
export const ucRewardConfig = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/rewardconfig/config'
    }
    return http.post(req)
}

//打赏动态
export const snsRewardIns = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicreward/reward'
    }
    return http.post(req)
}

//获取打赏配置
export const ucGetRewardInfo = id => {
    const req = {
        data: {
            id: id
        },
        url: baseURL() + 'api/uc/rewardconfig/info'
    }
    return http.post(req)
}

//取消点赞
export const snsCancelLike = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dyanmiclike/cancel'
    }
    return http.post(req)
}

//动态详情
export const snsDynamicDetail = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/detail'
    }
    return http.post(req)
}
//动态点赞列表
export const snsLikeList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dyanmiclike/list'
    }
    return http.post(req)
}

//发表评论
export const snsComment = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamiccomment/publish'
    }
    return http.post(req)
}
//评论列表

export const snsCommentList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamiccomment/list'
    }
    return http.post(req)
}
//上传图片或小视频（图片和小视频上传目前都是同一个接口，返回图片或小视频地址多个地址之前用逗号分割）

export const snsUpload = (data, cb) => {
    const req = {
        data,
        cb,
        url: baseURL() + 'api/sns/dynamic/uploadImgOrVideo'
    }
    return http.form(req)
}

//删除评论（id为评论的id）

export const snsDelComment = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamiccomment/delete'
    }
    return http.post(req)
}
//回复评论

export const snsReply = data => {
    const req = {
        data,
        url: baseURL() + 'api/commentreply/reply'
    }
    return http.post(req)
}
//删除回复

export const snsDeleteReply = data => {
    const req = {
        data,
        url: baseURL() + 'api/commentreply/delete'
    }
    return http.post(req)
}

//评论回复列表
export const snsReplyList = data => {
    const req = {
        data,
        url: baseURL() + 'api/commentreply/list'
    }
    return http.post(req)
}

//删除动态
export const snsDelete = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/delete'
    }
    return http.post(req)
}

//新消息列表
export const snsInfromlist = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/infromlist'
    }
    return http.post(req)
}

//把消息置为已读
export const snsRead = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/read'
    }
    return http.post(req)
}
//收藏
export const snsCollectSave = data => {
    const req = {
        data,
        url: baseURL() + 'api/usercollection/save'
    }
    return http.post(req)
}

//根据类型获取收藏列表
export const snsCollectionList = data => {
    const req = {
        data,
        url: baseURL() + 'api/usercollection/list'
    }
    return http.post(req)
}
//删除收藏
export const snsCollectionDelete = data => {
    const req = {
        data,
        url: baseURL() + 'api/usercollection/delete'
    }
    return http.post(req)
}
//收藏上传图片或小视频以及文档（返回多个地址之间用逗号分割）
export const snsCollectionUpload = data => {
    const req = {
        data,
        url: baseURL() + 'api/usercollection/upload'
    }
    return http.post(req)
}

//单个添加收藏
export const snsCollectionSingleSave = data => {
    const req = {
        data,
        url: baseURL() + 'api/usercollection/singlesave'
    }
    return http.post(req)
}

//搜索所有用户和群组

export const searchUserAndGroup = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/search/searchuserandgroup'
    }
    return http.post(req)
}

//搜索好友和群组
export const searchFriendAndGroup = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/search/searchfriendandgroup'
    }
    return http.post(req)
}

//搜索动态和用户信息（用户信息最多返回三条）
export const searchUserAndDynamic = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/search/searauseranddynamic'
    }
    return http.post(req)
}

//搜索(除自己)所有用户（昵称模糊查询，手机号和邮箱全匹配）
export const searchUser = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/search/searalluser'
    }
    return http.post(req)
}

//根据动态描述模糊搜索动态
export const searchDynamic = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/search/seardynamic'
    }
    return http.post(req)
}

//查询是否让对方查看动态或是否查看对方动态列表（type：1=不看好友动态；2=不让好友查看动态）
export const privacyDynamicviewList = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/dynamicviewlist'
    }
    return http.post(req)
}
//移除是否让对方查看动态或是否查看对方动态的设置（type：1=不看好友动态；2=不让好友查看动态）
export const privacyRemoveDynamicView = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/removedynamicview'
    }
    return http.post(req)
}

//设置是否让对方查看动态或是否查看对方动态（type：1=不看好友动态；2=不让好友查看动态）
export const privacySetDynamicView = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/setdynamicview'
    }
    return http.post(req)
}

//设置加自己为好友时是否需要验证

export const privacySetVerify = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/setisverify'
    }
    return http.post(req)
}
//设置用户的动态查看范围

export const privacySetViewDynamicRange = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/setviewdynamicrange'
    }
    return http.post(req)
}

//查询新动态条数
export const newDynamicCount = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamic/newDynamicCount'
    }
    return http.post(req)
}

//黑名单列表
export const privacyBlacklist = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/blacklist'
    }
    return http.post(req)
}
//添加黑名单
export const privacyAddBlacklist = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/addblacklist'
    }
    return http.post(req)
}

//移除黑名单
export const privacyRemoveBlacklist = data => {
    const req = {
        data,
        url: baseURL() + 'api/uc/privacy/removeblacklist'
    }
    return http.post(req)
}
// 判断用户是否购买该作者的作品或单个作品

export const snsDynamicorderCheck = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicorder/check'
    }
    return http.post(req)
}

// 用户购买付费作品
export const snsDynamicorderBuy = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicorder/buy'
    }
    return http.post(req)
}

// 动态打赏记录列表
export const snsDynamicordRewardList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicreward/rewardlist'
    }
    return http.post(req)
}

// 打赏记录列表
export const snsDynamicordList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicreward/list'
    }
    return http.post(req)
}

// 红包列表
export const snsRedList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/redenvelope/record'
    }
    return http.post(req)
}

// 转账列表
export const snstransferList = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/transferaccounts/list'
    }
    return http.post(req)
}

//把用户购买一次查看的作品记录置为已过期
export const snsDynamicorderUpdate = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/dynamicorder/update'
    }
    return http.post(req)
}

//发红包
export const sendRed = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/redenvelope/send'
    }
    return http.post(req)
}

//收红包
export const getRed = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/redenvelope/receive'
    }
    return http.post(req)
}

//设置作品价格
export const snsWorkSet = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/setprice/saveOrUpdate'
    }
    return http.post(req)
}

//获取用户设置的价格信息
export const snsWorkInfo = data => {
    const req = {
        data,
        url: baseURL() + 'api/sns/setprice/info'
    }
    return http.post(req)
}

//我的空间信息
export const cloudInfo = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/info'
    }
    return http.post(req)
}

//查找匹配空间
export const cloudMatchStorage = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/matchStorage'
    }
    return http.post(req)
}

//匹配方案详情
export const cloudMatchStorageDetail = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/matchStorageDetail'
    }
    return http.post(req)
}

//我的空间记录
export const cloudStorageList = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/list'
    }
    return http.post(req)
}

//立即购买,有多个订单 需要多个次支付 然后支付回调 支付成功hash
export const cloudStorageBuy = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/buy'
    }
    return http.post(req)
}

//支付回调

export const cloudOrderCallback = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/order/pay/callback'
    }
    return http.post(req)
}

//发布云空间方案
export const cloudStorageCreate = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/create'
    }
    return http.post(req)
}

//查看云空间目录
export const cloudGetAllFile = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/list'
    }
    return http.post(req)
}

//云空间创建目录
export const cloudCreateFolder = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/createFolder'
    }
    return http.post(req)
}

//云空间更新目录名称
export const cloudRename = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/rename'
    }
    return http.post(req)
}

//云空间上传文件
export const cloudUploadFile = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/upload'
    }
    return http.form(req)
}

//云空间删除文件
export const cloudDelete = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/delete'
    }
    return http.post(req)
}

//云空间下载文件
export const cloudDownload = id => {
    const req = {
        url: baseURL() + 'api/cloud/file/download/' + id
    }
    return http.getFile(req)
}

//云空间查询目录和文件
export const cloudList = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/list'
    }
    return http.post(req)
}

//取消方案 在未知支付保证金情况下可以取消
export const cloudStorageCancel = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/cancel'
    }
    return http.post(req)
}
//
//申请关闭，只能关闭已经出租的并且是自己发布的

export const cloudStorageApplyClose = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/applyClose'
    }
    return http.post(req)
}
//不同意关闭
export const cloudStorageNoClose = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/noClose'
    }
    return http.post(req)
}
//同意关闭
export const cloudStorageYesClose = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/storage/yesClose'
    }
    return http.post(req)
}
//token 登录
export const tokenLogin = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/tokenlogin'
    }
    return http.post(req)
}

//通过钱包地址获取用户信息
export const infoByWalletAddress = data => {
    const req = {
        data,
        url: baseURL() + 'pc/api/user/infoByWalletAddress'
    }
    return http.post(req)
}
//判断是否有可用空间
export const cloudCheck = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/check'
    }
    return http.post(req)
}

// 删除多个文件或目录
export const cloudDeleteByIds = data => {
    const req = {
        data,
        url: baseURL() + 'api/cloud/file/deleteByIds'
    }
    return http.post(req)
}
