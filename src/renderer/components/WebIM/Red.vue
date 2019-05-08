<template>
    <div class="shade">
        <div class="contain">
            <div class="exit" @click="__exit"></div>
            <div class="title">{{$t('webim.sendRed')}}</div>

            <div class="clearfix num">
                <div class="fl" style="font-size:13px;">{{$t('wallet.money')}}</div>
                <div class="fl">
                    <input type="text" v-model="num" />
                </div>
                <div class="fl" @click="currentyShow=true">
                    {{select.symbol}}
                    <div v-if="currentyShow">
                        <div v-for="(item,index) in propertyList" :key="index" @click.stop='__select(item)'>
                            {{item.symbol}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix num" v-if="groupId">
                <div class="fl" style="font-size:13px;">{{$t('wallet.nums')}}</div>
                <div class="fl">
                    <input type="text" v-model="nums" />
                </div>
                <div class="fl" >
                </div>
            </div>

            <div class="explain">
                <textarea placeholder="说明" v-model="explain"></textarea>
            </div>

            <div class="btn" @click="__sendRed">{{$t('webim.inRed')}}</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["userIdx", "userId", "userName", "userType", "groupId"],
    data() {
        return {
            num: "", //金额
            nums: "", //数量
            currentyShow: false,
            select: "",
            explain: "",
            collectionAddress: ""
        };
    },
    mounted() {
        this.__getUserInfo();
        this.select = this.propertyList[0];
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            propertyList: state => state.Wallet.propertyList,
            lastAddress: state => state.UserInfo.lastAddress
        })
    },
    methods: {
        ...mapMutations(["SET_MSG_List", "SET_LOADING_STATE"]),
        __exit() {
            this.$emit("changeStatus", false);
        },
        __select(item) {
            this.select = item;
            this.currentyShow = false;
        },
        //获取对方用户信息
        async __getUserInfo() {
            const res = await this.api.userInfo({ id: this.userId });
            this.collectionAddress = res.data.collectionAddress;
        },
        //发红包
        async __sendRed() {
            let param = {
                amount: this.num,
                collectionAddress: this.lastAddress,
                contractAddress: this.select.address,
                currency: this.select.name,
                dec: this.explain,
                num: this.nums || 1,
                receiverUserId: this.userId,
                senderUserId: this.userInfo.userId,
                type: 1
            };
            let transferParams = {
                seed: this.seed,
                addressList: this.addressList,
                amount: this.num,
                toAddress: "XYISCYBEVIORHMNV9JWUQLPQNZDZE9ABJFRRFHGUOXKGVLJOGIUFYCNTOMWJROZJI9TCTJMFBMJAXWMBC",
                contractAddress: this.select.address
            };
            this.SET_LOADING_STATE(true);
            this.api.transferToSeedAddress(transferParams).then(transferRes => {
                if (transferRes.msg == "Success") {
                    this.api.sendRed(param).then(res => {
                        this.SET_LOADING_STATE(false);
                        this.$Toast(res.msg);
                        if (res.code == 0) {
                            var obj = {
                                type: 0,
                                messageType: 7,
                                msg: {
                                    id: res.data,
                                    toNickname: this.userName,
                                    amount: this.num,
                                    currency: this.select.name,
                                    remark: this.explain || "恭喜发财",
                                    senderUserName: this.userInfo.nickname
                                }
                            };

                            var messageType = {
                                id: res.data,
                                remark: this.explain || "恭喜发财",
                                currency: this.select.name,
                                amount: this.num,
                                toNickname: this.userName,
                                type: 0,
                                senderUserName: this.userInfo.nickname
                            };
                            let params = {
                                body: JSON.stringify(messageType),
                                fromUserId: this.userInfo.userId,
                                messageType: 7,
                                time: 0,
                                toUserId: this.userId,
                                type: "chat"
                            };
                            if (this.userType == 'group') {
                                params.type = "groupchat";
                                params.toUserId = this.groupId;
                                this.api.sendGroupMessage(params);
                            } else {
                                this.api.sendMessage(params);
                            }
                            this.SET_MSG_List({
                                index: this.userIdx,
                                msg: obj
                            });
                            this.SET_LOADING_STATE(false);
                            this.__exit();
                        }
                    });
                } else {
                    this.SET_LOADING_STATE(false);
                    this.$Toast(transferRes.msg);
                }
            });
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
.contain {
    width: 90%;
    height: 84%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 10px;
    position: relative;
}
.exit {
    width: 14px;
    height: 14px;
    position: absolute;
    background: url(./img/link_cancel.png);
    background-size: 100%;
    top: 2px;
    right: 2px;
}
.title {
    margin-top: 10px;
    text-align: center;
    font-weight: 600;
}
.num {
    margin-top: 10px;
    margin-left: 4px;
    line-height: 20px;
    input {
        width: 100px;
        height: 20px;
        outline: none;
        border: none;
        background: #efefef;
        border-radius: 8px;
        margin-left: 4px;
        padding-left: 10px;
    }
    > div:last-child {
        height: 20px;
        width: 40px;
        background: #efefef;
        margin-left: -10px;
        border-radius: 8px;
        text-align: center;
        color: #3f61a6;
        font-weight: 600;
        position: relative;
        > div {
            position: absolute;
            background: #efefef;
            border-radius: 8px;
            left: -10px;
            > div {
                height: 20px;
            }
        }
    }
}
.explain {
    margin-left: 4px;
    textarea {
        width: 90%;
        resize: none;
        margin-top: 20px;
        outline: none;
        border: none;
    }
}
.btn {
    color: #fff;
    background: #cd3333;
    text-align: center;
    width: 90%;
    height: 26px;
    line-height: 26px;
    margin-left: 5%;
    margin-top: 20px;
    border-radius: 13px;
}
</style>


