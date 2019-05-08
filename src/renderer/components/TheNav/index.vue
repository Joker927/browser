<template>
    <div>
        <div class="nav-box">
            <div class="control">
                <div class="back icon"
                     @click="__setHistory(-1)"></div>
                <div class="forward icon"
                     @click="__setHistory(1)"></div>
                <div class="reload icon"
                     @click="__reload"></div>
            </div>
            <div class="address">
                <input type="text"
                       id="TabAddress"
                       v-model="address"
                       v-on:keyup.13="__goAddress">
                <div class="collect iconr"
                     @click="__addCollect"
                     v-if="!homeShow&&token&&urlState">
                </div>
                <div class="collect iconr active"
                     @click="__delCollect"
                     v-if="!homeShow&&token&&urlCollectionId"></div>
            </div>
            <div class="menu"
                 v-if="homeShow">
                <div class="userInfo cp"
                     v-if="token">
                    <div class="avatar iconr">

                        <Avatar :src="userInfo.avatar"></Avatar>

                    </div>
                    <div class="name">{{userInfo.nickname}}</div>
                </div>
                <div class="userInfo cp"
                     v-else>
                    <div class="avatar iconr"
                         @click="__jump('/login')">
                        <Avatar></Avatar>
                    </div>
                    <div class="name"
                         @click="__jump('/login')">{{$t('nav.notlogin')}}</div>
                </div>
                <div class="home iconr"
                     :class="{'disable':!token,'active':pageActive===0}"
                     @click="__jump('/home')"></div>
                <Badge @click="__changeCount(1)"
                       :value='requestsCount'>
                    <div class="friends iconr NAV_MENU"
                         :class="{'open':menuState==1,'disable':!token,'active':pageActive===2}">
                    </div>
                </Badge>

                <div class="email iconr"
                     @click="__emailShow"
                     :class="{'disable':!token,'active':mailState}"></div>

                <router-link tag="div"
                             :to="{name:'cloud',params:{type:0}}"
                             class="cloud iconr"
                             :class="{'disable':!token,'active': pageActive===3}">
                </router-link>
                <div class="wallet iconr NAV_MENU"
                     :class="{'open':menuState==2,'disable':!token,'active':pageActive===4}"
                     @click="__changeCount(2)"></div>

                <Badge @click="__changeCount(4)"
                       :value='dynamicCount'>
                    <div class="dynamic iconr NAV_MENU"
                         :class="{'open':menuState==4,'disable':!token,'active':pageActive===5}"></div>
                </Badge>
                <div class="more iconr NAV_MENU"
                     :class="{'open':menuState==3}"
                     @click="__changeCount(3)"></div>

            </div>
        </div>
        <div class="menuWrap">
            <Requests v-if="menuState==1"></Requests>
            <!-- 去掉question入口,添加钱包入口 -->
            <!-- <Question v-if="menuState==2"></Question> -->
            <Wallet v-if="menuState==2"></Wallet>
            <Setting v-if="menuState==3"></Setting>
            <Dynamic v-if="menuState==4"></Dynamic>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import Requests from './Requests'
import Question from './Question'
import Setting from './Setting'
import Dynamic from './Dynamic'
import Wallet from './Wallet'
import Badge from '@/commom/Badge'
import { fail } from 'assert'
export default {
    data() {
        return {
            address: '',
            pageActive: null,
            urls: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            token: state => state.UserInfo.token,
            menuState: state => state.Visible.menuState,
            tabIdx: state => state.Tabs.tabIdx,
            requestsCount: state => state.Timer.requestsCount,
            dynamicCount: state => state.Timer.dynamicCount,
            mailState: state => state.Mail.mailState,
            homeShow: state => state.Tabs.homeShow,
            tabs: state => state.Tabs.tabs
        }),
        urlState() {
            let address = this.__hasPrefix(this.address)
            return this.tabs.some((item, index) => {
                return address === item.url
            })
        },
        urlCollectionId() {
            let id = null
            let address = this.__hasPrefix(this.address)

            for (var i = 0; i < this.urls.length; i++) {
                const item = this.urls[i]
                const url = item.collectionVOList[0].link

                if (address === url) {
                    id = item.collectionId
                    break
                }
            }
            return id
        }
    },
    components: { Requests, Question, Setting, Dynamic, Wallet, Badge },
    watch: {
        tabIdx: {
            handler() {
                if (this.tabIdx !== -1) {
                    let index = this.tabIdx
                    const webview = document.getElementsByClassName('webview')[
                        index
                    ]
                    webview.addEventListener('dom-ready', () => {
                        let title = webview.getTitle()
                        this.SET_TAB_ATTR({ index, key: 'title', value: title })
                    })
                    this.address = this.tabs[this.tabIdx].url
                } else {
                    this.address = ''
                }
            }
            // deep: true
        },
        $route: {
            handler() {
                switch (this.$route.name) {
                    case 'feed':
                        this.pageActive = 0
                        break
                    case 'requests':
                    case 'group':
                    case 'friends':
                        this.pageActive = 2
                        break
                    case 'cloud':
                        this.pageActive = 3
                        break
                    case 'myWallet':
                    case 'personalWorks':
                    case 'giveSet':
                    case 'bill':
                        this.pageActive = 4
                        break
                    case 'dynamic':
                        this.pageActive = 5
                        break
                    default:
                        this.pageActive = null
                }
            },
            immediate: true
        }
    },
    mounted() {},
    methods: {
        ...mapMutations([
            'SET_NAV_MENU_STATE',
            'ADD_TABS',
            'SET_MAIL_STATE',
            'SHOW_HOME',
            'SET_TAB_ATTR',
            'SET_LOADING_STATE'
        ]),
        ...mapActions(['SET_BADGE_COUNT', 'REFRESH_HOME']),
        __setHistory(count) {
            if (this.tabIdx !== -1) {
                const webview = document.getElementsByClassName('webview')[
                    this.tabIdx
                ]
                webview.history.go(count)
            } else {
                history.go(count)
            }
        },
        __reload() {
            const webview = document.getElementsByClassName('webview')[
                this.tabIdx
            ]
            if (webview) {
                webview.reload()
            } else if (this.homeShow) {
                this.SET_LOADING_STATE(true)
                let fullPath = this.$route.fullPath
                this.$router.replace(
                    {
                        name: 'forceRefresh'
                    },
                    () => {
                        setTimeout(() => {
                            this.SET_LOADING_STATE(false)
                            this.$router.replace({
                                path: fullPath
                            })
                        }, 100)
                    }
                )
            }
        },
        __changeCount(n) {
            if (this.token || n == 3) {
                this.SET_NAV_MENU_STATE(n)
            }
        },
        __emailShow() {
            this.SET_MAIL_STATE()
        },
        __jump(w) {
            if (this.mailState) {
                this.SET_MAIL_STATE()
            }
            if (!this.token && w != '/login') return

            //首页按钮点击刷新动态
            if (w == '/home') {
                this.$bus.emit('refreshfeed')
            }
            this.$router.push(w)
        },
        __isLogined() {
            if (!this.token) this.__jump('/login')
        },

        //是否输入了http头
        __hasPrefix(str) {
            if (!str.includes('https://') && !str.includes('http://')) {
                str = 'http://' + str
            }
            return str
        },
        __goAddress() {
            let address = this.__hasPrefix(this.address)

            if (this.tabIdx !== -1) {
                console.log(this.tabIdx, 'address')
                let o = {
                    index: this.tabIdx,
                    key: 'url',
                    value: address
                }
                this.SET_TAB_ATTR(o)
            } else {
                var obj = {
                    isShow: true,
                    title: this.$t('nav.newTab'),
                    url: address
                }
                this.ADD_TABS(obj)
            }
        },
        async __addCollect() {
            let address = this.__hasPrefix(this.address)
            let req = {
                collectionVOList: [
                    {
                        link: address
                    }
                ],
                userId: this.userInfo.userId,
                type: 1
            }

            const res = await this.api.snsCollectSave(req)
            if (res.code === 0) {
                this.__getCollecUrl()
            }
        },
        async __delCollect() {
            let id = this.urlCollectionId

            const res = await this.api.snsCollectionDelete({
                ids: [id]
            })
            if (res.code === 0) {
                this.__getCollecUrl()
            }
        },
        async __getCollecUrl(currentPage = 1, pageSize = 1000) {
            let req = {
                currentPage,
                pageSize,
                type: 1,
                userId: this.userInfo.userId
            }

            const res = await this.api.snsCollectionList(req)
            if (res.code === 0) {
                this.urls = res.data.list
            }
        }
    },
    created() {
        this.__isLogined()
        this.__getCollecUrl()
        this.SET_BADGE_COUNT()
    }
}
</script>

<style lang="scss" scoped>
.nav-box {
    position: relative;
    z-index: 9999;
    height: 46px;
    border-bottom: 1px solid #dbdcdc;
    background: #fff;
    padding-top: 1px;
    padding-right: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .control {
        display: flex;
        flex-wrap: nowrap;
        .icon {
            width: 20px;
            height: 20px;
            margin-left: 22px;
            background-size: 100% 100%;
        }
        // .icon:hover {
        //     border-radius: 50%;
        //     background-color: rgba($color: #272727, $alpha: 0.1);
        // }
        .back {
            background-image: url('./img/head_go@3x.png');
        }
        .canBack {
            background-image: url('./img/head_back_gray@3x.png');
        }
        .forward {
            background-image: url('./img/head_back@3x.png');
        }
        .canForward {
            background-image: url('./img/head_back_gray@3x.png');
        }
        .reload {
            background-image: url('./img/head_refresh@3x.png');
        }
        .back:hover {
            background-image: url('./img/head_go_slide_pressed@3x.png');
        }
        .forward:hover {
            background-image: url('./img/head_back_slide_pressed@3x.png');
        }
        .reload:hover {
            background-image: url('./img/head_refresh_slide_pressed@3x.png');
        }
    }

    .address {
        position: relative;
        margin-left: 22px;
        flex-grow: 1;
        input {
            height: 30px;
            width: 100%;
            font-size: 14px;
            padding: 0 10px;
        }
        .iconr {
            position: absolute;
            right: 4px;
            top: 2px;
            width: 26px;
            height: 26px;
            margin-left: 22px;
            background-size: 100% 100%;
            cursor: pointer;
        }
        .collect {
            background-image: url('./img/head_collect_unpressed@3x.png');
        }
        .collect.active {
            background-image: url('./img/head_collect_slide@3x.png');
        }
    }
    .menu {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        .iconr {
            width: 26px;
            height: 26px;
            margin-left: 22px;
            background-size: 100% 100%;
            cursor: pointer;
        }
        .iconr:hover {
            border-radius: 50%;
            background-color: rgba($color: #353535, $alpha: 0.1);
        }
        .userInfo {
            display: flex;
            align-items: center;
        }
        .avatar {
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eff0f0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .name {
            margin-left: 12px;
        }
        .home {
            background-image: url('./img/home_unpressed@3x.png');
        }
        .home.active {
            background-image: url('./img/home_pressed@3x.png');
        }
        .friends {
            background-image: url('./img/head_friend_unpressed@3x.png');
        }
        .friends.active {
            background-image: url('./img/head_friend_pressed@3x.png');
        }
        .cloud {
            background-image: url('./img/head_cloud_unpressed@3x.png');
        }
        .cloud.active {
            background-image: url('./img/head_cloud_pressed@3x.png');
        }
        .email {
            background-image: url('./img/head_email@3x.png');
        }
        .email.active {
            background-image: url('./img/head_email_pressed@3x.png');
        }
        .wallet {
            background-image: url('./img/head_money_unpressed@3x.png');
        }
        .wallet.active {
            background-image: url('./img/head_money_pressed@3x.png');
        }
        .more {
            background-image: url('./img/head_more@3x.png');
        }
        .dynamic {
            background-image: url('./img/dynamicNews@3x.png');
        }
        .dynamic.active {
            background-image: url('./img/dynamicNews@3xa.png');
        }
        .open {
            position: relative;
        }

        .open::before {
            content: '';
            position: absolute;
            bottom: -14px;
            left: 0px;
            width: 21px;
            height: 13px;
            background: url('./img/arrow.png');
        }
        .disable {
            opacity: 0.4;
        }
    }
}
.menuWrap {
    position: absolute;
    right: 5px;
    z-index: 1000;
}
</style>
