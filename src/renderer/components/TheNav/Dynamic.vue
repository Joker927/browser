<template>
    <div class="requests">

        <div class="title NAV_MENU">
            <p>{{$t('nav.notice')}}</p>
            <p class="cp active NAV_MENU"
               @click="__setSnsAllRead">{{$t('nav.allaremarkedasread')}}</p>

        </div>
        <div class="result"
             v-scroll.end='__turnPages'>
            <ul>
                <li class="NAV_MENU"
                    v-for="(item,index) in list"
                    :key="index"
                    :class="{'unread':!item.isRead}"
                    @click="__setSnsRead(item)">
                    <div class="NAV_MENU">
                        <div class="img NAV_MENU">

                            <Avatar class="NAV_MENU"
                                    :src="item.avatar" />
                        </div>
                        <div class="info">
                            <p class="NAV_MENU">{{item.userName}}</p>
                            <p class="NAV_MENU">{{item.type| text(texts)}}</p>
                        </div>

                        <span>{{item.time | date}}</span>
                    </div>

                </li>

            </ul>
        </div>

        <div class="bottomBtn NAV_MENU">
            <router-link tag="span"
                         class="more cp"
                         :to="{name:'dynamic'}">{{$t('nav.all')}}</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
export default {
    data() {
        return {
            type: 0,
            list: []
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        texts() {
            return [
                this.$t('nav.state'),
                this.$t('nav.state1'),
                this.$t('nav.state2'),
                this.$t('nav.state3'),
                this.$t('nav.state4'),
                this.$t('nav.state5')
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

        __jump(w, q) {
            this.$router.push({
                name: w,
                query: {
                    id: q
                }
            })
        },
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
        async __getDatas(currentPage = 1, pageSize = 10) {
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

    watch: {},
    created() {
        this.__getDatas()
    }
}
</script>

<style  scoped lang='scss'>
.requests {
    // padding: 14px 0;
    width: 300px;
    border: 1px solid #dbdcdc;
    background: #ffffff;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;
        height: 30px;
        border-bottom: 1px solid #dbdcdc;
        .active {
            color: #3f61a6;
            font-weight: bold;
        }
    }
    .result {
        max-height: 400px;
        overflow: auto;
        .img {
            position: relative;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
            img {
                object-fit: cover;
                width: 32px;
                height: 32px;
            }
        }
        li {
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
    .bottomBtn {
        display: flex;
        height: 30px;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #dfdfe0;
        .more {
            color: #3f61a6;
            font-weight: bold;
        }
    }
}
</style>
