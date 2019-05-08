<template>
    <div class="tabWrap">
        <div class="logo"></div>
        <div class="tabsWrapper">
            <ul class="tabs">
                <li class="normal"
                    :class="{'active':homeShow}">
                    <span class="ellipsis"
                          @click="__showHomePage">{{$t('tab.home')}}</span>
                </li>
                <li class="normal tab"
                    :class="{'active':item.isShow}"
                    v-for="(item,index) in tabList"
                    :key="index"
                    @click='__showTab(index)'>
                    <span class="ellipsis">{{item.title}}</span>
                    <div class='delete'
                         @click.stop="__delete(index)"></div>
                </li>
                <li class="add cp"
                    @click="__add">
                    <span class="cp"></span>
                </li>
            </ul>
        </div>
        <Buttons></Buttons>
        <webview class='webview'
                 :src="item.url"
                 v-for="(item,index) in tabList"
                 :key="index"
                 v-show='item.isShow'></webview>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Buttons from './Buttons'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            homeShow: state => state.Tabs.homeShow,
            tabList: state => state.Tabs.tabs
        })
    },
    mounted() {},
    methods: {
        ...mapMutations([
            'ADD_TABS',
            'SET_TAB_SHOW',
            'SHOW_HOME',
            'DELETE_TABS'
        ]),
        __add() {
            var obj = {
                title: this.$t('nav.newTab'),
                url: '',
                isShow: true
            }
            this.ADD_TABS(obj)
        },
        __delete(idx) {
            this.DELETE_TABS(idx)
        },
        __showHomePage() {
            this.SHOW_HOME()
        },
        __showTab(idx) {
            this.SET_TAB_SHOW(idx)
        }
    },
    components: {
        Buttons
    }
}
</script>

<style lang="scss" scoped>
.tabWrap {
    position: relative;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    height: 34px;
    background: #3f61a6;
    -webkit-app-region: drag;
    .logo {
        align-self: center;
        margin: 0 10px;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-image: url('./img/head_logo@2x.png');
    }
    .tabsWrapper {
        flex-grow: 1;
    }

    .tabs {
        width: 100%;
        display: flex;
        margin-top: 4px;

        .tab:not(:first-child) {
            margin-left: -20px;
        }
        .add {
            height: 30px;
            display: flex;
            align-items: center;
            -webkit-app-region: no-drag;
            > span {
                width: 30px;
                height: 14px;
                background-size: 100% 100%;
                background-image: url('./img/add_default@3x.png');
            }
        }
        .add:hover {
            > span {
                background-image: url('./img/add_slide_pressed@3x.png');
            }
        }
        .normal {
            -webkit-app-region: no-drag;
            position: relative;
            flex-grow: 1;
            max-width: 190px;
            height: 30px;
            z-index: 1;
            cursor: pointer;
            > span {
                font-size: 12px;
                line-height: 30px;
                padding: 0 8px;
                width: calc(100% - 32px);
                height: 100%;
                display: block;
                background: #eeeeef;
                margin: 0 auto;
                user-select: none;
            }
            .delete {
                position: absolute;
                width: 16px;
                height: 16px;
                right: 16px;
                top: 7px;
                background: url('./img/delete_tab.png');
                background-size: 100% 100%;
            }
            &::after,
            &::before {
                position: absolute;
                top: 0;
                content: '';
            }
            &::before {
                left: 0;
                border-top: 17px solid transparent;
                border-bottom: 17px solid #eeeeef;
                border-left: 8px solid transparent;
                border-right: 8px solid #eeeeef;
            }
            &::after {
                right: 0;
                border-top: 17px solid transparent;
                border-bottom: 17px solid #eeeeef;
                border-left: 8px solid#eeeeef;
                border-right: 8px solid transparent;
            }
        }

        .active {
            z-index: 10;
            > span {
                background: #ffffff;
            }
            &::before {
                border-bottom: 17px solid #ffffff;
                border-right: 8px solid #ffffff;
            }
            &::after {
                border-bottom: 17px solid #ffffff;
                border-left: 8px solid#ffffff;
            }
        }
    }
}

.webview {
    position: fixed;
    top: 80px;
    width: 100%;
    height: calc(100% - 80px);
}
</style>
