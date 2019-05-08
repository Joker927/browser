<template>
    <div class="userInfo">
        <div class="img avatar">
            <Avatar :src="userInfo.avatar"></Avatar>

        </div>
        <div>
            <p>{{$t('cloud.userTitle')}}</p>
        </div>
        <div>
            <p>{{$t('cloud.userInfo[0]')}} {{list.createSellCount}} {{$t('cloud.userInfo[1]')}} </p>
            <p>{{$t('cloud.userInfo[2]')}} {{list.sellCount}} {{$t('cloud.userInfo[1]')}}</p>
            <p>{{$t('cloud.price') + list.avgPrice}} GIT</p>
            <!-- <p>約 xxx mb 每 xxx 日</p> -->
        </div>
        <div class="img num">
            {{list.creditRate}}%
        </div>
        <div>
            <!-- <p>{{$t('cloud.userInfo[3]')}} 0 {{$t('cloud.userInfo[1]')}}</p> -->
            <p> {{$t('cloud.userInfo[4]')}}{{list.creditRate}}%</p>
        </div>
        <div>
            <p>{{$t('cloud.userInfo[5]')}}{{list.level}}</p>
            <div class="progressBar">
                <div class="progress"
                     :style="{width:list.expValue/list.expValueNext*100+'%'}"></div>
            </div>
            <div class="tips">
                {{$t('cloud.userInfo[6]')}}<br>{{$t('cloud.userInfo[7]')}}{{list.expValue}}/{{list.expValueNext}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            list: []
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        async __getInfo() {
            const res = await this.api.cloudInfo()
            this.list = res.data
        }
    },
    watch: {},
    created() {
        this.__getInfo()
        let routeName = this.$route.name

        this.$bus.on('refresh' + routeName, this.__getInfo)
    },
    beforeDestroy() {
        let routeName = this.$route.name

        this.$bus.off('refresh' + routeName, this.__getInfo)
    }
}
</script>

<style scoped lang='scss'>
.userInfo {
    width: 100%;
    // height: 660px;
    padding: 20px;
    background: #f7f7f7;
    border: 1px solid #e6e6e7;
    display: flex;
    text-align: center;
    flex-direction: column;
    font-weight: bold;
    > div {
        margin: 20px 0;
    }
    .img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        background: #eff0f0;
        line-height: 64px;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .num {
        margin-top: 20px;
        background: #3f61a6;
        font-size: 20px;
        color: #fff;
        line-height: 64px;
    }
    .progressBar {
        margin-top: 20px;
        position: relative;
        width: 100%;
        height: 12px;
        background: #b8b8b8;
        border-radius: 20px;
        overflow: hidden;
        .progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 20px;
            max-width: 100%;
            background: #3f61a6;
        }
    }
    .tips {
        margin-top: 10px;
        font-size: 12px;
        color: #888888;
        line-height: 1.5;
        font-weight: normal;
    }
}
</style>
