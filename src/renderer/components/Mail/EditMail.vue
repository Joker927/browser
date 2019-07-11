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
                      v-tip="item.lang"
                      :class="{'active':selectNum=== index,[item.class]:true,'locked':forwardMaxno>0,'ed':emojiShow}"
                      @click="__cleckTools(item.class,index)"></span>
                <span class="send cp"
                      @click="__send"> {{$t('email.send')}} </span>
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
                <span> {{$t('email.keynote')}} </span> <input v-model="emailTitle"
                       type="text">
            </div>
            <div class="name">
                <span class="n">{{$t('email.to')}} </span>
                <!-- <input v-model="acceptUserId"
                       type="text"> -->
                <ul class="list"
                    @keyup.enter='__searchUser'>
                    <li v-for="(item,index) in displayList"
                        :key="index">

                        <p>{{item.displayName||item.nickname}} </p><span class="x cp"
                              @click="__del(index)">x</span>
                    </li>
                    <li v-if="selectedList.length>3">
                        <p> {{$t('email.other')}}{{selectedList.length-3}}{{$t('email.people')}} </p>
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
                    <ul class="list"
                        @keyup.enter='__searchUser'>

                        <li class=""
                            v-for="(item,index) in selectedList"
                            :key="index">
                            <p>
                                {{item.displayName||item.nickname}}
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
                            <li class="title">{{$t('email.text')}}</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in searchlist"
                                :key="index">
                                <p> &lt;{{item.nickname}}&gt;</p>
                            </li>
                        </ul>
                        <ul class="options"
                            v-else>
                            <li class="title">{{$t('email.lately')}}</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in recentuserlist"
                                :key="index">
                                <p> &lt;{{item.nickname}}&gt;</p>
                            </li>
                            <li class="title">{{$t('email.contact')}}</li>
                            <li class="cp"
                                @click="__select(item)"
                                v-for="(item,index) in friendlist"
                                :key="index+'i'">
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
                            <div class="item"
                                 v-if="item.flag">
                                <div class="info">
                                    <span>{{item.name}}</span>({{item.size}}KB)
                                </div>
                                <div class="progressWrap">
                                    <div :style="{width:item.width}"
                                         class="progress"></div>
                                </div>
                                <div @click="__delAttachment(item)"
                                     class="iocn cancel cp"></div>
                            </div>
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
                    <h4>{{$t('email.modifyLink')}}</h4>
                    <span class="close"></span>
                </div>
                <div class="form">
                    <div class="txt">
                        <p>{{$t('email.text')}}:</p> <input v-model="href.text"
                               type="text">
                    </div>
                    <div>
                        <div class="left">
                            <p>{{$t('email.link')}}:</p>
                            <p @click="__checkTab(0)"
                               class="cp link"
                               :class="{active:activeTab ===0}">{{$t('email.url')}}</p>
                            <p @click="__checkTab(1)"
                               class="cp mail"
                               :class="{active:activeTab ===1}">{{$t('email.address')}}</p>
                        </div>
                        <div class="right">
                            <div v-if="activeTab===0">{{$t('email.text1')}}</div>
                            <div v-else>{{$t('email.text2')}}</div>
                            <input type="text"
                                   v-model="href.url">

                            <div class="test"
                                 v-if="activeTab===0">
                                {{$t('email.text3')}}
                                <!-- <a :href="href"
                   target="_blank"></a> -->
                            </div>
                            <div v-if="activeTab===0">
                                {{$t('email.text4')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <span class="cp"
                          @click="__switch">{{$t('cancel')}}</span>
                    <span class="done cp"
                          @click="__done">{{$t('confirm')}}</span>
                </div>
            </div>
        </div>
        <div class="mask1"
             v-if="dialogState"
             @click.self="__dialogOut">
            <div class="details">
                <p class="title">内容已被修改,是否将此内容存为草稿?</p>
                <div class="btn">
                    <span class="cp"
                          @click="__dialogConfirm">是</span>
                    <span class="cp"
                          @click="__dialogCancel">否</span>
                    <span class="cp"
                          @click="__dialogOut">{{$t('cancel')}}</span>
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
        <span class="sendBtn cp"
              @click="__send">{{$t('email.send')}}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import E from 'wangeditor'
import Scroll from '@/commom/Scroll'
import EmojiPanel from '@/components/Emoji'

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
            toolBar: false,
            selectNum: null,
            emailTitle: '',
            acceptUserId: null,
            attachment: [],
            attachmentTempIds: [],
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
            emojiShow: false,
            emailContent: this.$t('email.text5'),
            dialogState: false
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
        menu() {
            return [
                { class: 'tools', lang: this.$t('email.edit') },
                { class: 'upload', lang: this.$t('email.attachment') },
                { class: 'link', lang: this.$t('email.link') },
                { class: 'emoji', lang: this.$t('email.emoji') },
                { class: 'lock', lang: this.$t('email.isRepost') }
                // { class: 'trash', lang: this.$t('email.delete') }
            ]
        },

        title() {
            let str = ''
            switch (this.titleStatus) {
                case '0':
                    str = this.$t('email.title')

                    break
                case '1':
                    str = this.$t('email.title1')
                    break
                case '2':
                    str = this.$t('email.title2')
                    break
                case '3':
                    str = this.$t('email.title3')
                    break
            }
            return str
        },

        attachmentIds() {
            let arr = this.attachment.filter(item => item.flag)
            return arr.map(item => item.id)
        }
    },
    methods: {
        async __searchUser() {
            let res = {}
            if (this.searchValue.length == 81) {
                res = await this.api.infoByWalletAddress({
                    collectionAddress: this.searchValue
                })
                if (res.code === 0) {
                    let item = res.data
                    item.displayName = this.searchValue
                    this.__select(item)
                    this.searchValue = ''
                } else {
                    this.$Toast(res.msg)
                }
            } else if (!/[\u4e00-\u9fa5]/gm.test(this.searchValue)) {
                res = await this.api.searchUser({
                    currentPage: 1,
                    pageSize: 1,
                    keyWord: this.searchValue,
                    userId: this.userInfo.userId
                })

                if (res.data.list.length) {
                    let item = res.data.list[0]
                    item.displayName = this.searchValue
                    this.__select(item)
                    this.searchValue = ''
                } else {
                    this.$Toast('该用户不存在')
                }
            }
        },
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
                    this.emojiShow = false

                    break
                case 'upload':
                    this.toolBar = false
                    this.$refs.UpFile.click()
                    this.emojiShow = false
                    break
                case 'link':
                    this.toolBar = false
                    this.emojiShow = false

                    this.__switch()
                    break
                case 'emoji':
                    this.toolBar = false
                    this.emojiShow = !this.emojiShow
                    break
                case 'lock':
                    this.toolBar = false
                    this.forwardMaxno = this.forwardMaxno ? 0 : 1
                    this.emojiShow = false

                    //this.__forwardSwitch()
                    break
                case 'trash':
                    this.toolBar = false
                    this.__close()
                    break
            }
        },

        __setEmoji(emoji) {
            this.emailContent += emoji
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
                this.$Toast(this.$t('email.success'))
                this.$emit('close', false)
            } else {
                this.$Toast(res.msg)
            }
        },
        __close() {
            if (this.emailContent != this.item.emailContent) {
                this.dialogState = true
            } else {
                this.$emit('close', false)
            }
        },
        __dialogCancel() {
            this.$emit('close', false)
        },
        __dialogConfirm() {
            this.__send(0)
        },
        __dialogOut() {
            this.dialogState = false
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
        __delAttachment(item) {
            item.flag = false
        },
        async __uploadAttachment() {
            let files = this.$refs.UpFile.files
            let id = this.userInfo.userId
            let reqs = []

            for (let i = 0; i < files.length; i++) {
                let formData = new FormData()
                formData.append('userId', id)
                formData.append('file', files[i])
                let o = {
                    name: files[i].name,
                    size: Math.round(files[i].size / 1024),
                    width: 0,
                    flag: true,
                    id: null
                }

                let cb = res => {
                    let width = (res.loaded / res.total) * 100 + '%'
                    this.$set(o, ['width'], width)
                }
                this.attachment.unshift(o)
                reqs.unshift(this.api.emailUpload(formData, cb))
            }
            const res = await Promise.all(reqs)
            let ids = []
            for (let i = 0; i < res.length; i++) {
                if (res[i].code == 0) {
                    ids.push(res[i].data.attachmentId)
                    // this.attachmentIds.push(res[i].data.attachmentId)
                    // this.attachment[i].id = res[i].data.attachmentId
                }
            }
            this.attachmentTempIds = ids.concat(this.attachmentTempIds)
            this.attachment.forEach((item, index) => {
                item.id = this.attachmentTempIds[index]
            })

            console.log(this.attachment, ' this.attachment')
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
        this.$bus.on('checkEmailState', this.__close)
    },
    beforeDestroy() {
        this.$bus.off('checkEmailState', this.__close)
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
.sendBtn {
    position: absolute;
    left: 30px;
    bottom: 40px;
    width: 40px;
    height: 40px;
    background: #3f61a6;
    color: #ffffff;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.6);
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
        border-radius: 10px;
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
        .item {
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
.mask1 {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    .details {
        position: absolute;
        left: 50%;
        top: 55%;
        width: 260px;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #ffffff;
        .title {
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .btn {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            line-height: 40px;
            span {
                flex-grow: 1;
            }

            > :nth-of-type(1),
            > :nth-of-type(2) {
                // background: #000;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>
  