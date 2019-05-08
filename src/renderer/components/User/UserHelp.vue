<template>
    <div class="content mt16">

        <div class="title">
            <p>{{$t('user.help')}}</p>
        </div>
        <ul class="list">
            <li>
                <p>{{$t('user.helpAll[0][0]')}}</p>
                <div>{{$t('user.helpAll[0][1]')}}</div>
            </li>
            <li>
                <p>{{$t('user.helpAll[1][0]')}}</p>
                <div>{{$t('user.helpAll[1][1]')}}</div>
            </li>
            <li>
                <p>{{$t('user.helpAll[2][0]')}}</p>
                <div>{{$t('user.helpAll[2][1]')}}</div>

            </li>
            <li>
                <p>{{$t('user.helpAll[3][0]')}}</p>
                <div>{{$t('user.helpAll[3][1]')}}</div>
            </li>
            <li>
                <p>{{$t('user.helpAll[4][0]')}}</p>
                <div>{{$t('user.helpAll[4][1]')}}</div>
                <div>{{$t('user.helpAll[4][2]')}}</div>
            </li>
            <li>
                <p>{{$t('user.helpAll[5][0]')}}</p>
                <div>{{$t('user.helpAll[5][1]')}}</div>
            </li>
            <li>
                <p>{{$t('user.helpAll[6][0]')}}</p>
                <div>{{$t('user.helpAll[6][1]')}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'

export default {
    data() {
        return {
            list: [],
            routerName: ''
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    filters: {
        date(value) {
            return format(new Date(value), 'yyyy-MM-dd')
        }
    },
    methods: {},

    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'dynamic') {
                    this.__getDatas()
                }
            },
            immediate: true
        }
    },
    created() {
        this.routeName = this.$route.name
        console.log(this.$route.name)
    }
}
</script>

<style lang='scss' scoped>
.content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding-left: 30px;
    > .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #dbdcdc;
        .active {
            color: #3f61a6;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .list {
        li {
            padding: 10px 0;
            border-bottom: 1px solid #dbdcdc;
            > p {
                font-size: 14px;
                font-weight: bold;
                line-height: 26px;
            }
            div {
                line-height: 30px;
            }
        }
    }
}
</style>
