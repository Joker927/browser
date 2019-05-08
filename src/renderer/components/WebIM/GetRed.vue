<template>
    <div class="shade">
        <div class="contain" v-if="!haveRed">
            <div class="head">
                <img :src="otherUserInfo.avatar" v-if="otherUserInfo.avatar" />
                <img src="./img/icon.png" v-else/>
            </div>
            <!-- 红包未过期 -->
            <div v-if="redShow">
                <div class="info">
                    {{userName}}
                </div>
                <div class="info">
                    {{$t('webim.redExpalin')}}
                </div>
                <div class="info">
                    {{redInfo.remark}}
                </div>
                <div class="open" @click="__getRed">
                    {{$t('webim.open')}}
                </div>
            </div>

            <!-- 红包已过期 -->
            <div v-if="!redShow">
                <div v-if="isGroup" class="redListT">{{redInfo.senderUserName}}的红包</div>
                <div v-if="isGroup" class="redList">
                    <div v-for="(item,index) in getRedList" :key="index" class="clearfix">
                        <img :src="item.msg.headImg" v-if="item.msg.headImg" class="fl"/>
                        <img src="./img/icon.png" v-else class="fl"/>
                        {{item.msg.fromName}}
                        <span class="fr">{{item.msg.amount}}&nbsp;&nbsp;{{item.msg.currency}}</span>
                    </div>
                </div>
                <div class="info" v-else>
                    {{$t('webim.reded')}}
                </div>
            </div>
        </div>

        <div class="contain2" v-if="haveRed">
            <div class="head">
                <img :src="otherUserInfo.avatar" v-if="otherUserInfo.avatar" />
                <img src="./img/icon.png" v-else/>
            </div>
            <div class="info">
                {{userName}}
            </div>
            <div class="info">
                {{redInfo.remark}}
            </div>
            <div class="info">
                {{redInfo.amount}}{{redInfo.currency}}
            </div>
        </div>

        <div>
            <div class="exit" @click="__exit"></div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: [
        "userIdx",
        "userId",
        "userName",
        "redInfo",
        "redMsg",
        "userType",
        "groupId",
        "redName"
    ],
    data() {
        return {
            haveRed: false,
            isGroup: false,
            redShow: true,
            otherUserInfo: {},
            getRedList: []
        };
    },
    mounted() {
        this.__getUserInfo();
        if (this.redInfo.isGet) {
            this.redShow = false;
        }

        if (this.webIMList[this.userIdx].groupId) {
            this.isGroup = true;
        }

        this.webIMList[this.userIdx].msgList.forEach(val => {
            if (val.messageType == 9 && this.redInfo.id == val.msg.id) {
                this.getRedList.push(val);
            }
        });
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            webIMList: state => state.WebImQueue.webIMList
        })
    },
    methods: {
        ...mapMutations([
            "SET_LOADING_STATE",
            "SPLICE_MSG_LIST",
            "SET_MSG_List"
        ]),
        __exit() {
            this.$emit("changeStatus", false);
        },
        //获取对方用户信息
        async __getUserInfo() {
            const res = await this.api.userInfo({ id: this.userId });
            this.otherUserInfo = res.data;
        },
        async __getRed() {
            let obj = {
                collectionAddress: this.userInfo.collectionAddress,
                id: this.redInfo.id
            };
            this.SET_LOADING_STATE(true);
            const res = await this.api.getRed(obj);
            if (res.msg == "领取成功") {
                this.redInfo.isGet = true;
                var objs = {
                    type: 0,
                    messageType: 7,
                    msg: this.redInfo
                };
                this.SPLICE_MSG_LIST({
                    index: this.userIdx,
                    msgIdx: this.redMsg,
                    msg: objs
                });
                this.SET_LOADING_STATE(false);
                this.haveRed = true;

                if (this.redInfo.senderUserName == this.userInfo.nickname) {
                    var objss = {
                        type: 0,
                        messageType: 9,
                        msg: {
                            id: this.redInfo.id,
                            amount: this.redInfo.amount,
                            currency: this.redInfo.currency,
                            senderUserName: this.redInfo.senderUserName,
                            senderUserId: this.userId,
                            fromName: this.userInfo.nickname,
                            headImg: this.userInfo.avatar,
                            type: "pc"
                        }
                    };
                    this.SET_MSG_List({
                        index: this.userIdx,
                        msg: objss
                    });
                }

                var messageType = {
                    id: this.redInfo.id,
                    senderUserName: this.redInfo.senderUserName,
                    senderUserId: this.userId,
                    fromName: this.userInfo.nickname,
                    type: "pc"
                };
                let params = {
                    body: JSON.stringify(messageType),
                    fromUserId: this.userInfo.userId,
                    messageType: 9,
                    time: 0,
                    toUserId: this.userId,
                    type: "chat"
                };
                if (this.userType == "group") {
                    params.type = "groupchat";
                    params.toUserId = this.groupId;
                    this.api.sendGroupMessage(params);
                } else {
                    this.api.sendMessage(params);
                }
            } else {
                this.SET_LOADING_STATE(false);
                this.redShow = false;
            }
            this.$Toast(res.msg);
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
}
.exit {
    width: 26px;
    height: 26px;
    background: url(./img/redPocket_cancel@3x.png);
    background-size: 100%;
    margin: 6px auto 0;
}
.contain {
    width: 90%;
    height: 74%;
    background: #cd3333;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 6px;
    position: relative;
    border-radius: 10px;
}
.contain2 {
    width: 90%;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 6px;
    position: relative;
    border-radius: 10px;
    .info {
        color: #333;
    }
}
.head {
    img {
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
        display: block;
        margin: 6px auto;
    }
}
.info {
    color: #eca14f;
    text-align: center;
    font-weight: 600;
}
.open {
    width: 60px;
    height: 60px;
    background: #eca14f;
    color: #fff;
    line-height: 60px;
    border-radius: 50%;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    margin: 6px auto;
}
.redListT{
    text-align: center;
    color: #eca14f;
    font-weight: 600;
}
.redList{
    color: #fff;
    font-weight: 600;
    width: 80%;
    margin-left: 10%;
    >div{
        height: 16px;
        line-height: 16px;
        font-size: 12px;
    }
    img{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-right: 6px;
    }
}
</style>


