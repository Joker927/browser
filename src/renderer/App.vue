<template>
    <div id="app"
         @click="__cancel">
        <TheTab></TheTab>
        <TheNav></TheNav>
        <div class="container"
             v-show='homeShow'>
            <router-view></router-view>
            <Loading></Loading>
        </div>
        <ImForward v-if="forwardShow"></ImForward>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TheTab from '@/components/TheTab'
import TheNav from '@/components/TheNav'
import Loading from '@/components/Loading'
import ImForward from '@/components/WebIM/Forward'
export default {
    name: 'angel_explore',
    components: { TheNav, TheTab, Loading, ImForward },
    computed: {
        ...mapState({
            homeShow: state => state.Tabs.homeShow,
            forwardShow: state => state.WebImQueue.forwardShow
        })
    },
    methods: {
        ...mapMutations([
            'REFRESH_USER_INFO',
            'GET_USER_INFO',
            'SET_NAV_MENU_STATE',
            'SET_FEED_MENU_STATE',
            'SET_FEED_ACCESS_MENU_STATE',
            'SET_EMOJI_STATE',
            'GET_NODES'
        ]),
        __cancel() {
            let className = event.target.className
            // console.log(className, 'className')
            if (typeof className !== 'string') return
            if (className.indexOf('NAV_MENU') === -1)
                this.SET_NAV_MENU_STATE(null)
            if (className.indexOf('FEED_MENU') === -1)
                this.SET_FEED_MENU_STATE(null)
            if (className.indexOf('ACCESS_MENU') === -1)
                this.SET_FEED_ACCESS_MENU_STATE(false)
            if (
                className.indexOf('EMOJI_MENU') === -1 &&
                className.indexOf('emoji') === -1 &&
                event.target.parentNode.className.indexOf('emoji') === -1
            )
                this.SET_EMOJI_STATE(false)
        }
    },
    created() {
        // this.api
        //     .tokenLogin({ token: '7efb47676af340aaa9fb904daaf04633' })
        //     .then(res => {
        //         localStorage.setItem(
        //             'TOKEN',
        //             '7efb47676af340aaa9fb904daaf04633'
        //         )
        //         this.REFRESH_USER_INFO(res.data.userInfo)
        //     })
        this.GET_NODES()

        this.GET_USER_INFO()
    }
}
</script>

<style>
/* CSS */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}
html {
    height: 100%;
    background: #fff;
}
img {
    /* background: #000; */
}
body {
    height: 100%;
    font-family: PingFangSC-Light, 'helvetica neue', 'hiragino sans gb', arial,
        'microsoft yahei ui', 'microsoft yahei', simsun, sans-serif;
    font-size: 14px;
}
::-webkit-scrollbar-track-piece {
    background-color: transparent;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-thumb {
    background: rgba(153, 153, 153, 0.24);
    border-radius: 10px;
    border: 1px solid #ffffff;
}
#app {
    /* position: relative; */
    width: 100%;
    height: 100%;
}
.highlight {
    color: #3f61a6;
    text-decoration: none;
    font-weight: 600;
}
.line {
    border-bottom: 1px solid #dbdcdc;
}
.cp {
    cursor: pointer;
    user-select: none;
}
.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.pd40 {
    padding-bottom: 40px;
}
.mt16 {
    margin-top: 16px;
}
.h100 {
    height: 100%;
}
.container {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    overflow: hidden;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.clearfix:after,
.clearfix:before {
    content: '';
    display: block;
    height: 0;
    overflow: hidden;
}
.clearfix:after {
    clear: both;
}
.repost_mail {
    padding-left: 10px;
    padding-top: 10px;
    border-left: 2px solid #999999;
    color: #999999;
}

.w-e-toolbar .w-e-droplist {
    /* bottom: 30px;
    top: inherit; */
}
</style>
