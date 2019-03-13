<template>
    <div class="wallet">
        <router-view></router-view>
        <AddProperty v-if="addPropertyShow"></AddProperty>
        <CNYRecharge v-if="CNYRechargeShow"></CNYRecharge>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AddProperty from "@/components/Wallet/AddProperty";
import CNYRecharge from "@/components/Wallet/CNYRecharge";
export default {
    data() {
        return {};
    },
    components: { AddProperty, CNYRecharge },
    computed: {
        ...mapState({
            addPropertyShow: state => state.Wallet.addPropertyShow,
            CNYRechargeShow: state => state.Wallet.CNYRechargeShow,
        })
    },
    methods: {},
    watch: {},
    created() {}
};
</script>

<style  lang='scss' scoped>
.wallet {
    background: #fff;
    width: 660px;
    // height: 1000px;
}
</style>
