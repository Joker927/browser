<template>
    <div class="contain">
        <div class="title">
            {{$t('wallet.set')}}
        </div>
        <div class="contain">
            <div class="input">
                <span>{{$t('wallet.amount')}}:</span>
                <input type="text" :placeholder="$t('wallet.money')" v-model="inputNum" />
            </div>
            <div class="btns">
                <div class="fl" @click='__sure'>{{$t('confirm')}}</div>
                <div class="fl">{{$t('cancel')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            inputNum: ""
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    components: {},
    mounted() {
        // this.__getRewardInfo();
    },
    methods: {
        // async __getRewardInfo() {
        //     console.log(this.userInfo)
        //     const res = await this.api.ucGetRewardInfo(this.userInfo.userId);
        // },
        async __sure() {
            let params = {
                currency: "string",
                currentcyPath: "string",
                id: this.userInfo.userId,
                price: this.inputNum,
                userId: this.userInfo.userId
            };
            const res = await this.api.ucRewardConfig(params);
            this.$Toast(res.msg);
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
}
.input {
    margin-top: 80px;
    margin-left: 30px;
    span {
        color: #231815;
        font-weight: 600;
    }
    input {
        height: 30px;
        width: 376px;
        background: #efefef;
        outline: none;
        border: 1px solid #d6d6d6;
        padding-left: 10px;
        margin-left: 20px;
    }
}
.btns {
    margin: 50px;
    > div {
        width: 66px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
    }
    > div:first-child {
        background: #3f61a6;
        color: #fff;
    }
    > div:last-child {
        background: #dbdcdc;
        margin-left: 60px;
    }
}
</style>
