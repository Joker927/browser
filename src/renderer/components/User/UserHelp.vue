<template>
    <div class="content mt16">

        <div class="title ">
            <p>{{$t('user.help')}}</p>
        </div>

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
}
</style>
