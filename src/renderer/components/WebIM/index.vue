<template>
    <div class="contain" id="webIm">
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
                        <span class="icon" @click="__changeShow(index)">_</span>
                        <span class="icon groupSet" v-if="item.type=='group'" @click="__groupSetShow(index,item)"></span>
                        <span class="icon setSize" @click="__changeSize(index)"></span>
                        <span class="icon" @click="__closeIm(index)"></span>
                    </div>
                    <!-- <div class="header-set" v-if="index==headerSetIdx">
                        <div @click="changeNameShow=true"><img src="./img/chat_setting_change name@2x.png" />更改名称</div>
                        <div><img src="./img/chat_setting_no placed the top@2x.png" />不置顶/置顶</div>
                        <div><img src="./img/chat_setting_no remind@2x.png" />开启/关闭提醒</div>
                        <div><img src="./img/chat_setting_lift blockkade@2x.png" />解除封锁/封锁</div>
                        <div><img src="./img/chat_setting_delete@2x.png" />删除聊天记录</div>
                    </div> -->
                </header>
                <div class="conWrap" :style="{height:item.height}" @click="__exitOperation">
                    <ul class="feed imFrame" id="feed">
                        <li class="a" :class="{'b':items.type==0}" v-for="(items,indexs) in item.msgList" :key="indexs" @contextmenu="__operationShow(index,indexs,items)">
                            <img class='headerImg' :src="items.avatar" v-if="items.type==1&&items.avatar&&items.messageType!=9">
                            <img class='headerImg' src="./img/icon.png" v-if="items.type==1&&!items.avatar&&items.messageType!=9">
                            <img class='headerImg' :src="userInfo.avatar" v-if="items.type==0&&userInfo.avatar&&items.messageType!=9">
                            <img class='headerImg' src="./img/icon.png" v-if="items.type==0&&!userInfo.avatar&&items.messageType!=9">
                            <div class="userName" v-if="items.type==1&&items.messageType!=9">{{items.userName}}</div>
                            <div class="nickName" v-if="items.type==0&&items.messageType!=9">{{userInfo.nickname}}</div>
                            <p class="msg" v-if="items.messageType==1">{{items.msg}}</p>
                            <div v-if="items.messageType==9" class="redExplain">
                                <p class="clearfix">
                                    <i></i>
                                    {{items.msg.fromName}}领取了{{items.msg.senderUserName}}的
                                    <span>红包</span>
                                </p>
                            </div>
                            <div v-if="items.messageType==2">
                                <img :src="items.msg" style="width: 100px;height: auto;" />
                            </div>
                            <div v-if="items.messageType==3" class="voice">
                                <div class="voiceImg" @click="__playVoice">
                                    <img src="./img/voice_01.png" name="img1" style="display:block;" />
                                    <img src="./img/voice_02.png" name="img2" style="display:none;" />
                                    <img src="./img/voice_03.png" name="img3" style="display:none;" />
                                    <div class="duration">{{items.duration}}</div>
                                </div>
                                <audio :src="items.msg" class="audio"></audio>
                            </div>
                            <div v-if="items.messageType==4" class="address" @click="__addressShow(item,items.msg,index)">
                                <div class="title" :class="{anotherTitle:items.type=='0'}">
                                    {{items.msg.address}}
                                </div>
                                <div>
                                    <img :src="items.msg.mapScreenShot" style="width:175px;" :class="{anotherTitle:items.type=='0'}" />
                                </div>
                            </div>
                            <div v-if="items.messageType==5" class="gathering" @click="__transferDetailShow(index,items)">
                                <div class="clearfix">
                                    <div class="fl"></div>
                                    <div class="fr">
                                        <div v-if="items.type == 1">
                                            {{items.msg.toNickname}}{{$t('webim.transferForYou')}}
                                        </div>
                                        <div v-else>
                                            {{$t('webim.transferFor')}}{{items.msg.toNickname}}
                                        </div>
                                        <div>
                                            {{items.msg.amount}}{{items.msg.currency}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="items.messageType==7" class="red" @click="__getRedShow(index,items,item,indexs)">
                                <div class="clearfix">
                                    <div class="fl"></div>
                                    <div class="fr">
                                        <div>
                                            {{items.msg.remark}}
                                        </div>
                                        <div>
                                            {{$t('webim.red')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="items.messageType==9" class="groupGathering" @click="__getRedShow(index,items,item,indexs)"></div>
                            <div v-if="items.messageType==11" class="msg" @click="__previewDynamic(items.msg)">
                                <div class="clearfix">
                                    <div class="fl" style="width:calc(100% - 40px);padding-right:10px">
                                        <div>
                                            {{items.msg.dynamicDesc}}
                                        </div>
                                    </div>
                                    <div class="fr">
                                        <div style="width:40px;height:40px">
                                            <img v-if="items.msg.imageUrl" style="width:100%;height:100%;object-fit:cover" :src="items.msg.imageUrl" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="items.messageType!=1&&items.messageType!=2&&items.messageType!=3&&items.messageType!=5&&items.messageType!=7&&items.messageType!=11&&items.messageType!=9&&items.messageType!=4" class="msg">
                                {{$t('webim.msg')}}
                            </div>

                        </li>
                    </ul>
                    <Transfer v-if="transferIdx==index" :user-idx="index" :user-id="item.userId" :user-name="item.userName" :user-img="item.avatar" v-on:changeStatus="__exitTransfer"></Transfer>
                    <TransferDetail v-if="transferDetailIdx==index" :transfer-info="transferDetailInfo" v-on:changeStatus="__exitTransferDetail"></TransferDetail>
                    <Red v-if="redIdx==index" :user-idx="index" :user-id="item.userId" :user-name="item.userName" :user-type="item.type" :group-id="item.groupId" v-on:changeStatus="__exitRed"></Red>
                    <GetRed v-if="getRedIdx==index" :red-msg='redMsgIdx' :user-id="item.userId" :red-info="getRedInfo" :user-idx="index" :user-name="item.userName" :user-type="item.type" :group-id="item.groupId" v-on:changeStatus="__exitGetRed"></GetRed>
                    <RedDetail v-if="redDetailIdx==index" :red-info="redInfo" :user-name="item.userName" v-on:changeStatus="__exitRedDetail"></RedDetail>
                    <Operation v-if="operationIdx==index" :msg-idx="operationMsgIdx" :ope-idx="index" :user-id="item.userId || item.groupId" :user-type="item.type" :msg-item="operationMsgItem" :user-name="item.userName" :head="item.avatar" v-on:changeStatus="__exitOperation"></Operation>
                    <GroupSet v-if="groupSetIdx==index" :group-id="item.groupId" :idx="index"></GroupSet>
                </div>
                <div class="input">
                    <input type="text" class="inputItem" :placeholder="$t('webim.placeholder')" @keyup.enter="__submitMsg(index,item)" @blur="__blurInput(index)">
                    <div>
                        <EmojiPanel class="emojiPanel" @setEmoji='__setEmoji' v-if="index==emojiSetIdx"></EmojiPanel>
                        <span class="icon" @click='__emojiSetShow(index)'></span>
                        <span class="icon">
                            <input type="file" @change="__chooseImg(index,item.type,item)" class="fileClass" id="fileId">
                        </span>
                        <!-- <span class="icon"></span> -->
                        <span class="icon transferIcon" v-if="item.type=='personal'" @click="__transferShow(index)"></span>
                        <span class="icon redIcon" @click="__redShow(index)"></span>
                        <span class="icon addressIcon" @click="__addressShow(item,'',index)"></span>
                        <span class="icon groudCode" v-if="item.type=='group'" @click="SET_GROUPCODE_STATE({groupId:item.groupId,groupName:item.userName})"></span>
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
import TransferDetail from "./TransferDetail";
import Red from "./Red";
import GetRed from "./GetRed";
import RedDetail from "./RedDetail";
import EmojiPanel from "./EmojiPanel";
import Operation from "./Operation";
import GroupSet from "./GroupSet";

export default {
    props: ["webIMList"],
    data() {
        return {
            voiceBc: "./img/voice_01.png",
            inputVal: "",
            inputIdx: 99,
            emojiSetIdx: 99,

            headerSetIdx: 99,
            changeNameShow: false,
            transferIdx: 99,
            transferDetailIdx: 99,
            transferDetailInfo: "",
            redIdx: 99,
            getRedIdx: 99,
            getRedInfo: {},
            redMsgIdx: false,
            redDetailIdx: 99,
            operationIdx: 99,
            operationMsgIdx: "",
            operationMsgItem: "",
            redInfo: {},
            righttime: null,
            voiceImgShow: 1,
            groupSetIdx: 99 //群组设置
        };
    },
    components: {
        ChangeName,
        Transfer,
        TransferDetail,
        Red,
        GetRed,
        RedDetail,
        EmojiPanel,
        Operation,
        GroupSet
    },
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
                if (JSON.stringify(_this.userInfo) != "{}") {
                    _this.__getMsg();
                    getMsg();
                }
            }, 10000);
        };
        getMsg();
        // this.__getMsg();
    },
    methods: {
        ...mapMutations([
            "SET_WEBIM_SHOW",
            "SET_WEBIM_SIZE",
            "SET_WEBIM_List",
            "SET_MSG_List",
            "SPLICE_MSG_LIST",
            "SET_FEED_VIEW_DYNAMIC_ID",
            "DELETE_WEBIM_LIST",
            "SET_MAP_STATE",
            "SET_GROUPCODE_STATE"
        ]),

        //预览转发动态
        __previewDynamic(msg) {
            this.SET_FEED_VIEW_DYNAMIC_ID({
                id: msg.dynamicId,
                t: new Date().getTime()
            });
        },
        //显示地址，1：查看地址，2：发送地址
        __addressShow(mapMsgToInfo, mapItem, index) {
            mapMsgToInfo.userIdx = index;
            this.SET_MAP_STATE({
                mapItem,
                mapMsgToInfo
            });
        },
        __groupSetShow(index, item) {
            if (this.groupSetIdx == index) {
                this.groupSetIdx = 99;
                return;
            }
            this.groupSetIdx = index;
        },
        __operationShow(index, indexs, item) {
            this.operationIdx = index;
            this.operationMsgIdx = indexs;
            this.operationMsgItem = item;
        },
        __changeShow(index) {
            this.SET_WEBIM_SHOW(index);
        },
        __changeSize(index) {
            this.SET_WEBIM_SIZE(index);
        },
        __closeIm(index) {
            this.groupSetIdx = 99;
            this.DELETE_WEBIM_LIST(index);
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
        __getRedShow(index, items, item, indexs) {
            // if (items.msg.isGet) {
            //     this.$Toast('已领取过');
            //     return
            // }
            this.redMsgIdx = indexs;
            if (items.type == 0) {
                if (item.type == "group") {
                    this.getRedInfo = items.msg;
                    this.getRedIdx = index;
                    return;
                }
                this.redInfo = items.msg;
                this.redDetailIdx = index;
            } else {
                this.getRedInfo = items.msg;
                this.getRedIdx = index;
            }
        },
        __transferDetailShow(index, item) {
            if (item.type == 0) {
                this.transferDetailInfo = item;
                this.transferDetailIdx = index;
            }
        },
        __exitTransfer(val) {
            this.transferIdx = 99;
        },
        __exitTransferDetail(val) {
            this.transferDetailIdx = 99;
        },
        __exitRed(val) {
            this.redIdx = 99;
        },
        __exitGetRed() {
            this.getRedIdx = 99;
        },
        __exitRedDetail() {
            this.redDetailIdx = 99;
        },
        __exitOperation() {
            this.operationIdx = 99;
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
            if (!event.target.value) {
                return;
            }
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
                para.type = "groupchat";
                para.toUserId = item.groupId;
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
            // const groupRes = {"code":0,"msg":"success","data":{"resultCode":1,"msg":"receiver success.","message":[{"fromUserId":212,"fromAccount":"681442828814517","fromUserAvatar":"","fromNickName":"joker","toUserId":102,"toAccount":"chat_102@groupchat.angel.com","threadID":"","messageType":1,"body":"11","time":1554271191041,"fromCollectionAddress":"","unique":"d8269eea-8def-4aa5-a5f3-f4aa9b9e6646","chatType":1,"groupName":"Test","groupAccount":"chat_102@groupchat.angel.com","groupId":"102","groupAvatar":""}],"returnObj":{}}};
            let arr = [res, groupRes];
            arr.forEach(resArrVal => {
                if (
                    resArrVal.data.message &&
                    resArrVal.data.message instanceof Array &&
                    resArrVal.data.message.length > 0
                ) {
                    resArrVal.data.message.forEach(val => {
                        if (
                            val.messageType == 5 ||
                            val.messageType == 7 ||
                            val.messageType == 9 ||
                            val.messageType == 4
                        ) {
                            val.body = JSON.parse(val.body);
                            //红包默认remark
                            if (!val.body.remark && val.messageType == 7) {
                                val.body.remark = "恭喜发财";
                            }
                            //领取红包信息添加fromName
                            if (val.messageType == 9) {
                                val.body.fromName = val.fromNickName;
                            }
                        }

                        var flag = this.webIMList.some((subVal, index) => {
                            //群聊信息
                            if (subVal.groupId == val.groupId) {
                                var msg = {
                                    type: 1,
                                    userName: val.fromNickName,
                                    avatar: val.fromUserAvatar,
                                    userName: val.fromNickName,
                                    messageType: val.messageType,
                                    msg: val.body
                                };
                                this.SET_MSG_List({
                                    index,
                                    msg
                                });
                                return subVal.groupId == val.groupId;
                            }
                            //个人消息
                            if (!val.groupId) {
                                if (subVal.userId == val.fromUserId) {
                                    var msg = {
                                        type: 1,
                                        userName: val.fromNickName,
                                        avatar: val.fromUserAvatar,
                                        messageType: val.messageType,
                                        msg: val.body
                                    };
                                    this.SET_MSG_List({
                                        index,
                                        msg
                                    });
                                    return subVal.userId == val.fromUserId;
                                }
                            }
                        });

                        if (!flag) {
                            let obj = {
                                userName: val.fromNickName,
                                avatar: val.fromUserAvatar,
                                type: "personal",
                                isShow: true,
                                width: "210px",
                                height: "168px",
                                msgList: [
                                    {
                                        type: "1",
                                        userName: val.fromNickName,
                                        avatar: val.fromUserAvatar,
                                        messageType: val.messageType,
                                        msg: val.body
                                    }
                                ]
                            };
                            if (val.groupId) {
                                obj.groupId = val.groupId;
                                obj.type = "group";
                                obj.userName = val.groupName;
                            } else {
                                obj.userId = val.fromUserId;
                            }
                            this.SET_WEBIM_List(obj);
                        }
                    });
                }
            });

            this.$nextTick(function() {
                setTimeout(() => {
                    var audios = document.querySelectorAll(".audio");
                    this.webIMList.forEach((val, index) => {
                        val.msgList.forEach((subVal, msgIdx) => {
                            if (subVal.messageType == 3) {
                                audios.forEach(audio => {
                                    if (audio.currentSrc == subVal.msg) {
                                        var msg = {
                                            type: subVal.type,
                                            messageType: subVal.messageType,
                                            msg: subVal.msg,
                                            duration: Math.round(audio.duration)
                                        };
                                        this.SPLICE_MSG_LIST({
                                            index,
                                            msgIdx,
                                            msg
                                        });
                                    }
                                });
                            }
                        });
                    });
                }, 0);
                this.webIMList.forEach((val, index) => {
                    if (
                        document.querySelectorAll(".imFrame")[index] &&
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
        async __chooseImg(index, type, item) {
            let arr = document.getElementsByClassName("fileClass");
            const _this = this;
            let str = "";
            let f = document.getElementsByClassName("fileClass")[index].files;
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
            formData.append("toUserId", item.userId);
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
        },
        __playVoice() {
            const _this = this;
            let audio = event.currentTarget.nextElementSibling;
            let imgs = event.currentTarget.getElementsByTagName("img");
            if (audio.paused) {
                this.righttime = setInterval(function() {
                    if (imgs[0].style.display == "block") {
                        imgs[0].style.display = "none";
                        imgs[1].style.display = "block";
                    } else if (imgs[1].style.display == "block") {
                        imgs[1].style.display = "none";
                        imgs[2].style.display = "block";
                    } else {
                        imgs[2].style.display = "none";
                        imgs[0].style.display = "block";
                    }
                }, 200);
                audio.play();
            } else {
                clearInterval(this.righttime);
                audio.pause();
            }
        },
        //点击转账
        __gathering() {},
        //点击红包
        __getRed() {}
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
    cursor: pointer;
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
                font-size: 12px;
                text-align: center;
                margin-top: -4px;
            }
            .setSize {
                background-image: url("./img/icon_14@2x.png");
            }
            > span:last-of-type {
                background-image: url("./img/icon_15@2x.png");
            }
            .groupSet {
                background-image: url("./img/icon_13@2x.png");
            }
        }
        .conWrap {
            width: 100%;
            overflow: auto;
            background: #fff;
            .feed {
                padding-bottom: 10px;
                overflow: hidden;
                > li {
                    display: flex;
                    margin-top: 20px;
                    .img {
                    }
                    .msg {
                        padding: 4px 8px;
                        border-radius: 2px;
                    }
                }
                .a {
                    display: flex;
                    position: relative;
                    .msg {
                        background: #dbdcdc;
                        word-wrap: break-word;
                    }
                    .userName {
                        font-size: 12px;
                        position: absolute;
                        top: -16px;
                        left: 28px;
                        color: #9e9e9e;
                    }
                    .nickName {
                        font-size: 12px;
                        position: absolute;
                        top: -16px;
                        right: 28px;
                        color: #9e9e9e;
                    }
                }
                .b {
                    display: flex;
                    flex-direction: row-reverse;
                    .msg {
                        background: #3f61a6;
                        color: #fff;
                        word-wrap: break-word;
                    }
                }
                .headerImg {
                    width: 20px;
                    height: 20px;
                    margin: 4px;
                    margin-top: -6px;
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
                .transferIcon {
                    background-image: url("./img/icon_20@2x.png");
                    position: relative;
                }
                .redIcon {
                    background: url("./img/redPocket@3x.png") 2px 2px no-repeat;
                    position: relative;
                    background-size: 76% 76%;
                }
                .addressIcon {
                    background: url("./img/address.png") 2px 2px no-repeat;
                    position: relative;
                    background-size: 78% 78%;
                }
                .groudCode {
                    background: url("./img/timg1.jpg") 2px 2px no-repeat;
                    position: relative;
                    background-size: 78% 78%;
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
    display: flex;
}
.voiceImg {
    width: 90px;
    height: 28px;
    background: #9eea6a;
    position: relative;
    .duration {
        position: absolute;
        line-height: 30px;
        color: #999;
        top: 0;
        right: 8px;
    }
    img {
        margin-left: 8px;
        width: 24px;
        height: 24px;
        margin-top: 3px;
    }
}
.voiceImg:hover {
    background: rgb(128, 255, 0);
}
.address {
    .title {
        line-height: 20px;
        background: #eeeeee;
        color: #333;
    }
    img {
        width: 175px;
    }
    .anotherTitle {
        width: 165px !important;
        position: relative;
    }
}
.gathering {
    > div {
        background: #eca14f;
        height: 40px;
        width: 150px;
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
            width: 98px;
            color: #fff;
            margin-right: 10px;
            font-size: 12px;
            > div:first-child {
                overflow: hidden;
            }
            > div {
                height: 20px;
                line-height: 20px;
            }
        }
    }
}
.red {
    > div {
        background: #eca14f;
        height: 50px;
        width: 150px;
        border-radius: 10px;
        padding-top: 1px;
        > div:first-child {
            margin-top: 5px;
            margin-left: 10px;
            height: 36px;
            width: 30px;
            background: url(./img/redPocket_big@3x.png);
            background-size: 100% 100%;
        }
        > div:last-child {
            width: 98px;
            color: #fff;
            font-size: 12px;
            margin-top: 3px;
            > div:first-child {
                overflow: hidden;
            }
            > div {
                height: 21px;
                line-height: 21px;
            }
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
.redExplain {
    width: 100%;
    text-align: center;
    p {
        font-size: 12px;
        line-height: 22px;
        i {
            background: url(./img/redPocket@3x.png);
            background-size: 100% 100%;
            display: inline-block;
            width: 16px;
            height: 16px;
            position: relative;
            top: 3px;
        }
        span {
            color: #eca14f;
        }
    }
}
</style>