<template>
    <div class="edit">
        <div class="mailTopBar">
            <div class="l">
                <!-- :class="{'checked':selectedArr.length}" -->
                <span class="icon back"
                      @click="__close"></span>
                <h3>{{title}}</h3>
            </div>
            <div class="r">
                <span v-for="(item,index) in menu"
                      :key="index"
                      class="icon cp"
                      :class="{'active':selectNum=== index,[item]:true,'locked':forwardMaxno>0,'ed':emojiShow}"
                      @click="__cleckTools(item,index)"></span>
                <span class="send cp"
                      @click="__send()">傳送</span>
                <div ref="toolbar"
                     v-show="toolBar"
                     class="toolbar">
                </div>
                <div ref="emoji"
                     class="emoji">
                </div>
                <EmojiPanel v-show="emojiShow"
                            @setEmoji='__setEmoji'
                            class="emojiPanel"></EmojiPanel>

                <input type="file"
                       ref="UpFile"
                       multiple
                       style="display:none"
                       @change="__uploadAttachment">
            </div>

        </div>
        <div class="main">
            <div class="title">
                <span>主旨</span> <input v-model="emailTitle"
                       type="text">
            </div>
            <div class="name">
                <span class="n">收件人</span>
                <!-- <input v-model="acceptUserId"
                       type="text"> -->
                <ul class="list">
                    <li v-for="(item,index) in displayList"
                        :key="index">

                        <p>&lt;{{item.nickname}}&gt;</p><span class="x cp"
                              @click="__del(index)">x</span>
                    </li>
                    <li v-if="selectedList.length>3">
                        <p>与其他{{selectedList.length-3}}位</p>
                    </li>
                    <li class="input">
                        <input type="text"
                               v-model="searchValue">
                    </li>
                </ul>
                <i class="add cp"
                   @click="__addContact">+</i>
            </div>
            <div class="contact"
                 v-if='contactShow'>
                <div class="mask"
                     @click="__closeContact"></div>
                <div class="view">
                    <ul class="list">

                        <li class=""
                            v-for="(item,index) in selectedList"
                            :key="index">
                            <p>
                                &lt;{{item.nickname}}&gt;
                            </p><span class="x cp"
                                  @click="__del(index)">x</span>
                        </li>
                        <li class="input">
                            <input type="text"
                                   v-model="searchValue">
                        </li>
                    </ul>
                    <div class="optionsWrap">
                        <ul class="options"
                            v-if="searchShow">
                            <li class="title">搜尋所有用戶結果</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in searchlist">
                                <p> &lt;{{item.nickname}}&gt;</p>
                            </li>
                        </ul>
                        <ul class="options"
                            v-else>
                            <li class="title">最近互动邮件</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in recentuserlist">
                                <p> &lt;{{item.nickname}}&gt;</p>
                            </li>
                            <li class="title">联络人</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in friendlist">
                                &lt;{{item.nickname}}&gt;
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
            <div class="editWrap">
                <!-- <Scroll> -->
                <div>
                    <div ref="editor"
                         class="content"></div>
                    <div class="attachment">
                        <div v-for="(item,index) in attachment"
                             :key="index">
                            <div class="info">
                                <span>{{item.name}}</span>({{item.size}}KB)
                            </div>
                            <div class="progressWrap">
                                <div :style="{width:item.width}"
                                     class="progress"></div>
                            </div>
                            <div @click="__delAttachment(item.id)"
                                 class="iocn cancel cp"></div>
                        </div>
                    </div>
                </div>
                <!-- </Scroll> -->

            </div>

        </div>
        <div class="mask"
             v-if="linkShow">
            <div class="addLink">
                <div class="title">
                    <h4>修改链接</h4>
                    <span class="close"></span>
                </div>
                <div class="form">
                    <div class="txt">
                        <p>要显示的文本:</p> <input v-model="href.text"
                               type="text">
                    </div>
                    <div>
                        <div class="left">
                            <p>链接到:</p>
                            <p @click="__checkTab(0)"
                               class="cp link"
                               :class="{active:activeTab ===0}">网址</p>
                            <p @click="__checkTab(1)"
                               class="cp mail"
                               :class="{active:activeTab ===1}">电子邮件地址</p>
                        </div>
                        <div class="right">
                            <div v-if="activeTab===0">此链接应转到什么网址？</div>
                            <div v-else>此链接将链接到哪个邮件地址?</div>
                            <input type="text"
                                   v-model="href.url">

                            <div class="test"
                                 v-if="activeTab===0">
                                测试此链接
                                <!-- <a :href="href"
                   target="_blank"></a> -->
                            </div>
                            <div v-if="activeTab===0">
                                不确定框中要放什么？首先，在网络中查找想要链接的页面。（可能需要使用搜索引
                                擎。） 然后，从浏览器的地址栏的框中复制网址，并将其粘贴到上方的框中。
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <span class="cp"
                          @click="__switch">取消</span>
                    <span class="done cp"
                          @click="__done">确定</span>
                </div>
            </div>
        </div>
        <!-- <div class="mask"
             v-if="forwardShow">
            <div class="repost">
                <div class="title">设置转发次数</div>
                <div class="form">
                    <p>此邮件可以转发</p>
                    <input type="text"
                           v-model="forwardMaxno">
                    <p>次</p>
                </div>
                <div class="btn">
                    <span class="cp"
                          @click="__forwardSwitch">取消</span>
                    <span class="done cp"
                          @click="__forwardConfirm">确定</span>
                </div>
            </div>

        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import E from 'wangeditor'
import Scroll from '@/commom/Scroll'
import EmojiPanel from './EmojiPanel'
import { closestIndexTo, closestTo } from 'date-fns/esm'

export default {
    props: {
        item: {
            type: Object
        },
        flag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menu: ['tools', 'upload', 'link', 'emoji', 'lock', 'trash'],
            toolBar: false,
            selectNum: null,
            emailTitle: '',
            emailContent: '输入邮件内容',
            acceptUserId: null,
            attachmentIds: [],
            attachment: [],
            editor: '',
            linkShow: false,
            activeTab: 0,
            href: {
                text: '',
                url: ''
            },
            recentuserlist: [],
            friendlist: [],
            selectedList: [],
            //displayList: [],
            contactShow: false,
            searchShow: false, //搜索框状态
            searchValue: '', //搜索内容
            searchlist: [],
            forwardMaxno: 0, //最大转发次数
            forwardShow: false,
            emojiShow: false
        }
    },
    components: { Scroll, EmojiPanel },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            titleStatus: state => state.Mail.titleStatus
        }),
        displayList() {
            return this.selectedList.slice(0, 3)
        },
        acceptUserIds() {
            return this.selectedList.map(item => item.userId)
        },
        title() {
            let str = ''
            switch (this.titleStatus) {
                case '0':
                    str = '新邮件'

                    break
                case '1':
                    str = '回复'
                    break
                case '2':
                    str = '转发'
                    break
                case '3':
                    str = '编辑'
                    break
            }
            console.log(str, 'str')
            return str
        }
    },
    methods: {
        async __getFriendlist() {
            const res = await Promise.all([
                this.api.emailRecentuserlist(this.userInfo.userId),
                this.api.emailFriendlist(this.userInfo.userId)
            ])
            this.recentuserlist = res[0].data
            this.friendlist = res[1].data
        },
        __select(item) {
            let flag = true
            this.selectedList.forEach((ele, index) => {
                if (item.userId == ele.userId) {
                    flag = false
                }
            })
            if (flag) {
                this.selectedList.push(item)
            }
        },
        __del(index) {
            this.selectedList.splice(index, 1)
        },
        __addContact() {
            this.contactShow = true
        },
        __closeContact() {
            this.contactShow = false
            this.searchValue = ''
            this.searchShow = false
        },
        __search() {},
        __cleckTools(name, index) {
            console.log('object', index)
            this.selectNum = index
            switch (name) {
                case 'tools':
                    this.toolBar = !this.toolBar
                    break
                case 'upload':
                    this.toolBar = false
                    this.$refs.UpFile.click()
                    break
                case 'link':
                    this.toolBar = false
                    this.__switch()
                    break
                case 'emoji':
                    this.toolBar = false
                    this.emojiShow = !this.emojiShow
                    break
                case 'lock':
                    this.toolBar = false
                    this.forwardMaxno = this.forwardMaxno ? 0 : 1

                    //this.__forwardSwitch()
                    break
                case 'trash':
                    this.toolBar = false
                    this.__close()
                    break
            }
        },

        __setEmoji(emoji) {
            console.log(typeof emoji, 'emoji')

            this.emailContent += emoji
            console.log(this.emailContent)
        },
        __getContent(html) {
            this.emailContent = html
            // console.log(html)
        },

        async __send(status = 1) {
            let data = {
                acceptUserIds: this.acceptUserIds,
                // acceptUserName: 'string',
                attachmentIds: this.attachmentIds,
                emailContent: this.emailContent,
                emailStatus: status,
                emailTitle: this.emailTitle,
                forwardMaxno: this.forwardMaxno,
                sendUserId: this.userInfo.userId,
                //id: 0,
                //  isClouds: true,
                //  isCollected: true,
                parentEmailId: this.parentEmailId
            }
            if (this.flag) {
                data.draftId = this.item.id
            }
            const res = await this.api.emailSend(data)
            if (res.code == 0) {
                this.$Toast('发送成功')
                this.$emit('close', false)
            } else {
                this.$Toast(res.msg)
            }
        },
        __close() {
            if (this.emailContent !== '') {
                // this.$Toast('邮件自动保存为草稿')
                //this.__send(0)
            } else {
            }
            this.$emit('close', false)
        },
        __editorInit() {
            this.editor = new E(this.$refs.toolbar, this.$refs.editor)
            this.editor.customConfig.onchange = html => {
                this.__getContent(html)
            }
            this.editor.customConfig.onblur = html => {
                // html 即编辑器中的内容
                this.__getContent(html)
            }
            this.editor.customConfig.onfocus = e => {
                //console.log(this.editor.textElemId, 'onfocus')
            }
            this.editor.customConfig.zIndex = 2
            this.editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                //'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'image' // 插入图片
                //'emoticon', // 表情

                //'table', // 表格
                //'video' // 插入视频
                //'code', // 插入代码
                //'undo', // 撤销
                //'redo' // 重复
            ]
            this.editor.create()
            if (this.titleStatus === '0') {
                console.log('执行')
                this.$nextTick(() => {
                    this.editor.txt.html(this.emailContent)
                })
            }
        },
        __delAttachment(id) {
            let index = this.attachmentIds.indexOf(id)
            this.attachmentIds.splice(index, 1)
            let i
            this.attachment.forEach((item, index) => {
                if (item.id === id) {
                    i = index
                }
            })
            this.attachment.splice(i, 1)
        },
        async __uploadAttachment() {
            let files = this.$refs.UpFile.files
            let id = this.userInfo.userId
            let reqs = []
            let o = {}
            for (let i = 0; i < files.length; i++) {
                let formData = new FormData()
                formData.append('userId', id)
                formData.append('file', files[i])
                o = {
                    name: files[i].name,
                    size: Math.round(files[i].size / 1024),
                    width: 0,
                    id: null
                }

                let cb = res => {
                    let width = (res.loaded / res.total) * 100 + '%'
                    this.$set(o, ['width'], width)
                }
                this.attachment.unshift(o)
                reqs.push(this.api.emailUpload(formData, cb))
            }
            const res = await Promise.all(reqs)
            for (let i = 0; i < res.length; i++) {
                if (!res[i].code) {
                    this.attachmentIds.push(res[i].data.attachmentId)
                    o.id = res[i].data.attachmentId
                }
            }

            console.log(res, '__uploadAttachment', this.attachmentIds)
        },
        __switch() {
            this.href = {}
            this.linkShow = !this.linkShow
        },
        __done() {
            let str = ''
            if (this.activeTab) {
                str = `<a href=mailto:${this.href.url} >${this.href.text}</a>`
            } else {
                str = `<a href=${this.href.url}>${this.href.text}</a>`
            }
            if (str) this.editor.txt.append(str)
            this.__switch()
        },
        __forwardSwitch() {
            this.forwardShow = !this.forwardShow
        },
        __forwardCancel() {
            this.forwardMaxno = 0
            this.__forwardSwitch()
        },
        __forwardConfirm() {
            this.__forwardSwitch()
        },
        __checkTab(index) {
            this.activeTab = index
        }
    },
    watch: {
        flag: {
            handler() {
                if (this.flag) {
                    this.emailTitle = this.item.emailTitle
                    this.emailContent = this.item.emailContent
                    this.$nextTick(() => {
                        this.editor.txt.html(this.emailContent)
                    })
                    this.acceptUserId = this.item.acceptUserId
                    this.parentEmailId = this.item.parentEmailId
                    let req = {
                        id: this.item.acceptUserId
                    }
                    this.api.friendInfo(req).then(res => {
                        if (res.code == 0) {
                            this.selectedList.push(res.data)
                        }
                    })
                    // this.attachmentIds = this.item.attachmentIds || []
                    // console.log(this.item, 'this.item.this.item.')
                }
            },
            immediate: true
        },
        searchValue() {
            clearTimeout(this.timer)
            if (this.searchValue.trim() === '') return
            this.timer = setTimeout(() => {
                let req = {
                    userId: this.userInfo.userId,
                    keyWord: this.searchValue
                }

                this.api.emailFuzzyUser(req).then(res => {
                    this.searchShow = true
                    if (res.code == 0) {
                        this.searchlist = res.data
                        this.__addContact()
                    }
                })
            }, 300)
        },
        emailContent() {
            this.editor.txt.html(this.emailContent)
        }
    },
    mounted() {
        this.__editorInit()
    },
    created() {
        this.__getFriendlist()
    }
}
</script>

<style  scoped lang='scss'>
.edit {
    position: absolute;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 1;
    background: #ffffff;
}
.mailTopBar {
    position: relative;
    display: flex;
    width: 100%;
    height: 56px;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e9;
    .icon {
        width: 18px;
        height: 18px;
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
        .back {
            background-image: url('./img/back.png');
        }
    }
    .r {
        .icon {
            margin: 0 10px;
        }
        display: flex;
        align-items: center;
        .send {
            margin: 0 10px;
            background: #3f61a6;
            color: #ffffff;
            height: 30px;
            padding: 0 30px;
            line-height: 30px;
            border-radius: 4px;
        }
        .tools {
            background-image: url('./img/edit/write_format.png');
        }
        .tools.active {
            background-image: url('./img/edit/write_format_pressed.png');
        }
        .upload {
            background-image: url('./img/edit/write_file.png');
        }
        .link {
            background-image: url('./img/edit/write_link.png');
        }
        .emoji {
            background-image: url('./img/edit/write_expression.png');
        }
        .emoji.ed {
            background-image: url('./img/edit/write_expression_pressed.png');
        }
        .lock {
            background-image: url('./img/edit/write_limit.png');
        }
        .lock.locked {
            background-image: url('./img/edit/write_limit_pressed.png');
        }
        .trash {
            background-image: url('./img/edit/write_delete.png');
        }
    }
    .toolbar {
        position: absolute;
        bottom: -30px;
        right: 10px;
        background: #fff;
        border: 1px solid #e8e8e9;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    }
    .emojiPanel {
        position: absolute;
        top: 50px;
        right: 10px;
        z-index: 20;
        background: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    }
}
.main {
    background: #f7f7f7;
    .title,
    .name {
        display: flex;
        font-size: 20px;
        line-height: 38px;
        border-bottom: 1px solid #e8e8e9;
        padding: 0 20px;
        background: #ffffff;
        > input {
            font-size: 14px;
            padding: 0 20px;
            flex-grow: 1;
            border: none;
            outline: none;
            background: transparent;
        }
    }
    .contact,
    .name {
        font-size: 16px;
        align-items: flex-start;
        .n {
            min-width: 60px;
        }
        .add {
            font-size: 24px;
            font-style: normal;
            line-height: 20px;
            min-width: 24px;
            height: 24px;
            margin: 8px;
            border-radius: 50%;
            color: #ffffff;
            background: #3f61a6;
            text-align: center;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;

            > li {
                display: flex;
                font-size: 14px;
                line-height: 30px;
                height: 30px;
                padding: 0 10px;
                border: 1px solid #dbdbdb;
                border-radius: 20px;
                margin: 5px;

                .x {
                    font-size: 14px;
                    line-height: 1;
                    padding-left: 10px;
                    margin-top: 6px;
                }
            }
            li:hover {
                background: #dbdbdb;
                color: #ffffff;
            }
            .input {
                border-radius: 0px;
                flex-grow: 1;
                border: none;
                > input {
                    width: 100%;
                    outline: none;
                    border: none;
                    font-size: 14px;
                }
            }
            .input:hover {
                background: inherit;
                color: inherit;
            }
        }
    }
    .contact {
        position: absolute;
        top: 98px;
        bottom: 0;
        left: 0px;
        right: 0px;
        padding: 0 60px 0 80px;
        z-index: 3;

        .view {
            position: absolute;
            top: 0px;
            left: 80px;
            right: 60px;
            z-index: 3;
            background: #ffffff;

            .list {
                min-height: 44px;
            }
            .optionsWrap {
                max-height: 300px;
                padding: 10px 0;
                overflow: auto;
                .options {
                    overflow: hidden;
                    > li {
                        display: flex;
                        height: 24px;
                        padding-left: 10px;
                    }
                    .title {
                        background: #f7f7f7;
                        font-size: 12px;
                        color: #888888;
                        line-height: 24px;
                    }
                    > li:hover {
                        background: #dbdbdb;
                    }
                }
            }
        }
        .mask {
            position: absolute;
            top: 44px;
            bottom: 0;
            left: 0px;
            right: 0px;
            background: #000;
            opacity: 0.3;
        }
    }
    .editWrap {
        position: absolute;
        top: 135px;
        bottom: 0;
        width: 100%;
        overflow: auto;
        background: #f7f7f7;
        .content {
            position: relative;
            text-align: left;
            min-height: 160px;
            padding: 20px;
        }
    }

    .attachment {
        margin-left: 20px;
        width: 636px;
        padding-bottom: 100px;
        overflow: hidden;
        > div {
            width: 626px;
            height: 34px;
            background: #ffffff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            .info {
                padding-left: 20px;
                font-size: 14px;
                line-height: 34px;
                color: #858585;
                flex-grow: 1;
                display: flex;
                align-items: center;
                > span {
                    display: inline-block;
                    max-width: 360px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #000000;
                }
            }
            .progressWrap {
                position: relative;
                width: 94px;
                height: 12px;
                border: 1px solid #d4d4d4;
                .progress {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    background: #3f61a6;
                }
            }
            .iocn {
                margin: 0 10px 0 50px;
                width: 20px;
                height: 20px;
                background: url('./img/edit/file_delete.png') no-repeat center;
                background-size: 10px 10px;
            }
        }
    }
}
.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    .addLink {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        max-width: 844px;
        height: 416px;
        padding: 30px;
        background-color: #ffffff;
        .title {
            font-size: 20px;
            color: #191919;

            > h4 {
                font-weight: normal;
            }
        }

        .form {
            input {
                flex-grow: 1;
                width: 100%;
                margin-top: 20px;
                outline: none;
                height: 30px;
                background-color: #ffffff;
                border: solid 1px #d4d4d4;
                padding-left: 20px;
            }
            > div {
                display: flex;
                justify-content: space-between;
                p {
                    width: 120px;
                    margin-top: 20px;
                }
                .left {
                    .link,
                    .mail {
                        padding-left: 30px;
                        background-image: url('./img/edit/link_choose.png');
                        background-repeat: no-repeat;
                        background-position: 0 center;
                        background-size: 18px 18px;
                    }
                    .active {
                        background-image: url('./img/edit/link_choose_pressed.png');
                    }
                }
                .right {
                    width: 100%;
                    margin-left: 50px;
                    > div {
                        margin-top: 20px;
                    }
                    .test {
                        margin-top: 10px;
                    }
                }
            }
            .txt {
                align-items: center;
            }
        }
        .btn {
            position: absolute;
            bottom: 60px;
            right: 30px;
            display: flex;
            justify-content: flex-end;
            font-size: 14px;
            color: #191919;
            > span {
                width: 105px;
                height: 35px;
                text-align: center;
                line-height: 35px;
            }
            > .done {
                background-color: #3f61a6;
                border-radius: 4px;
                color: #ffffff;
            }
        }
    }
    .repost {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 244px;
        box-sizing: border-box;

        background-color: #ffffff;
        > .title {
            height: 50px;
            background: #ccc;
            font-size: 20px;
            padding: 14px 0 0 30px;
            box-sizing: border-box;
        }
        .form {
            display: flex;
            padding-left: 30px;
            margin-top: 60px;
            > input {
                margin: 0 24px;
                height: 50px;
                width: 234px;
                outline: none;
                font-size: 20px;
                text-align: center;
            }
            > p {
                margin-top: 10px;
            }
        }
        .btn {
            position: absolute;
            right: 14px;
            bottom: 14px;
            display: flex;
            > span {
                height: 40px;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                width: 74px;
                color: #3f61a6;
                border: 1px solid #3f61a6;
            }
            .done {
                color: #fff;
                background: #3f61a6;
                margin-left: 30px;
            }
        }
    }
}
</style>
  