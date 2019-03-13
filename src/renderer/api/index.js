import http from './http'

//
export const areaCode = () => {
    const req = {
        // contentType: 'application/x-www-form-urlencoded',
        data: {
            type: 'areaCode'
        },
        url: 'api/dict/areacode'
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
        url: 'api/code/sendregcode'
    }
    return http.post(req)
}

//注册
export const register = data => {
    const req = {
        data,
        url: 'pc/api/user/register'
    }
    return http.post(req)
}
//登录
export const login = data => {
    const req = {
        data,
        url: 'pc/api/user/login'
    }
    return http.post(req)
}

//获取用户信息
export const userInfo = data => {
    const req = {
        data,
        url: 'pc/api/user/info'
    }
    return http.post(req)
}

//更新用户信息
export const updateUserInfo = data => {
    const req = {
        data,
        url: 'pc/api/user/updateuserinfo'
    }
    return http.post(req)
}
//忘记密码
export const forgetPwd = data => {
    const req = {
        data,
        url: 'pc/api/user/forgetpwd'
    }
    return http.post(req)
}
//上传头像
export const userUploadAvater = data => {
    const req = {
        data,
        url: 'pc/api/user/uploadAvater'
    }
    return http.form(req)
}

//修改密码
export const userUploadPwd = data => {
    const req = {
        data,
        url: 'pc/api/user/updatepwd'
    }
    return http.post(req)
}
//新建群组并添加成员
export const groupCreateAndAddMember = data => {
    const req = {
        data,
        url: 'pc/api/group/createAndAddMember'
    }
    return http.post(req)
}
//删除群组信息
export const groupDelete = ids => {
    const req = {
        data: {
            ids: ids
        },
        url: 'pc/api/group/delete'
    }
    return http.post(req)
}
//群组详情信息
export const groupInfo = id => {
    const req = {
        data: {
            id: id
        },
        url: 'pc/api/group/info'
    }
    return http.post(req)
}
//用户群列表

export const groupList = data => {
    const req = {
        data,
        url: 'pc/api/group/list'
    }
    return http.post(req)
}

//新建群组
export const groupSave = () => {
    const req = {
        url: 'pc/api/group/save'
    }
    return http.post(req)
}

//群组申请
export const groupApply = data => {
    const req = {
        data,
        url: 'pc/api/grouprequest/apply'
    }
    return http.post(req)
}

//拒绝加群请求
export const groupRefust = data => {
    const req = {
        data,
        url: 'pc/api/grouprequest/refust'
    }
    return http.post(req)
}

//群组邀请
export const groupInvite = data => {
    const req = {
        data,
        url: 'pc/api/grouprequest/invitelist'
    }
    return http.post(req)
}
//同意加群请求
export const groupAgree = data => {
    const req = {
        data,
        url: 'pc/api/grouprequest/agree'
    }
    return http.post(req)
}
//更新群组信息
export const groupUpdate = () => {
    const req = {
        url: 'pc/api/group/update'
    }
    return http.post(req)
}

//加群申请请列表
export const groupRequestList = () => {
    const req = {
        url: 'pc/api/grouprequest/list'
    }
    return http.post(req)
}
//上传头像
export const groupUploadImage = data => {
    const req = {
        data,
        url: 'pc/api/group/uploadImage'
    }
    return http.form(req)
}
//搜索
export const searchFriend = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/searchFriend'
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
        url: 'pc/api/search/searchuserandgroup'
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
        url: 'pc/api/search/searchfriendandgroup'
    }
    return http.post(req)
}

//推荐群组
export const recommendGroup = data => {
    const req = {
        data,
        url: 'pc/api/group/recommendgroup'
    }
    return http.post(req)
}

//推荐好友
export const recommendFriendes = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/recommendfriend'
    }
    return http.post(req)
}
export const friendsListData = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/listdata'
    }
    return http.post(req)
}
//好友列表
export const friendsList = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/list'
    }
    return http.post(req)
}

//添加好友
export const friendeAdd = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/add'
    }
    return http.post(req)
}

//删除好友
export const friendDelete = data => {
    const req = {
        data,
        url: 'pc/api/userfriend/delete'
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
        url: 'pc/api/userfriend/info'
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
        url: 'pc/api/friendrequest/apply'
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
        url: 'pc/api/friendrequest/refust'
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
        url: 'pc/api/friendrequest/list'
    }
    return http.post(req)
}

//我的邮件列表
export const emailList = data => {
    const req = {
        data,
        url: 'email/emailsendacceptrecord/list'
    }
    return http.post(req)
}
//我的好友用户信息列表
export const emailFriendlist = id => {
    const req = {
        url: 'email/emailbwcommon/friendlist?userId=' + id
    }
    return http.post(req)
}

//pc黑白名单批量操作（新增或删除）
export const emailOperatebatch = data => {
    const req = {
        data,
        url: 'email/emailbwcommon/pc/operatebatch'
    }
    return http.post(req)
}
//我最近的发件人
export const emailRecentuserlist = id => {
    const req = {
        url: 'email/emailbwcommon/recentuserlist?userId=' + id
    }
    return http.post(req)
}
//邮件用户白名单列表
export const emailWhitelist = id => {
    const req = {
        url: 'email/emailwhitelist/list?userId=' + id
    }
    return http.post(req)
}

//邮件用户黑名单列表
export const emailBlacklist = id => {
    const req = {
        url: 'email/emailblacklist/list?userId=' + id
    }
    return http.post(req)
}
//邮件删除收藏操作
export const emailOperate = data => {
    const req = {
        data,
        url: 'email/emailsendacceptrecord/operate'
    }
    return http.post(req)
}
//邮件详情
export const emailDetails = data => {
    const req = {
        url: 'email/emailsendacceptrecord/info/',
        data
    }
    return http.post(req)
}
//邮件附件
export const emailUpload = (data, cb, id) => {
    const req = {
        data,
        cb,
        url: 'email/emailattachments/uploadAttachment'
    }
    return http.form(req)
}
//发送邮件
export const emailSend = data => {
    const req = {
        data,
        url: 'email/emailsendacceptrecord/savebatch'
    }
    return http.post(req)
}
//我的未读邮件总数
export const emailUnreadnum = data => {
    const req = {
        data,

        url: 'email/emailsendacceptrecord/unreadnum'
    }
    return http.post(req)
}

//模糊匹配查询收件人(范围：所有收件人)
export const emailFuzzyUser = data => {
    const req = {
        data,
        url: 'email/emailsendacceptrecord/fuzzyuser'
    }
    return http.post(req)
}

//IM发送消息
export const sendMessage = data => {
    const req = {
        data,
        url: 'api/im/sendMessage'
    }
    return http.post(req)
}

//IM接收消息
export const getMessage = id => {
    const req = {
        data: {
            id: id
        },
        url: 'api/im/getMessage'
    }
    return http.post(req)
}

//IM发送图片消息
export const sendImgMessage = data => {
    const req = {
        data,
        url: 'api/im/sendImageMessage'
    }
    return http.form(req)
}

//IM发送群组消息
export const sendGroupMessage = data => {
    const req = {
        data,
        url: 'api/groupim/sendMessage'
    }
    return http.post(req)
}

//IM接收群组消息
export const getGroupMessage = id => {
    const req = {
        data: {
            id: id
        },
        url: 'api/groupim/getMessage'
    }
    return http.post(req)
}

//IM发送群组图片消息
export const sendGroupImgMessage = data => {
    const req = {
        data,
        url: 'api/groupim/sendImageMessage'
    }
    return http.form(req)
}

//IM使用seed获取用户地址列表
export const getAddressBySeed = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/getAddressList'
    }
    return http.post(req)
}

//获取币种列表
export const getCuurrercyList = data => {
    const req = {
        url: 'http://101.132.177.123:3000/api/getContractList'
    }
    return http.get(req)
}

//IM使用seed转账
export const transferToSeedAddress = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/sendTransfer'
    }
    return http.post(req)
}

//seed获取可充值币种列表
export const getCanRechargeCurrencyList = data => {
    const req = {
        url: 'http://101.132.177.123:3000/api/getChargeCurrencyList'
    }
    return http.get(req)
}

//获取币种汇率
export const getExchangeRate = data => {
    const req = {
        url: 'http://101.132.177.123:3000/api/getExchangeRate'
    }
    return http.get(req)
}

//seed充值
export const seedRecharge = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/recharge'
    }
    return http.post(req)
}

//seed获取充值记录
export const seedGetRechargeRecord = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/getRechargeList'
    }
    return http.post(req)
}

//获取GIM币种余额
export const getGIMCurrentySum = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/getGimBalance'
    }
    return http.post(req)
}

//获取多货币余额
export const getMuchCurrentySum = data => {
    const req = {
        data,
        url: 'http://101.132.177.123:3000/api/getCurrencyBalance'
    }
    return http.post(req)
}

//用户主页的动态列表
export const snsIndexlist = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/indexlist'
    }
    return http.post(req)
}

//动态列表
export const snsList = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/list'
    }
    return http.post(req)
}
//添加或更新照片墙
export const snsUpdatePhotoWall = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/updatePhotoWall'
    }
    return http.form(req)
}

//获取用户照片墙
export const snsGetUserPhotoWall = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/getUserPhotoWall'
    }
    return http.post(req)
}

//获取登录用户照片墙
export const snsGetPhotoWall = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/getPhotoWall'
    }
    return http.post(req)
}
//发表动态
export const snsPublish = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/publish'
    }
    return http.post(req)
}

//点赞
export const snsLike = data => {
    const req = {
        data,
        url: 'api/sns/dyanmiclike/save'
    }
    return http.post(req)
}

//打赏配置
export const ucRewardConfig = data => {
    const req = {
        data,
        url: 'api/uc/rewardconfig/config'
    }
    return http.post(req)
}

//打赏动态
export const snsRewardIns = data => {
    const req = {
        data,
        url: 'api/sns/dynamicreward/reward'
    }
    return http.post(req)
}

//获取打赏配置
export const ucGetRewardInfo = id => {
    const req = {
        data: {
            id: id
        },
        url: 'api/uc/rewardconfig/info'
    }
    return http.post(req)
}

//取消点赞
export const snsCancelLike = data => {
    const req = {
        data,
        url: 'api/sns/dyanmiclike/cancel'
    }
    return http.post(req)
}
//动态点赞列表
export const snsLikeList = data => {
    const req = {
        data,
        url: 'api/sns/dyanmiclike/list'
    }
    return http.post(req)
}

//发表评论
export const snsComment = data => {
    const req = {
        data,
        url: 'api/sns/dynamiccomment/publish'
    }
    return http.post(req)
}
//评论列表

export const snsCommentList = data => {
    const req = {
        data,
        url: 'api/sns/dynamiccomment/list'
    }
    return http.post(req)
}
//上传图片或小视频（图片和小视频上传目前都是同一个接口，返回图片或小视频地址多个地址之前用逗号分割）

export const snsUpload = (data, cb) => {
    const req = {
        data,
        cb,
        url: 'api/sns/dynamic/uploadImgOrVideo'
    }
    return http.form(req)
}

//删除评论（id为评论的id）

export const snsDelComment = data => {
    const req = {
        data,
        url: 'api/sns/dynamiccomment/delete'
    }
    return http.post(req)
}
//回复评论

export const snsReply = data => {
    const req = {
        data,
        url: 'api/commentreply/reply'
    }
    return http.post(req)
}
//删除回复

export const snsDeleteReply = data => {
    const req = {
        data,
        url: 'api/commentreply/delete'
    }
    return http.post(req)
}

//评论回复列表
export const snsReplyList = data => {
    const req = {
        data,
        url: 'api/commentreply/list'
    }
    return http.post(req)
}

//删除动态
export const snsDelete = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/delete'
    }
    return http.post(req)
}

//新消息列表
export const snsInfromlist = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/infromlist'
    }
    return http.post(req)
}

//把消息置为已读
export const snsRead = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/read'
    }
    return http.post(req)
}
//收藏
export const snsCollectSave = data => {
    const req = {
        data,
        url: 'api/usercollection/save'
    }
    return http.post(req)
}

//根据类型获取收藏列表
export const snsCollectionList = data => {
    const req = {
        data,
        url: 'api/usercollection/list'
    }
    return http.post(req)
}
//删除收藏
export const snsCollectionDelete = data => {
    const req = {
        data,
        url: 'api/usercollection/delete'
    }
    return http.post(req)
}
//收藏上传图片或小视频以及文档（返回多个地址之间用逗号分割）
export const snsCollectionUpload = data => {
    const req = {
        data,
        url: 'api/usercollection/upload'
    }
    return http.post(req)
}

//单个添加收藏
export const snsCollectionSingleSave = data => {
    const req = {
        data,
        url: 'api/usercollection/singlesave'
    }
    return http.post(req)
}
//搜索所有用户和群组

export const searchUserAndGroup = data => {
    const req = {
        data,
        url: 'pc/api/search/searchuserandgroup'
    }
    return http.post(req)
}

//搜索好友和群组
export const searchFriendAndGroup = data => {
    const req = {
        data,
        url: 'pc/api/search/searchfriendandgroup'
    }
    return http.post(req)
}

//搜索动态和用户信息（用户信息最多返回三条）
export const searchUserAndDynamic = data => {
    const req = {
        data,
        url: 'pc/api/search/searauseranddynamic'
    }
    return http.post(req)
}

//搜索(除自己)所有用户（昵称模糊查询，手机号和邮箱全匹配）
export const searchUser = data => {
    const req = {
        data,
        url: 'pc/api/search/searalluser'
    }
    return http.post(req)
}

//根据动态描述模糊搜索动态
export const searchDynamic = data => {
    const req = {
        data,
        url: 'pc/api/search/seardynamic'
    }
    return http.post(req)
}

//查询是否让对方查看动态或是否查看对方动态列表（type：1=不看好友动态；2=不让好友查看动态）
export const privacyDynamicviewList = data => {
    const req = {
        data,
        url: 'api/uc/privacy/dynamicviewlist'
    }
    return http.post(req)
}
//移除是否让对方查看动态或是否查看对方动态的设置（type：1=不看好友动态；2=不让好友查看动态）
export const privacyRemoveDynamicView = data => {
    const req = {
        data,
        url: 'api/uc/privacy/removedynamicview'
    }
    return http.post(req)
}

//设置是否让对方查看动态或是否查看对方动态（type：1=不看好友动态；2=不让好友查看动态）
export const privacySetDynamicView = data => {
    const req = {
        data,
        url: 'api/uc/privacy/setdynamicview'
    }
    return http.post(req)
}

//设置加自己为好友时是否需要验证

export const privacySetVerify = data => {
    const req = {
        data,
        url: 'api/uc/privacy/setisverify'
    }
    return http.post(req)
}
//设置用户的动态查看范围

export const privacySetViewDynamicRange = data => {
    const req = {
        data,
        url: 'api/uc/privacy/setviewdynamicrange'
    }
    return http.post(req)
}
// 判断用户是否购买该作者的作品或单个作品

export const snsDynamicorderCheck = data => {
    const req = {
        data,
        url: 'api/sns/dynamicorder/check'
    }
    return http.post(req)
}

// 用户购买付费作品
export const snsDynamicorderBuy = data => {
    const req = {
        data,
        url: 'api/sns/dynamicorder/buy'
    }
    return http.post(req)
}

//把用户购买一次查看的作品记录置为已过期
export const snsDynamicorderUpdate = data => {
    const req = {
        data,
        url: 'api/sns/dynamicorder/update'
    }
    return http.post(req)
}

//发红包
export const sendRed = data => {
    const req = {
        data,
        url: 'api/sns/redenvelope/send'
    }
    return http.post(req)
}

//设置作品价格
export const snsWorkSet = data => {
    const req = {
        data,
        url: 'api/sns/setprice/saveOrUpdate'
    }
    return http.post(req)
}

//获取用户设置的价格信息
export const snsWorkInfo = data => {
    const req = {
        data,
        url: 'api/sns/setprice/info'
    }
    return http.post(req)
}
