<template>
    <div class="contain">
        <div @click="__jump('/myWallet')">{{$t('nav.wallet')}}</div>
        <div @click="__go(1)">{{$t('nav.moneyCode')}}</div>
        <div @click="__go(2)">{{$t('webim.transfer')}}</div>
        <div @click="__jump('/personalWorks')">{{$t('nav.personalWorks')}}</div>
        <div @click="__jump('/giveSet')">{{$t('wallet.rewardList')}}</div>
        <div @click="__jump('/bill')" style="border-top: 1px solid #dbdcdc;">{{$t('nav.bill')}}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapState({
            token: state => state.UserInfo.token,
            MyMoneyCodeShow: state => state.Wallet.MyMoneyCodeShow,
            TransferShow: state => state.Wallet.TransferShow,
        })
    },
    methods: {
        ...mapMutations(["SET_MONEYCODE_STATE", "SET_TRANSFER_STATE"]),
        __jump(w) {
            if (!this.token && w != "/login") return;
            this.$router.push(w);
        },
        __go(type) {
            if (type == 1) {
                this.SET_MONEYCODE_STATE();
                if (this.TransferShow) this.SET_TRANSFER_STATE();
            } else {
                this.SET_TRANSFER_STATE();
                if (this.MyMoneyCodeShow) this.SET_MONEYCODE_STATE();
            }
        }
    },
    watch: {},
    created() {}
};
</script>

<style  scoped lang='scss'>
.contain {
    font-size: 14px;
    padding: 10px;
    width: 180px;
    border: 1px solid #dbdcdc;
    background: #ffffff;
    color: #535353;
    cursor: pointer;
    > div {
        height: 40px;
        line-height: 40px;
        width: 80%;
        margin-left: 10%;
    }
    > div:first-child,
    > div:nth-child(3) {
        border-bottom: 1px solid #dbdcdc;
    }
}
</style>
