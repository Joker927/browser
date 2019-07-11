<template>
    <div class="mask">
        <div class="box">
            <div>
                <span class="exit" @click="SET_TRANSFER_STATE"></span>
            </div>
            <div class="title">
                {{$t('webim.transfer')}}
            </div>
            <div class="inputAmount clearfix">
                <div class="fl">{{$t('webim.payObj')}}:</div>
                <div class="inputs fl clearfix">
                    <div class="fl">
                        <input type="text" v-model='input1'>
                    </div>
                    <div class="fl add" @click='selectCShow1=!selectCShow1'>
                        <div v-show='selectCShow1'>
                            <div v-for="(item,index) in fList" :key="index" @click='__selectC(1,item)'>{{item.nickname}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="inputAmount clearfix">
                <div class="fl">{{$t('webim.setAmount')}}:</div>
                <div class="inputs fl clearfix">
                    <div class="fl">
                        <input type="text" v-model='amount'>
                    </div>
                    <div class="fl" @click='selectCShow2=!selectCShow2'>
                        {{selectC2.name}}
                        <div v-show='selectCShow2'>
                            <div v-for="(item,index) in propertyList" :key="index" @click='__selectC(2,item)'>{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="btns clearfix">
                    <div class="fl" @click="__transferToSeedAddress">{{$t('confirm')}}</div>
                    <div class="fl">{{$t('cancel')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QRCode from "qrcodejs2";
export default {
    data() {
        return {
            amount: "",
            selectCShow1: false,
            selectCShow2: false,
            selectC1: "",
            selectC2: "",
            input1: '',
            req: {
                currPage: 1,
                pageSize: 100,
                userId: 0
            },
            fList: []
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            propertyList: state => state.Wallet.propertyList,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
        })
    },
    mounted() {
        this.selectC2 = this.propertyList[0];
        this.__friendsList();
    },
    methods: {
        ...mapMutations(["SET_TRANSFER_STATE","SET_LOADING_STATE"]),
        async __friendsList() {
            this.req.userId = this.userInfo.userId;
            const res = await this.api.friendsList(this.req);
            this.fList = res.data;
            this.selectC1 = this.fList[0];
            this.input1 = this.selectC1.nickname;
        },
        __selectC(type, item) {
            console.log(item)
            if (type == 1) {
                this.input1 = item.nickname;
                this.selectC1 = item;
            } else {
                this.selectC2 = item;
            }
        },
        //根据seed地址转账
        async __transferToSeedAddress() {
            //转账参数
            let params = {
                seed: this.seed,
                addressList: this.addressList,
                amount: this.amount,
                // toAddress: this.selectC1.collectionAddress,
                contractAddress: this.selectC2.address
            };
            if (this.input1 == this.selectC1.nickname) {
                params.toAddress = this.selectC1.collectionAddress
            } else {
                params.toAddress = this.input1;
            }
            this.SET_LOADING_STATE(true)
            const res = await this.api.transferToSeedAddress(params);
            if (res.msg != "Success") {
                this.$Toast(res.msg);
            } else {
                var messageType = {
                    remark: '',
                    currency: this.selectC2.name,
                    amount: this.amount,
                    toNickname: this.selectC1.nickname,
                };
                let params = {
                    body: JSON.stringify(messageType),
                    fromUserId: this.userInfo.userId,
                    messageType: 5,
                    time: 0,
                    toUserId: this.selectC1.friendId,
                    type: "chat"
                };
                this.api.sendMessage(params);
                this.$Toast("Success");
                this.SET_TRANSFER_STATE();
            }
            this.SET_LOADING_STATE(false)
        }
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
}

.box {
    width: 580px;
    height: 456px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png") no-repeat;
    background-size: 80% 80%;
    float: right;
    margin: 8px 8px;
}
.amount {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, 0);
    font-weight: 600;
    font-size: 20px;
}
.title {
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #e2e2e3;
    font-size: 14px;
    padding-left: 20px;
    font-weight: 600;
}
.setMoney {
    margin-top: 18px;
    text-align: center;
    font-weight: 600;
}
.inputAmount {
    margin-top: 66px;
    line-height: 38px;
    margin-left: 52px;
    > div:first-child {
        font-weight: 600;
    }
}
.inputs {
    margin-left: 12px;
    > div:first-child {
        input {
            height: 38px;
            outline: none;
            background: #efefef;
            border: 1px solid #d6d6d6;
            border-right: none;
            width: 266px;
            padding-left: 20px;
        }
    }
    > div:nth-child(2) {
        margin-top: 1px;
        height: 38px;
        line-height: 38px;
        background: #efefef;
        border: 1px solid #d6d6d6;
        border-left: none;
        width: 100px;
        position: relative;
        text-align: center;
        > div {
            position: absolute;
            top: 38px;
            z-index: 1;
            div {
                height: 38px;
                line-height: 38px;
                width: 100px;
                background: #efefef;
                border: 1px solid #d6d6d6;
                border-bottom: none;
            }
            div:first-child {
                border-top: none;
            }
            div:last-child {
                border: 1px solid #d6d6d6;
            }
        }
    }
}
.btns {
    position: absolute;
    bottom: 90px;
    left: 52px;
    div {
        width: 66px;
        height: 32px;
        line-height: 32px;
        text-align: center;
    }
    > div:first-child {
        background: #3f61a6;
        color: #fff;
    }
    > div:nth-child(2) {
        background: #dbdcdc;
        color: #333;
        margin-left: 12px;
    }
}
.add {
    background: #efefef url("./img/add@3x.png") 37px 5px no-repeat !important;
}
</style>