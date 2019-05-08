<template>
    <div class="mask">
        <div class="box">
            <div class="title">{{$t('wallet.dealInfo')}}
                <span class="exit" @click='__out'></span>
            </div>

            <div class="status">{{dealInfo.validity}}</div>
            <div class="amount">{{dealInfo.types}}{{dealInfo.value}}{{dealInfo.name}}</div>

            <div class="contain">
                <div>
                    <div>发款方：</div>
                    <div>{{dealInfo.fromAddress}}</div>
                </div>
                <div>
                    <div>交易号：</div>
                    <div>{{dealInfo.index}}</div>
                </div>
                <div>
                    <div>接收人地址：</div>
                    <div>{{dealInfo.toAddress}}</div>
                </div>
                <div>
                    <div>交易时间：</div>
                    <div>{{dealInfo.timestamp}}</div>
                </div>
            </div>
            <div class="bts clearfix">
                <div class="bt fr" @click="__out">
                    {{$t('confirm')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            status: ""
        };
    },
    computed: {
        ...mapState({
            dealInfo: state => state.Wallet.dealInfo
        })
    },
    mounted() {},
    methods: {
        ...mapMutations(["SET_DEAL_STATE"]),
        __out() {
            this.SET_DEAL_STATE();
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
    width: 600px;
    height: 541px;
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
.status {
    text-align: center;
    margin-top: 34px;
}
.amount {
    color: #3f61a6;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
}
.contain {
    width: 90%;
    margin: 0 auto;
    word-wrap: break-word;
    margin-top: 30px;
    border-top: 1px solid #eaeaea;
    > div {
        > div:nth-of-type(1) {
            margin-top: 14px;
        }
        > div:nth-of-type(2) {
            margin-top: 14px;
        }
    }
}
.bts {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #eaeaea;
    .bt {
        color: #fff;
        background: #3f61a6;
        height: 26px;
        line-height: 26px;
        width: 60px;
        text-align: center;
        margin: 12px 20px;
    }
}
</style>