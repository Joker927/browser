<template>
    <div class="shade">
        <div class="contain" v-if="!sureShow">
            <div class="exit" @click="__exit"></div>
            <div class="headImg">
                <img :src="userImg" v-if="userImg"/>
                <img src="./img/icon.png" v-else/>
            </div>
            <div class="name">
                {{userName}}
            </div>
            <div class="info clearfix">
                <div>{{$t('webim.money')}}</div>
                <div>
                    <select v-model="option">
                        <option v-for="(item,index) in propertyList" :key="index" :value="item.name">
                            {{item.name}}
                        </option>
                    </select>
                    <input type="text" :placeholder="$t('webim.placeholder1')" v-model="amount" />
                </div>
            </div>
            <div class="explain">
                <textarea :placeholder="$t('webim.placeholder2')" v-model="explain"></textarea>
            </div>
            <div class="btn" @click="__sureTransfer()">{{$t('webim.transfer')}}</div>
        </div>

        <div class="contain" v-if="sureShow">
            <div class="sureImg"></div>
            <div class="sureDiv">给{{this.userName}}{{$t('webim.transfer')}}</div>
            <div class="sureDiv">{{this.amount}}</div>
            <div class="sureBtn" @click="__done">{{$t('webim.done')}}</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["userIdx", "userId", "userName", "userImg"],
    data() {
        return {
            option: "GIT",
            sureShow: false,
            toAddress: "",
            amount: "",
            explain: ""
        };
    },
    mounted() {
        this.__getUserInfo();
        console.log(this.propertyList);
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            propertyList: state => state.Wallet.propertyList
        })
    },
    methods: {
        ...mapMutations(["SET_MSG_List", "SET_LOADING_STATE"]),
        __exit() {
            this.$emit("changeStatus", false);
        },
        __done() {
            var obj = {
                type: 0,
                messageType: 5,
                msg: {
                    toNickname: this.userName,
                    amount: this.amount,
                    currency: this.option
                }
            };
            this.SET_MSG_List({ index: this.userIdx, msg: obj });
            this.__exit();
        },
        __sureTransfer() {
            console.log(this.userIdx);
            this.__transferToSeedAddress();
        },
        //获取对方用户信息
        async __getUserInfo() {
            const res = await this.api.userInfo({ id: this.userId });
            this.toAddress = res.data.collectionAddress;
        },
        //根据seed地址转账
        async __transferToSeedAddress() {
            let contractAddress = null;
            this.propertyList.forEach(val => {
                if (val.name == this.option) {
                    contractAddress = val.address;
                }
            });
            let params = {
                seed: this.seed,
                addressList: this.addressList,
                amount: this.amount,
                toAddress: this.toAddress,
                contractAddress: contractAddress
            };
            this.SET_LOADING_STATE(true)
            const res = await this.api.transferToSeedAddress(params);
            if (res.msg != "Success") {
                this.$Toast(res.msg);
            } else {
                var messageType = {
                    remark: this.explain,
                    currency: this.option,
                    amount: this.amount,
                    toNickname: this.userName,
                };
                let params = {
                    body: JSON.stringify(messageType),
                    fromUserId: this.userInfo.userId,
                    messageType: 5,
                    time: 0,
                    toUserId: this.userId,
                    type: "chat"
                };
                this.api.sendMessage(params);
                this.sureShow = true;
            }
            this.SET_LOADING_STATE(false)
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
    height: 74%;
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
.headImg {
    margin-top: 4px;
    img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin: 0 auto;
        display: block;
    }
}
.name {
    color: #231815;
    font-size: 14px;
    text-align: center;
    font-weight: 600;
}
.info {
    > div:first-child {
        color: #231815;
        font-size: 14px;
        font-weight: 600;
        padding-left: 14px;
    }
    > div:nth-child(2) {
        margin-top: 10px;
        select {
            float: left;
            margin-left: 14px;
        }
        input {
            width: 80%;
            border: none;
            outline: none;
            margin-left: 14px;
            margin-top: 10px;
        }
        input::-webkit-input-placeholder {
            color: #888;
            font-weight: 600;
        }
    }
}
.explain {
    margin-top: 6px;
    textarea {
        resize: none;
        width: 100%;
        height: 20px;
        border: none;
        outline: none;
        padding: 0 14px;
    }
    textarea::-webkit-input-placeholder {
        color: #888;
        font-weight: 600;
    }
}
.btn {
    background: #0dac67;
    color: #fff;
    width: 90%;
    margin: 0 auto;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 4px;
}
.sureImg {
    width: 40px;
    height: 40px;
    background: url(./img/pay_detail_success@3x.png);
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 20px;
}
.sureDiv {
    text-align: center;
}
.sureBtn {
    color: #fff;
    background: #3f61a6;
    height: 26px;
    width: 120px;
    margin: 10px auto;
    border-radius: 8px;
    text-align: center;
    line-height: 26px;
}
</style>


