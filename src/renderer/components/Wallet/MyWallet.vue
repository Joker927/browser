<template>
    <div class="contain">
        <div v-show='!rechargeShow'>
            <div class="title clearfix">
                <div class="fl">{{$t('wallet.wallet')}}</div>
                <div class="fr" @click='SET_ADDPROPERTY_STATE'>{{$t('wallet.add')}}</div>
            </div>
            <div class="list">
                <div v-for="(item,index) in propertyList" :key="index" @click="__goDetail(item)">
                    <img :src="item.logoUrl" v-if="item.logoUrl" class="fl">
                    <img src="./img/gitium@3x.png" v-else class="fl">
                    <span>{{item.name}}</span>
                    <div class="fr bt" @click.stop='__goRecharge(item)'>{{$t('wallet.gotopup')}}</div>
                    <div class="fr up">{{item.totalValue}}</div>
                </div>
            </div>
        </div>

        <div v-show='rechargeShow'>
            <div class="title clearfix">
                <div class="fl">{{$t('wallet.topup')}}</div>
                <div class="fr" @click="__jump('/Recharge')">{{$t('wallet.topuphistory')}}</div>
            </div>
            <div class="recharge">
                <div class="info clearfix">
                    <span>{{$t('wallet.site')}}</span>
                    <span>{{selectC1.address}}</span>
                </div>
                <div class="info clearfix">
                    <span>{{$t('wallet.rate')}}</span>
                    <span>1 {{selectC1.name}} = {{rate}}{{selectC2.name}}</span>
                </div>
                <div class="info clearfix">
                    <span>{{$t('wallet.up')}}</span>
                    <span>{{selectC1.up}}</span>
                </div>
                <div class="info clearfix">
                    <span>{{$t('wallet.down')}}</span>
                    <span>{{selectC1.down}}</span>
                </div>
                <div class="input clearfix">
                    <div>{{$t('wallet.pay')}}</div>
                    <div class="fl">
                        <input type="text" :placeholder="$t('wallet.placeholder')" v-model='input1' @input="__calcInput2Val">
                    </div>
                    <div class="fl" @click='selectCShow1=!selectCShow1'>
                        {{selectC1.name}}
                        <div v-show='selectCShow1'>
                            <div v-for="(item,index) in canRechargeCurrencyList" :key="index" @click='__selectC1(item)'>{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="input clearfix">
                    <div>{{$t('wallet.topup')}}</div>
                    <div class="fl">
                        <input type="text" :placeholder="$t('wallet.placeholder')" v-model='input2'>
                    </div>
                    <div class="fl" @click='selectCShow2=!selectCShow2'>
                        {{selectC2.name}}
                        <div v-show='selectCShow2'>
                            <div v-for="(item,index) in propertyList" :key="index" @click='__selectC2(item)'>{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="input clearfix">
                    <div>{{$t('wallet.checkoutAddress')}}</div>
                    <div class="fl">
                        <textarea :value='lastAddress'></textarea>
                    </div>
                </div>
                <div class="input clearfix">
                    <div>{{$t('wallet.paymentAddress')}}</div>
                    <div class="fl">
                        <textarea v-model="inputPaymentAddress"></textarea>
                    </div>
                </div>
                <div class="input clearfix">
                    <div>{{$t('wallet.contact')}}</div>
                    <div class="fl">
                        <input type="text" :placeholder="$t('wallet.placeholder')" v-model="inputTel">
                    </div>
                </div>
                <div class="sureBt" @click="__recharge">{{$t('confirm')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BScroll from "better-scroll";
export default {
    data() {
        return {
            addPropertyShow: false,
            rechargeShow: false,
            input1: "",
            selectCShow1: false,
            selectCShow2: false,
            input2: "",
            canRechargeCurrencyList: [], //可充值币种列表
            currencyList: [],
            selectC1: "", //选择支付币种
            selectC2: "", //选择支付币种
            inputPaymentAddress: "", //用户付款地址
            inputTel: "",
            url: "",
            rate: "", //汇率
            chargeCurrentGitInfo: '' //充值币种的git信息
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            seed: state => state.UserInfo.seed,
            addressList: state => state.UserInfo.addressList,
            lastAddress: state => state.UserInfo.lastAddress,
            propertyList: state => state.Wallet.propertyList
        })
    },
    mounted() {
        this.__getCanRechargeCurrencyList();
        this.selectC2 = this.propertyList[0];
        this.__getMuchCurrenty();
    },
    methods: {
        ...mapMutations([
            "SET_ADDPROPERTY_STATE",
            "SET_PROPERTY_LIST",
            "SET_PROPERTY_TOTAL",
            "SET_CNY_STATE",
            "SET_CNY_INFO"
        ]),
        __jump(w) {
            this.$router.push(w);
        },
        __goDetail(item) {
            this.$router.push({
                name: "currencyDetail",
                params: {
                    name: item.name,
                    currency: item.address
                }
            });
        },
        //获取可充值币种列表
        async __getCanRechargeCurrencyList() {
            const res = await this.api.getCanRechargeCurrencyList();
            this.canRechargeCurrencyList = res.data;
            this.selectC1 = res.data[0];
            this.__getCuurrercyList();
        },
        __goRecharge(item) {
            this.selectC2 = item;
            this.rechargeShow = true;
        },
        //获取币种列表
        async __getCuurrercyList() {
            const res = await this.api.getCuurrercyList();
            this.currencyList = res.data;
            this.__calcRate();
        },
        async __calcRate() {
            this.currencyList.forEach(val => {
                if (this.selectC1.symbol == val.symbol) {
                    this.chargeCurrentGitInfo = val;
                }
            })
            const res = await this.api.seedGetRechargeRate({
                srcCurrencies: [this.selectC2.address],
                destCurrency: this.chargeCurrentGitInfo.address
            });
            this.rate = 1/(res.data[this.selectC2.address] * Math.pow(10, this.selectC2.decimals-this.chargeCurrentGitInfo.decimals));
            this.__calcInput2Val();
        },
        __calcInput2Val() {
            this.input2 = this.input1 * this.rate;
        },
        __selectC1(item) {
            this.selectC1 = item;
            this.__calcRate();
        },
        __selectC2(item) {
            this.selectC2 = item;
            this.__calcRate();
        },
        //充值
        async __recharge() {
            let params = {
                addressList: this.addressList,
                userPayAddress: this.inputPaymentAddress,
                currency: this.selectC2.name,
                chargeValue: this.input2,
                value: this.input1,
                phone: this.inputTel,
                useCurrency: this.selectC1.name
            };
            const res = await this.api.seedRecharge(params);
            if (res.msg == "Success") {
                if (res.data.codeUrl) {
                    let CNYInfo = {
                        codeUrl: res.data.codeUrl,
                        orderNo: res.data.orderNo,
                        payTotal: this.input1,
                        rate: this.rate
                    };
                    this.SET_CNY_STATE();
                    this.SET_CNY_INFO(CNYInfo);
                } else {
                    this.$Toast(this.$t("wallet.toast"));
                    this.rechargeShow = false;
                    this.__getMuchCurrenty();
                }
            } else {
                if (res.msg) {
                    this.$Toast(res.msg);
                } else {
                    this.$Toast(res.message);
                }
            }
        },
        //获取多币种余额
        async __getMuchCurrenty() {
            let arr = [];
            this.propertyList.forEach(val => {
                arr.push(val.address);
            });
            let params = {
                contractAddressList: arr,
                addressList: this.addressList
            };
            const res = await this.api.getMuchCurrentySum(params);

            var arr1 = this.propertyList;
            var arr2 = [];
            Object.assign(arr2, arr1);
            arr2.forEach((val, index) => {
                res.data.forEach(subVal => {
                    if (val.address == subVal.address) {
                        val.totalValue = subVal.totalValue;
                    }
                });
            });
            this.SET_PROPERTY_LIST(arr2);
        }
    }
};
</script>

<style  scoped lang='scss'>
.contain {
    margin: 30px;
}
.title {
    color: #231815;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #dfdfe0;
    height: 60px;
    line-height: 60px;
    > div:last-child {
        color: #3f61a6;
        font-size: 14px;
        cursor: pointer;
    }
}
.list {
    > div {
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #dfdfe0;
        > span {
            margin-left: 16px;
        }
        .bt {
            width: 60px;
            height: 24px;
            line-height: 24px;
            background: #3f61a6;
            border-radius: 3px;
            color: #fff;
            margin-top: 28px;
            text-align: center;
            cursor: pointer;
        }
        .up {
            margin-right: 16px;
        }
        img {
            width: 36px;
            margin-top: 22px;
        }
    }
}
.recharge {
    padding-top: 20px;
    margin-left: 40px;
    .info {
        margin-top: 20px;
        > span:first-child {
            color: #3f61a6;
            font-weight: 600;
            display: inline-block;
            width: 20%;
            text-align: right;
            vertical-align: top;
        }
        > span:last-child {
            color: #231815;
            width: 75%;
            display: inline-block;
            word-wrap: break-word;
        }
    }
    .input {
        margin-top: 20px;
        > div:first-child {
            font-weight: 600;
            color: #231815;
        }
        > div:nth-child(2) {
            margin-top: 10px;
            input {
                height: 38px;
                outline: none;
                background: #efefef;
                border: 1px solid #d6d6d6;
                border-right: none;
                width: 300px;
                padding-left: 20px;
            }
            textarea {
                width: 500px;
                height: 54px;
                resize: none;
                outline: none;
                background: #efefef;
                border: 1px solid #d6d6d6;
            }
        }
        > div:nth-child(3) {
            margin-top: 10px;
            height: 38px;
            line-height: 38px;
            background: #efefef;
            border: 1px solid #d6d6d6;
            border-left: none;
            width: 200px;
            position: relative;
            text-align: center;
            > div {
                position: absolute;
                top: 38px;
                z-index: 1;
                div {
                    height: 38px;
                    line-height: 38px;
                    width: 200px;
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
}
.sureBt {
    width: 500px;
    height: 38px;
    line-height: 38px;
    color: #fff;
    background: #3f61a6;
    margin-top: 20px;
    text-align: center;
}
</style>
