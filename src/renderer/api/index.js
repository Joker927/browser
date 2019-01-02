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

//忘记密码
export const forgetPwd = data => {
    const req = {
        data,
        url: 'pc/api/user/forgetpwd'
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
        data: { searchName },
        url: 'pc/api/search/searchuserandgroup'
    }
    return http.post(req)
}

//搜索好友和群组
export const searchFriendOrGroup = data => {
    let { searchName } = data
    const req = {
        data: { searchName },
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
        data: { requesterId },
        url: 'pc/api/friendrequest/refust'
    }
    return http.post(req)
}
//好友请求列表
export const friendRequestList = data => {
    //userId
    let { userId } = data
    const req = {
        data: { userId },
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
        data: { id: id },
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

//用户主页的动态列表
export const snsIndexlist = data => {
    const req = {
        data,
        url: 'api/sns/dynamic/indexlist'
    }
    return http.post(req)
}
