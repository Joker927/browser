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
                       v-model="address"
                       v-on:keyup.13="__goAddress">
            </div>
            <div class="menu ">
                <div class="userInfo cp"
                     v-if="token">
                    <div class="avatar iconr">
                        <img v-if="userInfo.avatar"
                             :src="userInfo.avatar"
                             alt="">
                    </div>
                    <div class="name">{{userInfo.nickname}}</div>
                </div>
                <div class="userInfo cp"
                     v-else>
                    <div class="avatar iconr"
                         @click="__jump('/login')">
                        <img src=""
                             alt="">
                    </div>
                    <div class="name"
                         @click="__jump('/login')">{{$t('nav.notlogin')}}</div>
                </div>
                <div class="home iconr"
                     :class="{'disable':!token,'active':pageActive===0}"
                     @click="__jump('/home')"></div>
                <!-- <div class="collect iconr"
                     :class="{'disable':!token,'active':pageActive===1}"></div> -->
                <Badge @click="__changeCount(1)"
                       :value='requestsCount'>
                    <div class="friends iconr NAV_MENU"
                         :class="{'open':menuState==1,'disable':!token,'active':pageActive===2}">
                    </div>
                </Badge>

                <!-- <div class="msg iconr"></div> -->
                <!-- <div class="cloud iconr" :class="{'disable':!token}" @click="__jump('cloud')"></div> -->
                <div class="cloud iconr"
                     :class="{'disable':!token,'active':pageActive===3}"></div>
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
export default {
    data() {
        return {
            address: '',
            pageActive: null
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            token: state => state.UserInfo.token,
            menuState: state => state.Visible.menuState,
            tabIdx: state => state.Tabs.tabIdx,
            requestsCount: state => state.Timer.requestsCount,
            dynamicCount: state => state.Timer.dynamicCount
        })
    },

    components: { Requests, Question, Setting, Dynamic, Wallet, Badge },
    watch: {
        tabIdx: {
            handler(newVal) {
                if (newVal != '-1') {
                    const webview = document.getElementsByClassName('webview')[
                        newVal
                    ]
                    webview.addEventListener('dom-ready', () => {
                        let index = newVal
                        let title = webview.getTitle()
                        this.SET_TAB_TITLE({ index, title })
                    })
                }
            },
            deep: true
        },
        $route: {
            handler() {
                // console.log(this.$route, '11111')

                switch (this.$route.name) {
                    case 'feed':
                        this.pageActive = 0
                        break
                    case 'requests':
                    case 'group':
                    case 'friends':
                        this.pageActive = 2
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
        ...mapMutations(['SET_NAV_MENU_STATE', 'ADD_TABS', 'SET_TAB_TITLE']),
        ...mapActions(['SET_BADGE_COUNT']),
        __setHistory(count) {
            history.go(count)
            console.log(history)
        },
        __reload() {
            const webview = document.getElementsByClassName('webview')[
                this.tabIdx
            ]
            webview.reload()
        },
        __changeCount(n) {
            console.log(n)
            if (this.token || n == 3) {
                this.SET_NAV_MENU_STATE(n)
            }
        },
        __jump(w) {
            if (!this.token && w != '/login') return
            this.$router.push(w)
        },
        __isLogined() {
            if (!this.token) this.__jump('/login')
        },
        __goAddress() {
            var obj = {
                title: this.$t('nav.newTab'),
                url: this.address
            }
            this.ADD_TABS(obj)
            this.address = ''
        }
    },
    created() {
        this.__isLogined()
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
        margin-left: 22px;
        flex-grow: 1;
        input {
            height: 30px;
            width: 100%;
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
            background: #000;
            border-radius: 50%;
            overflow: hidden;
            > img {
                width: 100%;
                height: 100%;
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

        .collect {
            background-image: url('./img/head_collect_unpressed@3x.png');
        }
        .collect.active {
            background-image: url('./img/head_collect_unpressed@3x.png');
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
