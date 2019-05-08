<template>
    <div class="contain">
        <div class="title clearfix">
            {{$t('wallet.currencyDetail')}}
            <span class="fr" @click="__jump('/myWallet')">{{$t('wallet.back')}}</span>
        </div>

        <div>
            <table>
                <thead>
                    <tr class="head">
                        <td>{{$t('wallet.td6')}}</td>
                        <td>{{$t('wallet.td4')}}</td>
                        <td>{{$t('wallet.money')}}</td>
                        <td>{{$t('wallet.td5')}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" :key="index" class="body" @click="__showInfo(item)">
                        <td style="max-width:200px;padding:5px;">{{item.fromAddress}}</td>
                        <td>{{item.timestamp}}</td>
                        <td>{{item.types}}{{item.value}}</td>
                        <td>{{item.validity}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            list: []
        };
    },
    components: {},
    computed: {
        ...mapState({
            addressList: state => state.UserInfo.addressList
        })
    },
    mounted() {
        this.__getRechargeRecord();
    },
    methods: {
        ...mapMutations(["SET_DEAL_STATE","SET_LOADING_STATE"]),
        __jump(w) {
            this.$router.push(w);
        },
        __showInfo(item) {
            this.SET_DEAL_STATE(item);
        },
        getTime(timestamp) {
            var time = new Date(timestamp*1000);
            var ye = time.getFullYear();
            var mn = time.getMonth() + 1;
            var da = time.getDate();
            var h = time.getHours();
            var m = time.getMinutes();
            var s = time.getSeconds();
            mn = mn < 10 ? "0" + mn : mn;
            da = da < 10 ? "0" + da : da;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            return ye + "-" + mn + "-" + da + " " + h + ":" + m + ":" + s;
        },
        async __getRechargeRecord() {
            this.SET_LOADING_STATE(true);
            let params = {
                addressList: this.addressList,
                contractAddressList: [this.$route.params.currency]
            };
            const res = await this.api.seedGetTransferList(params);
            res.data.forEach(val => {
                val.timestamp = this.getTime(val.timestamp);
                val.name = this.$route.params.name;
                if (val.isAccept) {
                    val.types = '+';
                } else {
                    val.types = '-';
                }
                switch (val.validity) {
                    case 0:
                        val.validity = "等待确认";
                        break;
                    case 1:
                        val.validity = "已确认";
                        break;
                    case -1:
                        val.validity = "验证失败";
                        break;
                }
            });
            this.SET_LOADING_STATE(false);
            this.list = res.data;
        }
    },
    watch: {},
    created() {}
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
    }
    span {
        color: #3f61a6;
        font-size: 14px;
    }
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}
.head {
    td {
        width: 16%;
        text-align: center;
        height: 40px;
        background: #f7f7f7;
        border: 1px solid #dfdfe0;
    }
}
.body {
    border: 1px solid #dfdfe0;
    text-align: center;
    td {
        border: 1px solid #dfdfe0;
        word-wrap: break-word;
    }
}
</style>
