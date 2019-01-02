<template>
  <div>
    <div class="nav-box">
      <div class="control">
        <div class="back icon" @click="__setHistory(-1)"></div>
        <div class="forward icon" @click="__setHistory(1)"></div>
        <div class="reload icon" @click="__reload"></div>
      </div>
      <div class="address">
        <input type="text" v-model="address" v-on:keyup.13="__goAddress">
      </div>
      <div class="menu ">
        <div class="userInfo cp" v-if="token">
          <div class="avatar iconr">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
          </div>
          <div class="name">{{userInfo.nickname}}</div>
        </div>
        <div class="userInfo cp" v-else>
          <div class="avatar iconr" @click="__jump('/login')">
            <img src="" alt="">
          </div>
          <div class="name" @click="__jump('/login')">未登入</div>
        </div>
        <div class="home iconr" :class="{'disable':!token}" @click="__jump('/home')"></div>
        <div class="collect iconr" :class="{'disable':!token}"></div>
        <div class="friends iconr  NAV_MENU" :class="{'active':menuState==1,'disable':!token}" @click="__changeCount(1)"></div>
        <!-- <div class="msg iconr"></div> -->
        <div class="cloud iconr" :class="{'disable':!token}" @click="__jump('cloud')"></div>
        <div class="question iconr NAV_MENU" :class="{'active':menuState==2,'disable':!token}" @click="__changeCount(2)"></div>
        <div class="more iconr NAV_MENU" :class="{'active':menuState==3}" @click="__changeCount(3)"></div>
      </div>
    </div>
    <div class="menuWrap">
      <Requests v-if="menuState==1"></Requests>
      <Question v-if="menuState==2"></Question>
      <Setting v-if="menuState==3"></Setting>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Requests from "./Requests";
import Question from "./Question";
import Setting from "./Setting";

export default {
    data() {
        return {
            address: ""
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            token: state => state.UserInfo.token,
            menuState: state => state.Visible.menuState,
            tabIdx: state => state.Tabs.tabIdx
        })
    },
    components: { Requests, Question, Setting },
    watch: {
        tabIdx: {
            handler(newVal) {
                if (newVal != "-1") {
                    const webview = document.getElementsByClassName("webview")[
                        newVal
                    ];
                    webview.addEventListener("dom-ready", () => {
                        let index = newVal;
                        let title = webview.getTitle();
                        this.SET_TAB_TITLE({ index, title });
                    });
                }
            },
            deep: true
        }
    },
    mounted() {},
    methods: {
        ...mapMutations(["SET_MENU_STATE", "ADD_TABS", "SET_TAB_TITLE"]),
        __setHistory(count) {
            history.go(count);
            console.log(history);
        },
        __reload() {
            const webview = document.getElementsByClassName("webview")[
                this.tabIdx
            ];
            webview.reload();
        },
        __changeCount(n) {
            if (this.token || n == 3) {
                this.SET_MENU_STATE(n);
            }
        },
        __jump(w) {
            if (!this.token && w != "/login") return;
            this.$router.push(w);
        },
        __isLogined() {
            if (!this.token) this.__jump("/login");
        },
        __goAddress() {
            var obj = {
                title: "新标签页",
                url: this.address
            };
            this.ADD_TABS(obj);
            this.address = "";
        }
    },
    created() {
        this.__isLogined();
    }
};
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
        .back {
            background-image: url(./img/head_go@3x.png);
        }
        .canBack {
            background-image: url(./img/head_back_gray@3x.png);
        }
        .forward {
            background-image: url(./img/head_back@3x.png);
        }
        .canForward {
            background-image: url(./img/head_back_gray@3x.png);
        }
        .reload {
            background-image: url(./img/head_refresh@3x.png);
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
            width: 20px;
            height: 20px;
            margin-left: 22px;
            background-size: 100% 100%;
            cursor: pointer;
        }
        .userInfo {
            display: flex;
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
        .home {
            background-image: url(./img/home_myApplication@3x.png);
        }
        .name {
            margin-left: 12px;
        }
        .collect {
            background-image: url(./img/head_collect_unpressed@3x.png);
        }
        .friends {
            background-image: url(./img/head_friend@3x.png);
        }
        .msg {
            background-image: url(./img/head_email@3x.png);
        }
        .cloud {
            background-image: url(./img/head_mai@3x.png);
        }
        .question {
            background-image: url(./img/head_question@3x.png);
        }
        .more {
            background-image: url(./img/head_more@3x.png);
        }
        .active {
            position: relative;
        }
        .active::before {
            content: "";
            position: absolute;
            bottom: -14px;
            left: 0px;
            width: 21px;
            height: 13px;
            background: url("./img/arrow.png");
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
