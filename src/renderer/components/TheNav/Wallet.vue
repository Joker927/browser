<template>
    <div class="contain">
        <div @click="__jump('/myWallet')">{{$t('nav.wallet')}}</div>
        <div @click="__jump('/personalWorks')">{{$t('nav.personalWorks')}}</div>
        <div @click="__jump('/giveSet')">{{$t('nav.giveSet')}}</div>
        <div @click="__jump('/bill')">{{$t('nav.bill')}}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            token: state => state.UserInfo.token
        })
    },
    methods: {
        __jump(w) {
            if (!this.token && w != '/login') return
            this.$router.push(w)
        }
    },
    watch: {},
    created() {}
}
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
