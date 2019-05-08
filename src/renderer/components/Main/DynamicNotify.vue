<template>
    <div class="requests mt16"
         v-scroll.end='__turnPages'>
        <div>
            <div class="title ">
                <p>{{$t('main.notification')}}</p>
                <p class="cp active "
                   @click="__setSnsAllRead">{{$t('main.read')}}</p>

            </div>

            <ul class="result">
                <li class=""
                    v-for="(item,index) in list"
                    :key="index"
                    :class="{'unread':!item.isRead}"
                    @click="__setSnsRead(item)">
                    <div class="">
                        <div class="img">
                            <Avatar :src="item.avatar" />
                        </div>
                        <div class="info">
                            <p class="">{{item.userName}}</p>
                            <p class="">{{item.type| text(texts)}}</p>
                        </div>

                        <span>{{item.time |date}}</span>
                    </div>

                </li>

            </ul>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'

export default {
    data() {
        return {
            list: [],
            requestCompleted: false,
            totalPage: 0,
            routerName: ''
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        texts() {
            return [
                this.$t('main.state'),
                this.$t('main.state1'),
                this.$t('main.state2'),
                this.$t('main.state3'),
                this.$t('main.state4'),
                this.$t('main.state5')
            ]
        }
    },
    filters: {
        date(value) {
            return format(new Date(value), 'yyyy-MM-dd')
        },
        text(value, arr) {
            switch (value) {
                case 0:
                    return arr[0]
                    break
                case 1:
                    return arr[1]
                    break
                case 2:
                    return arr[2]
                    break
                case 3:
                    return arr[3]
                    break
                case 4:
                    return arr[4]
                    break
                case 5:
                    return arr[5]
                    break
            }
            //  0=评论动态、1=回复评论、2=回复了回复、3=打赏了动态、4=@了用户、5=点赞
        }
    },
    methods: {
        ...mapActions(['SET_BADGE_COUNT']),

        async __setSnsAllRead() {
            let list = this.list.map(item => {
                return {
                    id: item.id,
                    type: item.type
                }
            })
            let req = {
                list,
                userId: this.userInfo.userId
            }

            const res = await this.api.snsRead(req)
            if (res.code === 0) {
                this.list.forEach(item => {
                    this.$set(item, 'isRead', true)
                })
            }
            this.SET_BADGE_COUNT()
        },
        async __setSnsRead(item) {
            let req = {
                list: [
                    {
                        id: item.id,
                        type: item.type
                    }
                ],
                userId: this.userInfo.userId
            }

            const res = await this.api.snsRead(req)
            if (res.code === 0) this.$set(item, 'isRead', true)
            this.SET_BADGE_COUNT()
        },
        async __getDatas(currentPage = 1, pageSize = 50) {
            this.requestCompleted = false
            let req = {
                userId: this.userInfo.userId,
                currentPage,
                pageSize
            }
            const res = await this.api.snsInfromlist(req)
            if (res.code === 0) {
                let tempList = res.data.list
                this.list = this.list.concat(tempList)
                this.requestCompleted = true
                this.currentPage = res.data.currentPage
                this.totalPage = res.data.totalPage
            }
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
        this.$bus.on('turnPages' + this.routeName, this.__turnPages)
    },
    beforeDestroy() {
        this.$bus.off('turnPages' + this.routeName, this.__turnPages)
    }
}
</script>

<style lang='scss' scoped>
.requests {
    // padding: 14px 0;
    width: 100%;
    background: #ffffff;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;
        height: 40px;
        border-bottom: 1px solid #dbdcdc;
        .active {
            color: #3f61a6;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .result {
        overflow: auto;
        .img {
            position: relative;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
            img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                max-width: 100%;
                max-height: 100%;
            }
        }
        > li {
            font-size: 12px;
            padding: 5px 20px;
            display: flex;
            border-bottom: 1px solid #dfdfe0;
            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .info {
                    flex-grow: 1;
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .unread {
            background: #eef2f9;
        }
    }
}
</style>
