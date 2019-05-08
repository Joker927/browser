<template>
    <div class="mailWrap"
         v-show="mailState">
        <Menu @selected='__menuSelected'
              @edit='__edit(true)'></Menu>
        <div class="mailContent">
            <div>
                <TopBar @refresh='__refresh'
                        @turnPage='__turnPage'
                        @selectAll="__selectAll"
                        :selectedArr='selectedMails'
                        :name='name'
                        :data='subInfo'></TopBar>
                <div class="scrollWrap">
                    <Scroll>
                        <Mails :data='mails'
                               @show='__getEmailDetails'
                               @refresh='__refresh'
                               @selected='__mailSelected'></Mails>
                    </Scroll>
                </div>
            </div>
            <EditMail @close='__edit'
                      :item='editItem'
                      :flag='editFlag'
                      v-if="editPanel"></EditMail>
            <div class="mailDetails"
                 v-if="visible">

                <Details @close='__change'
                         @show='__editMail'
                         :item='emailItem'></Details>
            </div>
            <SideButtom class="abs"></SideButtom>
        </div>

        <Modal v-if="mailListState"
               :name='name'></Modal>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Scroll from '@/commom/Scroll'
import SideButtom from '@/components/SideButtom'
import Modal from './Modal'
import EditMail from './EditMail'
import Menu from './Menu'
import TopBar from './TopBar'
import Mails from './Mails'
import Details from './Details'
export default {
    data() {
        return {
            req: {},
            mails: [],
            name: '',
            visible: false,
            editFlag: false,
            emailItem: {},
            editItem: {}, //编辑邮件
            isAll: false, //是否获取全部
            currPage: 1,
            subInfo: {}
        }
    },
    computed: {
        ...mapState({
            mailListState: state => state.Mail.mailListState,
            mailState: state => state.Mail.mailState,
            editPanel: state => state.Mail.editPanel,
            userInfo: state => state.UserInfo.userInfo
        }),
        selectedMails() {
            return this.mails.filter(item => item.check)
        }
    },
    components: {
        SideButtom,
        Menu,
        TopBar,
        Mails,
        Scroll,
        Modal,
        Details,
        EditMail
    },

    methods: {
        ...mapMutations(['SET_MAIL_PANEL_STATE']),
        async __getDatas() {
            // currPage当前页数
            // emailContentSearch邮件正文模糊搜索
            // emailStatus	邮件状态0：草稿 1：已发送 2：移走 3：删除
            // emailTitle	邮件主旨
            // isCollected	是否收藏 true 已收藏
            // pageSize	每页记录数
            // sendUserId	发件人id
            // sendUserName	发件人姓名
            // totalCount	总记录数
            // totalPage	总页数
            // userId	用户id

            this.req.userId = this.userInfo.userId
            this.req.pageSize = 50
            this.req.currPage = this.currPage
            const res = await this.api.emailList(this.req)
            if (!res.code && res.data.list) {
                this.subInfo = {
                    currPage: res.data.currPage,
                    totalCount: res.data.totalCount,
                    totalPage: res.data.totalPage
                }
                this.mails = res.data.list
                this.mails.forEach(item => {
                    item.emailContentStr = item.emailContent.replace(
                        /<[^>]+>/g,
                        ''
                    )
                })
                if (this.isAll) {
                    let localMails = this.__getLoaclMails()
                    localMails.forEach(el => {
                        this.mails.forEach(item => {
                            if (el.id == item.id) {
                                this.$set(item, 'isLocal', true)
                            }
                        })
                    })
                }
            }
        },
        __menuSelected(name) {
            this.visible = false
            this.name = name
            switch (name) {
                case 'all':
                    this.req = {
                        currPage: 1
                    }
                    this.isAll = true
                    break
                case 'collection':
                    this.req = {
                        isCollected: 1,
                        currPage: 1
                    }
                    break
                case 'backup':
                    this.req = {
                        sendOrAccept: 1,
                        emailStatus: 1,
                        currPage: 1
                    }
                    break
                case 'draft':
                    this.req = {
                        sendOrAccept: 1,
                        emailStatus: 0,
                        currPage: 1
                    }
                    break
                case 'white':
                    this.mails = []
                    this.req = {
                        emailStatus: 7,
                        currPage: 1
                    }
                    break
                case 'black':
                    this.mails = []
                    this.req = {
                        emailStatus: 8,
                        currPage: 1
                    }
                    break
                case 'cloud':
                    this.req = {
                        isClouds: 1,
                        currPage: 1
                    }
                    break
                case 'local':
                    this.mails = this.__getLoaclMails()
                    break
                case 'trash':
                    this.req = {
                        emailStatus: 3,
                        currPage: 1
                    }
                    break
                default:
                    break
            }
        },
        __mailSelected() {},
        __change(state) {
            this.visible = state
            if (!state) {
                this.__refresh()
            }
        },
        __selectAll(state) {
            this.mails.forEach((item, index) => {
                // item.check = true
                this.$set(item, 'check', state)
            })
        },
        __getLoaclMails() {
            let userMail = localStorage.getItem('USERMAIL')
            let userId = this.userInfo.userId
            if (typeof userMail === 'string') {
                userMail = JSON.parse(userMail)
                if (userId in userMail) {
                    if (!this.isAll) {
                        this.subInfo = {
                            currPage: 1,
                            totalCount: userMail[userId].length,
                            totalPage: userMail[userId].length
                        }
                    }

                    return userMail[userId]
                }
            }

            return []
        },
        async __getEmailDetails(state, item) {
            if (item.id) {
                let data = {
                    id: item.id,
                    sendOrAccept: item.sendOrAccept
                }
                const res = await this.api.emailDetails(data)
                this.emailItem = res.data
                this.__change(state)
                console.log(res, 'details')
            }
        },
        __turnPage(state) {
            if (state === 'prev') {
                this.currPage--
                this.currPage = this.currPage <= 0 ? 1 : this.currPage
            } else if (state == 'next') {
                this.currPage++
            }
            this.__getDatas()
        },
        __refresh() {
            if (this.name === 'local') {
                this.__getLoaclMails()
            } else {
                this.__getDatas()
                this.$bus.emit('refreshUnRead')
            }
        },
        __edit(state) {
            this.editFlag = false
            this.SET_MAIL_PANEL_STATE({ name: 'editPanel', state: state })
        },
        __editMail(item) {
            this.SET_MAIL_PANEL_STATE({ name: 'editPanel', state: true })

            this.editFlag = true

            this.editItem = item
        }
    },
    watch: {
        req: {
            handler() {
                this.__getDatas()
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style  lang='scss' scoped>
@media screen and (min-width: 1390px) {
    .mailWrap {
        margin: 0 auto;
    }
}
.mailWrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;

    display: flex;
    // margin: 0 auto;
    z-index: 10;
    max-width: 1156px;
    box-sizing: content-box;
    padding-right: 210px;
    // opacity: 0.3;
}
.mailContent {
    position: absolute;
    top: 0;
    // bottom: 30px; TODO: 不清楚为啥设置30
    bottom: 0px;
    left: 210px;
    max-width: calc(1166px - 210px);
    width: calc(100% - 210px);
    background: #ffffff;
}
.scrollWrap {
    position: absolute;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #ffffff;
}
.mailDetails {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #ffffff;
}
.editMail {
    z-index: 1;
}
</style>
