<template>
    <div>
        <div class="mailTopBar">
            <div class="l">
                <!-- :class="{'checked':selectedArr.length}" -->
                <span class="icon back"
                      @click="__close"></span>
                <span class="icon cloud"
                      v-tip="$t('email.upload')"
                      @click="__storageDialog('upload')"></span>
                <span class="icon cloud del"
                      v-tip="$t('email.delete')"
                      @click="__storageDialog('delete')"></span>
                <span class="icon local"
                      v-if="isLocal"
                      @click="__localSave"></span>
                <span class="icon trash"></span>

            </div>

        </div>
        <div class="scrollWrap">
            <Scroll>
                <div class="content">
                    <div class="column line">
                        <h4 class="title">{{item.emailTitle}}</h4>
                        <!-- <span class="icon print"></span> -->
                        <div class="sub">
                            <div class="name">
                                <p>{{item.sendUserName}}</p>
                                <span>
                                    &lt;{{item.sendUserEmail}}&gt;
                                </span>
                            </div>
                            <span>{{item.sendTime| relative}} ({{item.sendTime|distance}} {{$t('email.ago')}})</span>
                        </div>
                        <div class="recipient">
                            {{$t('email.remit')}} {{item.acceptUserName}}
                        </div>
                    </div>
                    <div class="column line"
                         v-html="item.emailContent">

                    </div>
                    <div class="column line"
                         v-if="item.emailAttachmentList.length">
                        <div class="attachmentTitle">

                            <div>{{item.emailAttachmentList.length}}{{$t('email.amount')}}</div>
                            <div class="download icon"
                                 @click="__downloadAll"></div>
                        </div>
                        <ul class="attachments">
                            <li class="attachment"
                                v-for="(ele,index) in item.emailAttachmentList"
                                :key="index">
                                <div class="normal">
                                    <span class="icon"></span>
                                    <div class="info">
                                        <span class="type">{{ele.attachmentType}}</span>
                                        <span class="name">{{ele.attachmentName}}</span>
                                    </div>
                                </div>
                                <div class="opt">
                                    <div class="info">
                                        <span class="type">{{ele.attachmentType}}</span>
                                        <span class="name">{{ele.attachmentName}}</span>
                                    </div>
                                    <div class="size">{{ele.attachmentSize}}KB</div>
                                    <div class="icons">
                                        <span @click="__downloadSingle(ele)"
                                              class="icon download"></span>
                                        <span class="icon upload"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="column line btns"
                         v-if="item.emailStatus===0">
                        <span class="btn cp"
                              @click="__edit('edit')">
                            <span class="icon reply"></span>
                            {{$t('email.edit')}}
                        </span>
                    </div>
                    <div class="column line btns"
                         v-else>

                        <span class="btn cp"
                              @click="__edit('reply')">
                            <span class="icon reply"></span>
                            {{$t('email.reply')}}
                        </span>
                        <span class="btn cp"
                              v-if="item.forwardMaxno==0"
                              @click="__edit('repost')">
                            <span class="icon repost"></span>
                            {{$t('email.repost')}}
                        </span>

                    </div>
                </div>

            </Scroll>
        </div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Scroll from '@/commom/Scroll'
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { format, formatRelative, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
const getFile = url => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        })
            .then(data => {
                resolve(data.data)
            })
            .catch(error => {
                reject(error.toString())
            })
    })
}
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    components: { Scroll },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            storageIds: state => state.Mail.storageIds,
            storageDialogState: state => state.Mail.storageDialogState,
            isUpload: state => state.Mail.isUpload
        }),
        isLocal() {
            let userMail = localStorage.getItem('USERMAIL') || {}
            if (typeof userMail === 'string') {
                userMail = JSON.parse(userMail)
            }
            let userId = this.userInfo.userId

            if (userId in userMail) {
            } else {
                userMail[userId] = []
            }
            let mailId = this.item.id
            let flag = true
            for (var i = 0; i < userMail[userId].length; i++) {
                if (userMail[userId][i].id === mailId) {
                    flag = false
                    // this.$Toast('')
                    break
                }
            }
            return flag
        },
        isCloud() {
            return this.item.isCloud !== 1
        }
    },
    methods: {
        ...mapMutations([
            'SET_MAIL_LIST_STATE',
            'SET_MAIL_PANEL_STATE',
            'SET_ISUPLOAD',
            'SET_STORAGEDIALOG_STATE'
        ]),

        __close() {
            this.$emit('close', false)
        },
        __refresh() {
            this.$emit('refresh', true, this.item)
        },
        //查找email文件夹是否存在  存在则返回文件夹id
        async __findEmailFolder() {
            let ids = this.storageIds
            let reqs = []
            for (let i = 0; i < ids.length; i++) {
                let req = this.api.cloudList({
                    dirFlag: 1,
                    fileType: 0,
                    pid: 0,
                    storageId: ids[i]
                })
                reqs.push(req)
            }
            const res = await Promise.all(reqs)
            let folderName = 'email'
            let emailFolders = []
            for (let i = 0; i < res.length; i++) {
                const folders = res[i].data
                let storageId = this.storageIds[i]
                if (folders.length) {
                    let emailFolder = {}
                    let flag = false
                    for (let i = 0; i < folders.length; i++) {
                        if (folders[i].fileName == folderName) {
                            emailFolder = folders[i]
                            flag = true
                        }
                    }
                    if (flag) {
                        emailFolders.push(emailFolder)
                    } else {
                        const folder = await this.__createFolder(
                            folderName,
                            storageId
                        )
                        emailFolders.push(folder)
                    }
                } else {
                    const folder = await this.__createFolder(
                        folderName,
                        storageId
                    )
                    emailFolders.push(folder)
                }
            }

            return emailFolders
        },

        //email不存在则在所选节点根目录创建
        async __createFolder(folderName, storageId) {
            let folder = {}
            const res = await this.api.cloudCreateFolder({
                pid: 0,
                folderName,
                storageId
            })
            if (res.code === 0) {
                folder = res.data
            }
            return folder
        },

        //上传邮件到email文件夹
        async __uploadEmail(folders) {
            let files = [this.item]
            let reqs = []

            for (let i = 0; i < folders.length; i++) {
                const folder = folders[i]
                for (let i = 0; i < files.length; i++) {
                    let flag = true

                    let json = files[i].cloudPath
                    if (json) {
                        let tempArr = JSON.parse(json)
                        for (let k = 0; k < tempArr.length; k++) {
                            if (folder.storageId === tempArr[k].storageId) {
                                flag = false
                            }
                        }
                    }
                    if (flag) {
                        console.log(files[i].id + '.txt', folder.storageId)
                        let formData = new FormData()
                        let blob = new Blob([JSON.stringify(files[i])], {
                            type: 'application/json'
                        })
                        formData.append('file', blob, files[i].id + '.txt')
                        formData.append('id', folder.id)
                        formData.append('storageId', folder.storageId)
                        reqs.push(this.api.cloudUploadFile(formData))
                    }
                }
            }
            return await Promise.all(reqs)
        },
        //删除emial文件夹下邮件
        async __deleteEmail() {
            let emails = [this.item]
            let delIds = []
            console.log(emails, 'emails')
            let ids = this.storageIds
            for (let i = 0; i < ids.length; i++) {
                emails.forEach(item => {
                    let json = item.cloudPath
                    if (json) {
                        let jsonArr = JSON.parse(json)
                        console.log(jsonArr, '------')

                        for (let k = 0; k < jsonArr.length; k++) {
                            console.log(ids[i], jsonArr[k].storageId)
                            if (ids[i] == jsonArr[k].storageId) {
                                delIds.push(jsonArr[k].id)
                                jsonArr.splice(k, 1)
                                k--
                            }
                        }
                        item.cloudPath = JSON.stringify(jsonArr)
                    }
                })
            }
            const res = await this.api.cloudDeleteByIds({ ids: delIds })
            return res
        },
        async __hasCloud() {
            return await this.api.cloudCheck()
        },

        __getCloudPath(uploadRes) {
            let res = {}
            let reg = /\d*(?=.txt)/

            for (let i = 0; i < uploadRes.length; i++) {
                let item = uploadRes[i]
                if (item.code === 0) {
                    let emailId = reg.exec(item.data.fileName)[0]
                    if (!emailId) continue
                    if (!res[emailId]) {
                        let tempArr = uploadRes.filter(ele => {
                            if (ele.code === 0) {
                                let emailId1 = reg.exec(ele.data.fileName)[0]
                                return emailId === emailId1
                            }
                        })
                        res[emailId] = tempArr.map(ele => {
                            return {
                                id: ele.data.id,
                                pid: ele.data.pid,
                                storageId: ele.data.storageId
                            }
                        })
                    }
                }
            }
            return res
        },

        //更改邮件cloudpath
        async __changeCloudPath(cloudPath) {
            let reqs = []
            let files = [this.item]
            files.forEach(item => {
                let itemPath = item.cloudPath && JSON.parse(item.cloudPath)
                let pathArr = cloudPath[item.id] || []
                if (itemPath instanceof Array) {
                    pathArr = pathArr.concat(itemPath)
                }
                let req = {
                    cloudPath: JSON.stringify(pathArr),
                    id: item.id
                }
                reqs.push(this.api.emailUpdateCloudPath(req))
            })

            const res = await Promise.all(reqs)
            console.log(res, '__changeCloudPath')
            return res
        },

        /* 
            邮件上传云端成功后回调服务器更改邮件状态
        */
        async __cloudSave() {
            const folders = await this.__findEmailFolder()
            const uploadRes = await this.__uploadEmail(folders)
            const path = this.__getCloudPath(uploadRes)

            return this.__changeCloudPath(path)
        },
        //邮件删除
        async __cloudDel() {
            await this.__deleteEmail()
            let reqs = []
            let files = [this.item]
            files.forEach(item => {
                let req = {
                    cloudPath: item.cloudPath,
                    id: item.id
                }
                reqs.push(this.api.emailUpdateCloudPath(req))
            })

            const res = await Promise.all(reqs)
        },

        async __cloudOperate() {
            if (this.isUpload) {
                await this.__cloudSave()
            } else {
                await this.__cloudDel()
            }
            this.$Toast(this.$t('success'))
            this.__refresh()
        },
        async __storageDialog(command) {
            const data = await this.__hasCloud()
            if (data.code === 0) {
                this.SET_STORAGEDIALOG_STATE(true)
            } else {
                this.$Toast(data.msg)
            }

            switch (command) {
                case 'upload':
                    this.SET_ISUPLOAD(true)
                    break
                case 'delete':
                    this.SET_ISUPLOAD(false)
                    break
            }
        },

        //下载全部附件
        __downloadAll() {
            const zip = new JSZip()
            const promises = []
            this.item.emailAttachmentList.forEach(item => {
                const promise = getFile(item.attachmentHashcode).then(data => {
                    // 下载文件, 并存成ArrayBuffer对象
                    let arrName = item.attachmentHashcode.split('/')
                    let fileName = arrName[arrName.length - 1] // 获取文件名
                    zip.file(fileName, data, { binary: true }) // 逐个添加文件
                })
                promises.push(promise)
            })
            Promise.all(promises).then(() => {
                zip.generateAsync({ type: 'blob' }).then(content => {
                    // 生成二进制流
                    FileSaver.saveAs(content, 'default.zip') // 利用file-saver保存文件
                })
            })
        },
        __show() {},
        async __downloadSingle(item) {
            let url = item.attachmentHashcode
            FileSaver.saveAs(url, item.attachmentName)
        },
        __edit(state) {
            let mail = JSON.parse(JSON.stringify(this.item))
            if (state === 'reply') {
                this.SET_MAIL_PANEL_STATE({ name: 'titleStatus', state: '1' })
                let date = format(new Date(mail.sendTime), 'yyyy-MM-dd', {
                    locale: zhCN
                })
                let attachment = ''
                mail.emailAttachmentList.forEach(el => {
                    attachment += `
                                <p style='color:#036eb7'>${
                                    el.attachmentName
                                }</p>
                                `
                })

                mail.emailContent = `
                <p><br></p>
                <div style='color:#036eb7'> ${date +
                    ' , ' +
                    mail.emailTitle}:</div>
                <p></p>
                ${mail.emailContent}
                ${attachment}
                `
                mail.id = ''
            }
            if (state === 'repost') {
                this.SET_MAIL_PANEL_STATE({ name: 'titleStatus', state: '2' })
                let attachment = ''
                mail.emailAttachmentList.forEach(el => {
                    attachment += `
                                <p style='color:#036eb7'>${
                                    el.attachmentName
                                }</p>
                                `
                })
                mail.emailContent = `
                <p><br></p>
                <div class='repost_mail'>
                <p></p>
                ${mail.emailContent}
                ${attachment}
                </div>
                `
                mail.parentEmailId = mail.id
                mail.id = ''
            }
            if (state == 'edit') {
                this.SET_MAIL_PANEL_STATE({ name: 'titleStatus', state: '3' })
            }

            this.$emit('show', mail)
        },

        //邮件存到本地localStorage
        __localSave() {
            let userMail = localStorage.getItem('USERMAIL') || {}
            if (typeof userMail === 'string') {
                userMail = JSON.parse(userMail)
            }
            let userId = this.userInfo.userId

            if (userId in userMail) {
            } else {
                userMail[userId] = []
            }
            let mailId = this.item.id
            let flag = true
            for (var i = 0; i < userMail[userId].length; i++) {
                if (userMail[userId][i].id === mailId) {
                    flag = false
                    // this.$Toast('')
                    break
                }
            }
            if (flag) {
                this.$Toast(this.$t('success'))

                this.item.isLocal = true
                userMail[userId].push(this.item)
                localStorage.setItem('USERMAIL', JSON.stringify(userMail))
            }
        }
    },
    filters: {
        relative(value) {
            return formatRelative(subDays(new Date(value), 0), new Date(), {
                locale: zhCN
            })
        },
        distance(value) {
            return formatDistance(subDays(new Date(value), 0), new Date(), {
                locale: zhCN
            })
        }
    },
    watch: {},
    created() {
        this.$bus.on('emailCloudOperate', this.__cloudOperate)
    },
    beforeDestroy() {
        this.$bus.off('emailCloudOperate', this.__cloudOperate)
    }
}
</script>

<style  lang='scss' scoped>
.icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-size: 100% 100%;
}
.mailTopBar {
    display: flex;
    width: 100%;
    height: 56px;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e9;

    .l {
        display: flex;
        margin-left: 20px;
        align-items: center;
        > div {
            display: flex;
            align-items: center;
        }
        .icon {
            margin-right: 12px;
        }
        .back {
            background-image: url('./img/back.png');
        }
        .checked {
            background-image: url('./img/icon_checked@2x.png');
        }
        .refresh {
            background-image: url('./img/icon_refresh@2x.png');
        }
        .cloud {
            width: 18px;
            height: 18px;
            background-image: url('./img/icon_10@2x.png');
            &.del {
                background: url('./img/icon_10del@2x.png') no-repeat center;
                background-size: 80% 80%;
            }
        }

        .local {
            background-image: url('./img/icon_11@2x.png');
        }
    }
}
.content {
    .column {
        position: relative;
        padding: 10px 28px;
        .title {
            font-weight: normal;
            font-size: 18px;
            padding-bottom: 30px;
        }
        .print {
            position: absolute;
            right: 38px;
            top: 20px;
            background-image: url('./img/print.png');
        }
        .sub {
            display: flex;
            justify-content: space-between;
            .name {
                display: flex;
                > p {
                    font-size: 16px;
                    margin-right: 10px;
                }
            }
            > span {
                font-size: 12px;
            }
            .recipient {
            }
        }
        .attachments {
            display: flex;
            flex-wrap: wrap;
            .attachment {
                position: relative;
                margin: 20px 20px 0 0;
                width: 146px;
                height: 80px;
                border: 1px solid #dfdfdf;
                .type {
                    width: 20px;
                    height: 20px;
                    margin: 2px 10px;
                    background: #036eb7;
                    color: #ffffff;
                    font-size: 8px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 2px;
                }
                .name {
                    font-size: 12px;
                    line-height: 26px;
                    width: 78px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .normal {
                    .icon {
                        display: block;
                        width: 100%;
                        height: 54px;
                        background: url('./img/icon_7@2x.png') no-repeat center
                            center;
                        background-size: 40px 40px;
                    }
                    > .info {
                        height: 24px;
                        border-top: 1px solid #dfdfdf;
                        display: flex;
                    }
                }
                .opt {
                    position: absolute;
                    background: #eeeeef;
                    display: none;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    padding: 2px;
                    > .info {
                        display: flex;
                    }
                    .size {
                        font-size: 11px;
                        color: #888888;
                        margin-left: 10px;
                    }
                    .icons {
                        display: flex;
                        margin-top: 8px;
                        margin-left: 26px;
                        .icon {
                            width: 20px;
                            height: 20px;
                            background-size: 100% 100%;
                            margin-right: 10px;
                        }
                        .download {
                            background-image: url('./img/window_email_down@3x.png');
                        }
                        .upload {
                            background-image: url('./img/window_email_.png');
                        }
                    }
                }
            }
            .attachment:hover {
                .opt {
                    display: block;
                }
            }
        }

        .attachmentTitle {
            display: flex;
            justify-content: space-between;
            .download {
                width: 30px;
                height: 30px;
                background-image: url('./img/icon_73@2x.png');
            }
        }

        .btn {
            display: inline-flex;
            padding: 5px 20px;
            border: 1px solid #dfdfdf;
            font-size: 12px;
            align-items: center;
            margin-right: 20px;
            .icon {
                margin-right: 5px;
            }
            .reply {
                background-image: url('./img/icon_88@2x.png');
            }
            .repost {
                background-image: url('./img/icon_73@2x.png');
                transform: rotate(-90deg);
            }
        }
    }

    .line {
        border-bottom: 1px solid #dfdfdf;
    }
}
.scrollWrap {
    position: absolute;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}
</style>
