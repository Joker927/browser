<template>
    <div class="mask">
        <div class="box">
            <div class="title">{{$t('wallet.topup')}}
                <span class="exit" @click='SET_CNY_STATE'></span>
            </div>

            <div class="contain clearfix">
                <div class="clearfix">
                    <div class="fl">{{$t('wallet.orderNum')}}</div>
                    <div class="fl">{{CNYInfo.orderNo}}</div>
                </div>
                <div class="clearfix">
                    <div class="fl">{{$t('wallet.rate')}}</div>
                    <div class="fl">{{CNYInfo.rate}}</div>
                </div>
                <div class="clearfix">
                    <div class="fl">{{$t('wallet.payTotal')}}</div>
                    <div class="fl">{{CNYInfo.payTotal}}</div>
                </div>
                <div class="code">
                    <div id="qrcode" ref="qrcode"></div>
                </div>
                <div class="explain">
                    {{$t('wallet.explain')}}
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
        return {};
    },
    computed: {
        ...mapState({
            CNYInfo: state => state.Wallet.CNYInfo
        })
    },
    mounted() {
        let qrcode = new QRCode(document.getElementById("qrcode"), {
            text: this.CNYInfo.codeUrl,
            width: 168,
            height: 168,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },
    methods: {
        ...mapMutations(["SET_CNY_STATE"])
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 400px;
    height: 550px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}

.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

.contain {
    height: 500px;
    position: relative;
    > div:not(.code) {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dfdfe0;
        > div:first-child {
            width: 20%;
            text-align: center;
        }
    }
}
.code {
    margin: 30px 117px;
}
.explain{
    position: absolute;
    bottom: 120px;
    text-align: center;
    width: 100%;
    border-bottom: none !important;
}
</style>