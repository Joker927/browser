<template>
    <div class="contain">
        <div class="WebIM" v-for="(item,index) in webIMList" :key="index" :style="{width:item.width}">
            <div class="name cp" v-if="!item.isShow" @click="__changeShow(index)">{{item.userName}}</div>
            <div class="winMin" v-if="item.isShow">
                <header class="header">
                    <p>{{item.userName}}</p>
                    <div class="icons">
                        <!-- <span class="icon"></span> -->
                        <!-- <span class="icon"></span> -->
                        <!-- <span class="icon"></span> -->
                        <!-- <span class="icon" @click="__headerSetShow(index)"></span> -->
                        <span class="icon" @click="__changeSize(index)"></span>
                        <span class="icon" @click="__changeShow(index)"></span>
                    </div>
                    <!-- <div class="header-set" v-if="index==headerSetIdx">
                        <div @click="changeNameShow=true"><img src="./img/chat_setting_change name@2x.png" />更改名称</div>
                        <div><img src="./img/chat_setting_no placed the top@2x.png" />不置顶/置顶</div>
                        <div><img src="./img/chat_setting_no remind@2x.png" />开启/关闭提醒</div>
                        <div><img src="./img/chat_setting_lift blockkade@2x.png" />解除封锁/封锁</div>
                        <div><img src="./img/chat_setting_delete@2x.png" />删除聊天记录</div>
                    </div> -->
                </header>
                <div class="conWrap" :style="{height:item.height}">
                    <ul class="feed imFrame" id="feed">
                        <li class="a" :class="{'b':items.type==0}" v-for="(items,index) in item.msgList" :key="index">
                            <img class='headerImg' :src="item.avatar" v-if="items.type==1">
                            <img class='headerImg' :src="userInfo.avatar" v-if="items.type==0">
                            <div class="msg" v-if="items.messageType==1">{{items.msg}}</div>
                            <div v-if="items.messageType==2">
                                <img :src="items.msg" style="width: 100px;height: auto;" />
                            </div>
                            <div v-if="items.messageType==3" class="voice">
                                <img src="./img/yuyin.png" class="voiceImg" @click="__playVoice" />
                                <audio :src="items.msg"></audio>
                            </div>
                            <!-- <div v-if="items.messageType==5" class="gathering" @click="__gathering">
                                <div class="clearfix">
                                    <div class="fl"></div>
                                    <div class="fr">{{item.msg}}</div>
                                </div>
                            </div> -->
                            <div v-if="items.messageType!=1&&items.messageType==2&&items.messageType!=3" class="msg">
                                {{$t('webim.msg')}}
                            </div>
                        </li>
                    </ul>
                    <Transfer v-if="transferIdx==index" :user-idx="index" :user-id="item.userId" :user-name="item.userName" :user-img="item.avatar"
                        v-on:changeStatus="__exitTransfer"></Transfer>
                    <Red v-if="redIdx==index" :user-idx="index" :user-id="item.userId" :user-name="item.userName"
                        v-on:changeStatus="__exitRed"></Red>
                </div>
                <div class="input">
                    <input type="text" class="inputItem" :placeholder="$t('webim.placeholder')" @keyup.enter="__submitMsg(index,item)"
                        @blur="__blurInput(index)">
                    <div>
                        <EmojiPanel class="emojiPanel" @setEmoji='__setEmoji' v-if="index==emojiSetIdx"></EmojiPanel>
                        <span class="icon" @click='__emojiSetShow(index)'></span>
                        <span class="icon">
                            <input type="file" @change="__chooseImg(index,item.type)" class="fileClass" id="fileId">
                        </span>
                        <!-- <span class="icon"></span> -->
                        <span class="icon" @click="__transferShow(index)"></span>
                        <span class="icon" @click="__redShow(index)"></span>
                    </div>
                </div>
            </div>
        </div>
        <ChangeName v-if="changeNameShow" v-on:changeStatus="__changeNameHide"></ChangeName>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import createSeed from "gitium.seed.js";
import ChangeName from "./ChangeName";
import Transfer from "./Transfer";
import Red from "./Red";
import EmojiPanel from "./EmojiPanel";
export default {
    props: ["webIMList"],
    data() {
        return {
            inputVal: "",
            inputIdx: 99,
            emojiSetShow: false,
            emojiSetIdx: 99,

            headerSetShow: false,
            headerSetIdx: 99,
            changeNameShow: false,
            transferShow: false,
            transferIdx: 99,
            redShow: false,
            redIdx: 99
        };
    },
    components: { ChangeName, Transfer, Red, EmojiPanel },
    watch: {
        webIMList: {
            handler(newVal, oldVal) {
                newVal.forEach(val => {
                    console.log(val);
                });
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    mounted() {
        const _this = this;
        //使用延时器模拟定时器每10秒获取一次消息
        let getMsg = function() {
            setTimeout(function() {
                _this.__getMsg();
                getMsg();
            }, 10000);
        };
        getMsg();
    },
    methods: {
        ...mapMutations([
            "SET_WEBIM_SHOW",
            "SET_WEBIM_SIZE",
            "SET_WEBIM_List",
            "SET_MSG_List"
        ]),
        __changeShow(index) {
            this.SET_WEBIM_SHOW(index);
        },
        __changeSize(index) {
            this.SET_WEBIM_SIZE(index);
        },
        //设置菜单显示、隐藏
        __headerSetShow(index) {
            if (this.headerSetIdx < 5) {
                this.headerSetIdx = 99;
                return;
            }
            this.headerSetIdx = index;
        },
        __emojiSetShow(index) {
            if (this.emojiSetIdx < 5) {
                this.emojiSetIdx = 99;
                return;
            }
            this.inputIdx = index;
            this.emojiSetIdx = index;
        },
        //更改名称显示隐藏
        __changeNameHide(val) {
            this.changeNameShow = val;
        },
        //转账功能显示隐藏
        __transferShow(index) {
            this.transferIdx = index;
        },
        //红包功能显示隐藏
        __redShow(index) {
            this.redIdx = index;
        },
        __exitTransfer(val) {
            this.transferIdx = 99;
        },
        __exitRed(val) {
            this.redIdx = 99;
        },
        __setEmoji(emoji) {
            this.emojiSetIdx = 99;
            this.inputVal += emoji;
            document.querySelectorAll(".inputItem")[
                this.inputIdx
            ].value = this.inputVal;
            document.querySelectorAll(".inputItem")[this.inputIdx].focus();
        },
        __blurInput(index) {
            this.inputIdx = index;
            this.inputVal = event.target.value;
        },
        //发送文字消息
        async __submitMsg(index, item) {
            var msg = {
                type: 0,
                messageType: 1,
                msg: event.target.value
            };
            this.SET_MSG_List({
                index,
                msg
            });

            let para = {
                body: event.target.value,
                fromUserId: this.userInfo.userId,
                messageType: 1,
                time: 0,
                toUserId: item.userId,
                type: "chat"
            };
            event.target.value = "";
            if (item.type == "personal") {
                const res = await this.api.sendMessage(para);
            } else {
                const res = await this.api.sendGroupMessage(para);
            }
            this.emojiSetIdx = 99;

            this.$nextTick(function() {
                this.webIMList.forEach((val, index) => {
                    if (
                        document.querySelectorAll(".imFrame")[index]
                            .clientHeight
                    ) {
                        document.querySelectorAll(".conWrap")[
                            index
                        ].scrollTop = document.querySelectorAll(".imFrame")[
                            index
                        ].clientHeight;
                    }
                });
            });
        },
        //获取消息
        async __getMsg() {
            const res = await this.api.getMessage(this.userInfo.userId);
            const groupRes = await this.api.getGroupMessage(
                this.userInfo.userId
            );
            let arr = [res, groupRes];
            arr.forEach(resArrVal => {
                if (
                    resArrVal.data.message &&
                    resArrVal.data.message instanceof Array &&
                    resArrVal.data.message.length > 0
                ) {
                    resArrVal.data.message.forEach(val => {
                        var flag = this.webIMList.some((subVal, index) => {
                            if (subVal.userId == val.fromUserId) {
                                var msg = {
                                    type: 1,
                                    messageType: val.messageType,
                                    msg: val.body
                                };
                                this.SET_MSG_List({
                                    index,
                                    msg
                                });
                            }
                            return subVal.userId == val.fromUserId;
                        });

                        if (!flag) {
                            let obj = {
                                userId: val.fromUserId,
                                userName: val.fromNickName,
                                avatar: val.fromUserAvatar,
                                type: "personal",
                                isShow: false,
                                width: "194px",
                                height: "168px",
                                msgList: [
                                    {
                                        type: "1",
                                        messageType: val.messageType,
                                        msg: val.body
                                    }
                                ]
                            };
                            this.SET_WEBIM_List(obj);
                        }
                    });
                }
            });

            this.$nextTick(function() {
                this.webIMList.forEach((val, index) => {
                    if (
                        document.querySelectorAll(".imFrame")[index]
                            .clientHeight
                    ) {
                        document.querySelectorAll(".conWrap")[
                            index
                        ].scrollTop = document.querySelectorAll(".imFrame")[
                            index
                        ].clientHeight;
                    }
                });
            });
        },
        //发送图片消息
        async __chooseImg(index, type) {
            let arr = document.getElementsByClassName("fileClass");
            const _this = this;
            let str = "";
            let f = document.getElementById("fileId").files;
            for (var i = 0; i < f.length; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(f[i]);
                reader.onload = function(e) {
                    var msg = {
                        type: 0,
                        messageType: 2,
                        msg: e.target.result
                    };
                    _this.SET_MSG_List({
                        index,
                        msg
                    });
                };
            }

            let formData = new FormData();
            formData.append("file", arr[index].files[0]);
            formData.append("fromUserId", this.userInfo.userId);
            formData.append("messageType", 2);
            formData.append("toUserId", 106);
            formData.append("type", "chat");
            if (type == "personal") {
                const res = await this.api.sendImgMessage(formData);
            } else {
                const res = await this.api.sendGroupImgMessage(formData);
            }

            this.$nextTick(function() {
                this.webIMList.forEach((val, index) => {
                    if (
                        document.querySelectorAll(".imFrame")[index]
                            .clientHeight
                    ) {
                        document.querySelectorAll(".conWrap")[
                            index
                        ].scrollTop = document.querySelectorAll(".imFrame")[
                            index
                        ].clientHeight;
                    }
                });
            });
        },
        //获取币种列表
        async __getCurrencyList() {
            const res = await this.api.getCuurrercyList();
            console.log(res);
        },
        __playVoice() {
            let audio = event.currentTarget.nextElementSibling;
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        },
        //点击转账
        __gathering() {}
    },
    watch: {},
    created() {}
};
</script>

<style scoped lang='scss'>
.contain {
    position: fixed;
    bottom: 0;
    right: 20%;
    display: flex;
    z-index: 2;
}

.WebIM {
    position: relative;
    min-height: 20px;
    margin-right: 10px;
    .icon {
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
    }
    .name {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 194px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        border: 1px solid #888;
        border-bottom: none;
        padding-left: 10px;
        background: #ffffff;
    }
    .winMin {
        background: #eeeeef;
        border: 1px solid #888;
        border-bottom: none;
        position: absolute;
        bottom: 0;
        width: 100%;
        .header {
            height: 20px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            background: #eeeeef;
            position: relative;
            > p {
                font-size: 12px;
                padding-left: 6px;
            }
        }
        .icons {
            display: flex;
            > span {
                cursor: pointer;
            }
            // > span:nth-of-type(1) {
            //     background-image: url("./img/icon_10@2x.png");
            // }
            // > span:nth-of-type(2) {
            //     background-image: url("./img/icon_11@2x.png");
            // }
            // > span:nth-of-type(3) {
            //     background-image: url("./img/icon_12@2x.png");
            // }
            // > span:nth-of-type(4) {
            //     background-image: url("./img/icon_13@2x.png");
            // }
            // > span:nth-of-type(5) {
            //     background-image: url("./img/icon_14@2x.png");
            // }
            // > span:nth-of-type(6) {
            //     background-image: url("./img/icon_15@2x.png");
            // }
            > span:nth-of-type(1) {
                background-image: url("./img/icon_14@2x.png");
            }
            > span:nth-of-type(2) {
                background-image: url("./img/icon_15@2x.png");
            }
        }
        .conWrap {
            width: 100%;
            overflow: auto;
            background: #fff;
            .feed {
                padding-bottom: 10px;
                > li {
                    display: flex;
                    margin-top: 10px;
                    .img {
                    }
                    .msg {
                        padding: 4px 8px;
                        border-radius: 2px;
                    }
                }
                .a {
                    display: flex;
                    .msg {
                        background: #dbdcdc;
                    }
                }
                .b {
                    display: flex;
                    flex-direction: row-reverse;
                    .msg {
                        background: #3f61a6;
                        color: #fff;
                    }
                }
                .headerImg {
                    width: 20px;
                    height: 20px;
                    margin: 4px;
                    border-radius: 50%;
                }
            }
        }
        .input {
            > input {
                font-size: 12px;
                width: 100%;
                height: 20px;
                padding-left: 10px;
                border: none;
            }
            > div {
                padding-bottom: 2px;
                display: flex;
                background: #fff;
                position: relative;
                span {
                    margin: 4px;
                }
                > span:nth-of-type(1) {
                    background-image: url("./img/icon_17@2x.png");
                }
                > span:nth-of-type(2) {
                    background-image: url("./img/icon_18@2x.png");
                    position: relative;
                    input {
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        opacity: 0;
                    }
                }
                // > span:nth-of-type(3) {
                //     background-image: url("./img/icon_19@2x.png");
                //     position: relative;
                // }
                > span:nth-of-type(3) {
                    background-image: url("./img/icon_20@2x.png");
                    position: relative;
                }
                > span:nth-of-type(4) {
                    background: url("./img/redPocket@3x.png") 2px 2px no-repeat;
                    position: relative;
                    background-size: 76% 76%;
                }
            }
        }
    }
}
.header-set {
    width: 136px;
    height: 158px;
    background: #f7f7f7;
    position: absolute;
    top: 36px;
    left: 108px;
    border: 1px solid #9e9e9e;
    color: #231815;
    padding: 4px;
    z-index: 1;
    cursor: pointer;
    > div {
        height: 30px;
        line-height: 30px;
        img {
            width: 18px;
            height: 18px;
            float: left;
            margin-top: 4px;
            margin-right: 4px;
        }
    }
}
.header-set:before {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -24px;
    left: 21px;
    padding: 0;
    border-bottom: 12px solid #ffffff;
    border-top: 12px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    display: block;
    content: "";
    z-index: 2;
}
.header-set:after {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -26px;
    left: 20px;
    padding: 0;
    border-bottom: 13px solid #9e9e9e;
    border-top: 13px solid transparent;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    display: block;
    content: "";
    z-index: 1;
}
.transfer {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    .contain {
    }
}
.voice {
    position: relative;
    audio {
    }
}
.voiceImg {
    width: 100px;
    height: 30px;
}
.gathering {
    > div {
        background: #eca14f;
        height: 40px;
        width: 120px;
        border-radius: 10px;
        padding-top: 1px;
        > div:first-child {
            margin-top: 5px;
            margin-left: 10px;
            height: 26px;
            width: 26px;
            background: url(./img/pay_transfer@3x.png);
            background-size: 100% 100%;
        }
        > div:last-child {
            line-height: 40px;
            color: #fff;
            margin-right: 10px;
        }
    }
}
.emojiPanel {
    position: absolute;
    background: #fff;
    top: -500px;
    left: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}
</style>