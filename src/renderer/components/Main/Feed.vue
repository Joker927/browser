<template>
    <div ref="FeedWrap"
         class="feedWrap">
        <FeedTab v-if="$route.name==='feed'"
                 @refresh='__publish'></FeedTab>
        <div>
            <FeedNews v-for="(item,index) in list"
                      @refresh='__refresh'
                      @showMenu='__showMenu(index)'
                      :key="index"
                      :index='index'
                      :item='item'></FeedNews>
        </div>
        <div class="more cp"
             @click="__turnPages"><span class="icon"
                  :class="{'ing':!requestCompleted}"></span>
            <span v-if="!isLoading">{{$t('main.refresh')}}</span>
            <span v-if="isLoading">{{$t('main.success')}}</span>
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FeedTab from './FeedTab'
import FeedNews from './FeedNews'
import { fail } from 'assert'
import { clearTimeout } from 'timers'

export default {
    data() {
        return {
            list: [],
            requestCompleted: false,
            isLoading: false
        }
    },
    components: { FeedTab, FeedNews },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        ...mapMutations(['SET_FEED_MENU_STATE', 'SET_LOADING_STATE']),
        async __getDatas(currentPage = 1, pageSize = 5) {
            this.requestCompleted = false
            let req = {
                currentPage,
                pageSize
            }
            let res = {}
            if (this.$route.name === 'feed') {
                req.userId = this.userInfo.userId
                res = await this.api.snsList(req)
            } else {
                req.userId = this.$route.query.id
                res = await this.api.snsIndexlist(req)
            }

            if (res.code === 0) {
                let tempList = res.data.list
                this.list = this.list.concat(tempList)

                setTimeout(() => {
                    this.requestCompleted = true
                    this.isLoading = true
                    setTimeout(() => {
                        this.isLoading = false
                    }, 2000)
                }, 1000)
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.totalPage
            } else {
                if (!this.timer) {
                    this.timer = setTimeout(() => {
                        this.requestCompleted = true
                        this.isLoading = false
                        clearTimeout(this.timer)
                        this.timer = null
                    }, 2000)
                }
            }
        },
        __publish() {
            this.list = []
            this.__getDatas()
        },
        __refresh(id) {
            this.showMenuCount = null
            this.list = this.list.filter(item => item.dynamicId !== id)
        },
        __showMenu(index) {
            this.SET_FEED_MENU_STATE(index)
        },
        __turnPages() {
            if (this.requestCompleted) {
                if (this.currentPage !== this.totalPage) {
                    this.currentPage++
                    this.__getDatas(this.currentPage)
                }
            }
        }
    },
    watch: {
        $route: {
            handler(oldValue, newValue) {
                let oldName = oldName && oldValue.name
                let newName = newValue && newValue.name
                if (oldName !== newName) this.list = []
                this.__getDatas()
            },
            immediate: true
        }
    },
    created() {
        this.routeName = this.$route.name
        this.$bus.on('turnPages' + this.routeName, this.__turnPages)
        this.$bus.on('refresh' + this.routeName, this.__publish)
    },
    beforeDestroy() {
        this.$bus.off('turnPages' + this.routeName, this.__turnPages)
        this.$bus.off('refresh' + this.routeName, this.__publish)
    }
}
</script>

<style lang='scss' scoped>
.more {
    position: fixed;
    bottom: 20px;
    left: 36%;
    background: #fff;
    padding: 4px 8px;
    font-weight: 600;
    color: #3f61a6;
    border-radius: 10px;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    > .icon {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        background: url('./img/refresh.png') no-repeat;
        background-size: 20px 20px;
    }
}
.ing {
    animation: circle 1s infinite linear; /*匀速 循环*/
}

@keyframes circle {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
