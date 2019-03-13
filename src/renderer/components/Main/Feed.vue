<template>
    <div>
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

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FeedTab from './FeedTab'
import FeedNews from './FeedNews'

export default {
    data() {
        return {
            list: []
        }
    },
    components: { FeedTab, FeedNews },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        ...mapMutations(['SET_FEED_MENU_STATE']),
        async __getDatas(currentPage = 1, pageSize = 5) {
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
                this.requestCompleted = true
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.totalPage
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
        console.log(this.$route.name)
        this.$bus.on('turnPages' + this.routeName, this.__turnPages)
    },
    beforeDestroy() {
        this.$bus.off('turnPages' + this.routeName, this.__turnPages)
    }
}
</script>

<style lang='scss' scoped>
</style>
