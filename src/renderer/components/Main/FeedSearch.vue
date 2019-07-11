<template>
    <div class="content mt16">
        <div class="searchWrap">
            <div class="search">
                <span class="searchIcon"
                      :class="{'focusIcon':focusIcon}"></span>
                <input type="text"
                       @focus="__foucus"
                       @blur="__blur"
                       @input="__inputing"
                       v-model="req.keyWord"
                       :placeholder="$t('search')">

            </div>
        </div>
        <ul class="tab">
            <li class="cp"
                :class="{'active':tabActive==0}"
                @click="__taggleTab(0)">{{$t('main.all')}}</li>
            <li class="cp"
                :class="{'active':tabActive==1}"
                @click="__taggleTab(1)">{{$t('main.dynamic')}}</li>
            <li class="cp"
                :class="{'active':tabActive==2}"
                @click="__taggleTab(2)">{{$t('main.user')}}</li>
        </ul>
        <div class="mt16"
             v-scroll.end='__turnPages'>
            <div>
                <div class="uesrInfo"
                     v-if="userList.length&&tabActive!==1">
                    <div class="title"
                         v-if="tabActive===0">{{$t('main.user')}}</div>
                    <FeedUserInfo v-for="(item,index) in userList"
                                  :key="index +'k'"
                                  :item='item'></FeedUserInfo>
                    <div class="bottomBtn"
                         v-if="tabActive===0"
                         @click="__taggleTab(2)">
                        <span class="more cp">{{$t('main.all')}}</span>
                    </div>
                </div>
                <div class="feed"
                     v-if="dynamicList.length&&tabActive!==2">
                    <FeedNews v-for="(item,index) in dynamicList"
                              :key="index"
                              :index='index'
                              :item='item'
                              @showMenu='__showMenu(index)'></FeedNews>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import FeedNews from './FeedNews'
import FeedUserInfo from './FeedUserInfo'

export default {
    props: {
        item: {},
        index: null
    },
    data() {
        return {
            tabActive: 0,
            focusIcon: false,
            dynamicList: [],
            userList: [],
            req: {
                currentPage: 1,
                keyWord: '',
                pageSize: 10
            }
        }
    },
    components: { FeedNews, FeedUserInfo },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    filters: {},
    methods: {
        ...mapMutations(['SET_FEED_MENU_STATE']),
        __showMenu(index) {
            this.SET_FEED_MENU_STATE(index)
        },
        __foucus() {
            this.focusIcon = true
        },
        __blur() {
            this.focusIcon = false
        },
        __inputing() {
            if (this.timer) return
            this.timer = setTimeout(() => {
                this.__getList()
            }, 300)
        },
        async __getList() {
            this.req.userId = this.userInfo.userId
            //
            let request = 'searchUserAndDynamic'
            switch (this.tabActive) {
                case 0:
                    request = 'searchUserAndDynamic'
                    break
                case 1:
                    request = 'searchDynamic'
                    break
                case 2:
                    request = 'searchUser'
                    break
            }
            const res = await this.api[request](this.req)
            if (res.code === 0) {
                switch (this.tabActive) {
                    case 0:
                        this.dynamicList = this.dynamicList.concat(
                            res.data.list
                        )
                        this.userList = res.data.userList

                        break
                    case 1:
                        this.dynamicList = this.dynamicList.concat(
                            res.data.list
                        )
                        this.userList = []
                        break
                    case 2:
                        this.userList = this.userList.concat(res.data.list)
                        this.dynamicList = []
                        break
                }
                this.requestCompleted = true
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.totalPage
            }

            console.log(res, 'searchFriendAndGroup')

            this.timer = null //重置输入框定时器状态
        },
        __taggleTab(index) {
            this.tabActive = index
        },
        __turnPages() {
            if (this.requestCompleted) {
                if (this.currentPage !== this.totalPage) {
                    this.req.currentPage++
                    this.__getList()
                }
            }
        }
    },
    watch: {
        tabActive: {
            handler() {
                this.req.currentPage = 1
                this.userList = this.dynamicList = []
                this.__getList()
            },
            immediate: true
        },
        $route: {
            handler() {
                let keyWord = this.$route.query && this.$route.query.q
                if (keyWord) {
                    this.req.keyWord = keyWord
                }
                this.req.currentPage = 1
                this.userList = this.dynamicList = []
                this.__getList()
            },
            immediate: true
        }
    },
    created() {
        this.routeName = this.$route.name

        this.$bus.on('turnPages' + this.routeName, this.__turnPages)
    },
    beforeDestroy() {
        this.$bus.off('turnPages' + this.routeName, this.__turnPages)
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    > .tab {
        display: flex;
        padding-left: 20px;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #dbdcdc;
        background: #e5e8ef;
        .active {
            color: #3f61a6;
            font-size: 14px;
            line-height: 38px;
            font-weight: bold;
            border-bottom: 2px solid #3f61a6;
        }
        > li {
            margin: 0 20px;
            padding: 0 5px;
        }
    }
    .searchWrap {
        width: 100%;
        overflow: hidden;

        background: #ffffff;
        .search {
            margin: 10px;
            position: relative;
            input {
                width: 100%;
                border-radius: 4px;
                height: 34px;
                line-height: 34px;
                border: 1px solid #efefe0;
                background: #f5f6f7;
                padding-left: 30px;
                outline: none;
            }
        }

        .searchIcon {
            display: block;
            width: 14px;
            height: 14px;
            background: url('./img/search-icon.png');
            background-size: 100% 100%;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
        }

        .focusIcon {
            //  left: calc(100% - 30px);
        }
    }
    .uesrInfo {
        background: #ffffff;

        .title {
            font-size: 16px;
            border-bottom: 1px solid #efefe0;
            padding: 10px;
        }
    }
    .bottomBtn {
        display: flex;
        height: 32px;
        font-size: 14px;
        justify-content: center;
        align-items: center;
        .more {
            color: #3f61a6;
            font-weight: bold;
        }
    }
}
</style>
