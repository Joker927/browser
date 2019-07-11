<template>
    <div class="mailTopBar">
        <div class="l">

            <span class="icon check"
                  @click="__selectAll"
                  :class="{'checked':selectedArr.length==data.totalPage&&selectedArr.length>0}"></span>
            <span class="icon refresh"
                  @click="__refresh"
                  v-if="!selectedArr.length"></span>
            <div class="selected"
                 v-if="selectedArr.length&&name!=='trash'">
                <span class="icon cloud"
                      v-tip="$t('email.upload')"
                      @click="__storageDialog('upload')"></span>
                <span class="icon cloud del"
                      v-tip="$t('email.delete')"
                      @click="__storageDialog('delete')"></span>
                <span class="icon local"
                      v-tip="$t('email.local')"
                      @click="__localSave"
                      v-if="name!=='local'&&name!=='draft'"></span>
                <span @click="__operate(3)"
                      v-tip="$t('email.trash')"
                      class="icon trash"></span>
            </div>
            <div class="selected"
                 v-if="selectedArr.length&&name==='trash'">
                <span class="icon recover"
                      @click="__operate(1)"></span>
                <span class="icon delete"
                      @click="__operate(4)"></span>
            </div>
        </div>
        <div class="r">
            <p v-if="data.currPage">{{data.currPage*50-49}}-{{data.currPage*50}}{{$t('email.column')}} ({{$t('email.account')}}{{data.totalCount}}{{$t('email.column')}})</p>
            <div>
                <span class="icon p"
                      @click="__option('prev')"></span>
                <span class="icon n"
                      @click="__option('next')"></span>
                <span @click="__setting"
                      class="icon s"></span>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isArray } from 'util'

export default {
    props: {
        data: {
            type: Object
        },
        selectedArr: {
            type: Array,
            default: () => {
                return []
            }
        },
        name: {
            type: String
        }
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            storageIds: state => state.Mail.storageIds,
            storageDialogState: state => state.Mail.storageDialogState,
            isUpload: state => state.Mail.isUpload
        }),
        isClouded() {
            return this.selectedArr.every(item => item.isClouds == 1)
        },
        isCloud() {
            return this.selectedArr.every(item => item.isClouds != 1)
        }
    },
    methods: {
        ...mapMutations([
            'SET_MAIL_LIST_STATE',
            'SET_STORAGEDIALOG_STATE',
            'SET_ISUPLOAD'
        ]),
        __setting() {
            if (this.name == 'white' || this.name == 'black') {
                this.SET_MAIL_LIST_STATE()
            }
        },
        __selectAll() {
            let state = this.selectedArr.length !== this.data.totalPage
            this.$emit('selectAll', state)
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
            let files = this.selectedArr
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
            let emails = this.selectedArr
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
            console.log(delIds, 'delIds', this.selectedArr)
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
            this.selectedArr.forEach(item => {
                let itemPath = item.cloudPath && JSON.parse(item.cloudPath)
                let pathArr = cloudPath[item.id] || []
                console.log(itemPath, pathArr, 'itemPath,pathArr')
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
            this.selectedArr.forEach(item => {
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
            this.__refresh()
            this.$Toast(this.$t('success'))
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

        //将邮件以用户id为key的对象形式存到localStorage
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
            let isSucess = false
            for (var j = 0; j < this.selectedArr.length; j++) {
                let mailId = this.selectedArr[j].id

                let flag = true
                for (var i = 0; i < userMail[userId].length; i++) {
                    if (userMail[userId][i].id === mailId) {
                        flag = false
                        // continue
                    }
                }
                if (flag) {
                    isSucess = true
                    this.selectedArr[j].isLocal = true
                    this.selectedArr[j].check = false
                    userMail[userId].push(this.selectedArr[j])
                }
            }
            if (isSucess) {
                this.$Toast(this.$t('success'))
            }
            localStorage.setItem('USERMAIL', JSON.stringify(userMail))

            this.__refresh()
        },
        __option(state) {
            this.$emit('turnPage', state)
        },
        __refresh() {
            this.$emit('refresh')
        },

        async __operate(status) {
            let ids = this.selectedArr.map(item => {
                return item.id
            })
            if (this.name === 'draft') {
                status = 4
            }
            let req = {
                emailStatus: status,
                ids: ids,
                userId: this.userInfo.userId
            }

            const res = await this.api.emailOperate(req)
            if (res.code !== 0) return
            if (this.name === 'local') {
                let userMail = localStorage.getItem('USERMAIL')
                //
                if (typeof userMail === 'string') {
                    userMail = JSON.parse(userMail)
                }
                let userId = this.userInfo.userId
                let indexArr = []

                for (let i = userMail[userId].length - 1; i >= 0; i--) {
                    let item = userMail[userId][i]
                    for (var j = 0; j < ids.length; j++) {
                        if (item.id === ids[j]) {
                            userMail[userId].splice(i, 1)
                        }
                    }
                }
                localStorage.setItem('USERMAIL', JSON.stringify(userMail))
            }
            this.__refresh()
            this.$Toast(this.$t('success'))
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
.mailTopBar {
    display: flex;
    width: 100%;
    height: 68px;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e9;
    .icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        box-sizing: content-box;
        background-size: 100% 100%;
    }
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
        .check {
            background-image: url('./img/icon_check@2x.png');
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
        .recover {
            width: 13px;
            height: 13px;
            background-image: url('./img/recover.png');
        }
        .delete {
            width: 13px;
            height: 13px;
            background-image: url('./img/delete.png');
        }
        .trash {
            width: 18px;
            height: 18px;
            background-image: url('./img/icon_12@2x.png');
        }
        .arrow {
        }
    }
    .r {
        display: flex;
        align-items: center;
        > div {
            padding: 0 60px 0 20px;
            display: flex;
            align-items: center;
        }
        .p {
            background-image: url('./img/icon_p@2x.png');
        }
        .ap {
            background-image: url('./img/icon_ap@2x.png');
        }
        .n {
            background-image: url('./img/icon_n@2x.png');
        }
        .an {
            background-image: url('./img/icon_an@2x.png');
        }
        .s {
            width: 30px;
            height: 30px;
            background-image: url('./img/icon_s@2x.png');
        }
    }
}
</style>
