<template>
    <div class="cloudWrapper">
        <div class="l">
            <Title :type='type'></Title>
            <section v-if="type==0">
                <CloudBuy></CloudBuy>
                <div class="tips">
                    <p>{{$t('cloud.cloudTips[0]')}}</p>
                    <p>{{$t('cloud.cloudTips[1]')}}</p>
                </div>
            </section>
            <section v-if="type==1">
                <CloudSell></CloudSell>
            </section>

            <section>
                <CloudRecords></CloudRecords>
                <div class="tips">
                    <p>{{$t('cloud.cloudTips[2]')}}</p>
                    <p>{{$t('cloud.cloudTips[3]')}}</p>
                    <p>{{$t('cloud.cloudTips[4]')}}</p>
                </div>
            </section>
        </div>
        <div class="r">
            <UserInfo></UserInfo>
        </div>

    </div>
</template>

<script>
import Title from '@/components/Cloud/Title'
import Progress from '@/components/Cloud/Progress'
import AutoSelect from '@/components/Cloud/AutoSelect'
import CloudBuy from '@/components/Cloud/CloudBuy'
import CloudSell from '@/components/Cloud/CloudSell'
import CloudRecords from '@/components/Cloud/CloudRecords'
import UserInfo from '@/components/Cloud/UserInfo'
export default {
    data() {
        return {
            type: null
        }
    },
    components: {
        Title,
        Progress,
        AutoSelect,
        CloudBuy,
        CloudSell,
        CloudRecords,
        UserInfo
    },
    computed: {},
    methods: {},
    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'cloud') {
                    this.type = this.$route.params.type
                }
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style  lang='scss' scoped>
.cloudWrapper {
    padding: 0 10px 0 20px;
    width: 75%;
    background: #fff;
    display: flex;
    .l {
        //  width: 600px
        flex-grow: 1;
        padding-right: 20px;
        max-width: 635px;
        > section {
            margin-bottom: 50px;
        }
        .tips {
            margin: 20px 0;
            font-size: 12px;
            color: #888888;
        }
    }
    .r {
        width: 210px;
    }
}
</style>
