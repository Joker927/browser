<template>
    <div class="shade">
        <div class="contain">
            <div class="img"></div>
            <div>-{{transferInfo.msg.amount}}{{transferInfo.msg.currency}}</div>
            <div>{{$t('webim.SuccessfulTrade')}}</div>
        </div>
        <div>
            <div class="exit" @click="__exit"></div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["transferInfo"],
    data() {
        return {};
    },
    mounted() {
        console.log(this.transferInfo);
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        __exit() {
            this.$emit("changeStatus", false);
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
.exit {
    width: 26px;
    height: 26px;
    background: url(./img/redPocket_cancel@3x.png);
    background-size: 100%;
    margin: 6px auto 0;
}
.contain {
    width: 90%;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 6px;
    position: relative;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    .img{
        width: 42px;
        height: 42px;
        background: url(./img/pay_detail_success@3x.png);
        background-size: 100% 100%;
        margin: 10px auto;
    }
}
</style>


