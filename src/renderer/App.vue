<template>
    <div id="app"
         @click="__cancel">
        <TheTab></TheTab>
        <TheNav></TheNav>
        <div class="container"
             v-show='homeShow'>
            <router-view></router-view>
        </div>

    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TheTab from '@/components/TheTab'
import TheNav from '@/components/TheNav'

export default {
    name: 'angel_explore',
    components: { TheNav, TheTab },
    computed: {
        ...mapState({
            homeShow: state => state.Tabs.homeShow
        })
    },
    methods: {
        ...mapMutations(['GET_USER_INFO', 'SET_MENU_STATE']),
        __cancel() {
            let className = event.target.className
            if (typeof className !== 'string') return
            if (className.indexOf('NAV_MENU') === -1) this.SET_MENU_STATE(null)
        }
    },
    created() {
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
    background-color: #fff;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-thumb {
    background: #999;
}
#app {
    /* position: relative; */
    width: 100%;
    height: 100%;
}
.line {
    border-bottom: 1px solid #dbdcdc;
}
.cp {
    cursor: pointer;
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
.container {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    /* overflow: hidden; */
}
.fl {
    float: left;
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
