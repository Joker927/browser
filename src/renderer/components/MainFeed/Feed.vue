<template>
    <div>
        <Tab v-if="$route.name==='feed'"></Tab>
        <div>
            <NewsFeed v-for="(item,index) in list"
                      :key="index"
                      :item='item'></NewsFeed>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import Tab from './Tab'
import NewsFeed from './NewsFeed'
export default {
    data() {
        return {
            list: []
        }
    },
    components: { Tab, NewsFeed },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        async __getDatas() {
            let req = {
                currentPage: 1,
                pageSize: 20,
                userId: this.userInfo.userId
            }
            const res = await this.api.snsIndexlist(req)
            if (res.code === 0) {
                this.list = res.data.list
            }
            console.log(res, 'snsIndexlist')
        }
    },
    created() {
        this.__getDatas()
    }
}
</script>

<style lang='scss' scoped>
</style>
