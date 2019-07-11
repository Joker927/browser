<template>
    <div class="mask">
        <div class="box" v-show="!setAmountShow">
            <div class="title">
                <span class="exit" @click="SET_MONEYCODE_STATE"></span>
            </div>
            <div class="amount" v-show="amount">{{amount}}{{selectC.name}}</div>
            <div class="code" id="qrcode"></div>
            <div style="word-wrap: break-word;text-align:center;width:96%;margin:10px auto 0;">{{userInfo.collectionAddress}}</div>
            <div class="setMoney" @click="setAmountShow=true">{{$t('webim.setAmount')}}</div>

            <div class="copyAddress clearfix">
                <div @click="__download">{{$t('webim.downloadQRCode')}}</div>
                <div @click="__copyAddress">{{$t('webim.copyAddress')}}</div>
            </div>
        </div>

        <div class="box" v-show="setAmountShow">
            <div>
                <span class="exit" @click="SET_MONEYCODE_STATE"></span>
            </div>
            <div class="setMoney" style="margin-top:58px;">
                {{$t('webim.setAmount')}}
            </div>
            <div class="inputAmount clearfix">
                <div class="fl">{{$t('webim.setAmount')}}:</div>
                <div class="inputs fl clearfix">
                    <div class="fl">
                        <input type="text" :placeholder="$t('wallet.placeholder')" v-model='amount'>
                    </div>
                    <div class="fl" @click='selectCShow=!selectCShow'>
                        {{selectC.name}}
                        <div v-show='selectCShow'>
                            <div v-for="(item,index) in propertyList" :key="index" @click='__selectC(item)'>{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="btns clearfix">
                    <div class="fl" @click="__sure">{{$t('confirm')}}</div>
                    <div class="fl" @click="setAmountShow=false">{{$t('cancel')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QRCode from "qrcodejs2";
import FileSaver from "file-saver";
export default {
    data() {
        return {
            qrcode: "",
            setAmountShow: false,
            amount: "",
            selectCShow: false,
            selectC: ""
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            propertyList: state => state.Wallet.propertyList
        })
    },
    mounted() {
        this.selectC = this.propertyList[0];
        this.__code();
    },
    methods: {
        ...mapMutations(["SET_MONEYCODE_STATE"]),
        __sure() {
            if (this.amount) {
                this.__code();
            } else {
                this.$Toast("金额不能为空");
            }
        },
        __code() {
            this.setAmountShow = false;
            var obj = {
                typeQr: 2,
                userId: this.userInfo.userId,
                nickname: this.userInfo.nickname,
                avatar: this.userInfo.avatar,
                collectionAddress: this.userInfo.collectionAddress,
                imAccount: this.userInfo.imAccount,
                currencyOwner: 1
            };
            if (this.amount) {
                obj = {
                    typeQr: 2,
                    userId: this.userInfo.userId,
                    nickname: this.userInfo.nickname,
                    avatar: this.userInfo.avatar,
                    collectionAddress: this.userInfo.collectionAddress,
                    imAccount: this.userInfo.imAccount,
                    amount: this.amount,
                    currencyOwner: 2,
                    currencyName: this.selectC.name,
                    currencyAddress: this.selectC.address
                };
                this.qrcode.clear();
                this.qrcode.makeCode(JSON.stringify(obj));
            } else {
                this.qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: JSON.stringify(obj),
                    width: 300,
                    height: 300,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        },
        __selectC(item) {
            this.selectC = item;
        },
        transformArrayBufferToBase64(buffer) {
            var binary = "";
            var bytes = new Uint8Array(buffer);
            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        },
        __download() {
            FileSaver.saveAs(document.querySelector("#qrcode img").src, this.userInfo.nickname + '的收款码');
        },
        __copyAddress() {
            const { clipboard } = require('electron')
            clipboard.writeText(this.userInfo.collectionAddress);
            this.$Toast('复制成功');
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
    height: 496px;
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
.code {
    margin: 66px 140px 0;
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
            width: 196px;
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
.copyAddress {
    font-weight: 600;
    margin-left: 170px;
    margin-top: 18px;
    > div {
        float: left;
        width: 120px;
        text-align: center;
    }
}
</style>