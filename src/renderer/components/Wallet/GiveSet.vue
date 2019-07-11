<template>
    <div class="contain">
        <div class="title">
            {{$t('wallet.rewardList')}}
        </div>
        <div class="opt">
            <div v-for="(item,index) in opt" :key="index" :class="{active:optAc==index}" @click="__cutOpt(index)">{{item}}</div>
        </div>
        <div class="list">
            <div v-for="(item,index) in list" :key="index" class="clearfix">
                <div class="fl">{{item.rewardTime}}</div>
                <div class="fl" v-if="optAc==0">{{item.userName}}{{$t('wallet.forYou')}}</div>
                <div class="fl" v-else>{{$t('wallet.youFor')}}{{item.authorName}}{{$t('main.reward')}}</div>
                <div class="fr">{{item.rewardAmount}}{{item.currency}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            opt: [this.$t('wallet.opt2'),this.$t('wallet.opt3')],
            optAc: 0,
            list: []
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    components: {},
    mounted() {
        this.__getList(0);
    },
    methods: {
        getTime(timestamp) {
            var time = new Date(timestamp);
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
        },
        //获取打赏记录列表,type==0,收到;type==1,发出
        async __getList(type) {
            let params = {
                currentPage: 0,
                pageSize: 100,
                type: type,
                userId: this.userInfo.userId
            };
            const res = await this.api.snsDynamicordList(params);
            res.data.list.forEach(val => {
                val.rewardTime = this.getTime(val.rewardTime);
            })
            this.list = res.data.list;
        },
        __cutOpt(index) {
            this.optAc = index;
            this.__getList(index);
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
}
.opt {
    height: 48px;
    line-height: 48px;
    display: flex;
    font-size: 16px;
    > div {
        width: 88px;
        text-align: center;
    }
    .active {
        border-bottom: 2px solid #3f61a6;
    }
}
.list {
    > div {
        border-bottom: 1px solid #eaeaea;
        > div {
            height: 56px;
            line-height: 56px;
            margin: 0 30px 0 15px;
        }
    }
}
</style>
