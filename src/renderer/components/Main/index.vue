<template>
    <div class="h100">
        <RequestNotify></RequestNotify>
        <Toast></Toast>
        <Head></Head>
        <div class="mainContent">
            <div class="l">
                <router-view></router-view>
            </div>
            <div class="r">
                <Recommend></Recommend>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import RequestNotify from './RequestNotify'
import Head from './Head'
import Recommend from './Recommend'
import Toast from './Toast'

export default {
    data() {
        return {}
    },
    components: { RequestNotify, Head, Recommend,Toast },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    watch: {
        $route: {
            handler() {},
            immediate: true
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.mainContent {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    .l {
        width: 62.5%;
    }
    .l ::-webkit-scrollbar-thumb {
        background: rgba(153, 153, 153, 0.24);
        border-radius: 10px;
        border: 1px solid #ffffff;
        display: none;
    }
    .r {
        width: 37.5%;
    }
}
</style>
