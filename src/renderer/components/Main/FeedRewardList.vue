<template>

    <div class="list">

        <ul class="title">
            <li>
                <div class="forward cp"
                     @click="__go"></div>
            </li>
            <li>昵称</li>
            <li>金额</li>
            <li>时间</li>
        </ul>
        <ul class="res">
            <li v-for="(ele,index) in list"
                :key="index">
                <div class="placeholder"></div>
                <div class="avatar">
                    <div>
                        <Avatar :src="ele.avatar" />
                    </div>

                    <p class="name">{{ele.userName}}</p>
                </div>
                <p class="currency">{{ele.rewardAmount }} {{ele.currency}}</p>
                <p class="time">{{ele.rewardTime |date}}</p>

            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
export default {
    data() {
        return {
            list: []
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            dynamicId: state => state.Feed.dynamicId
        })
    },
    filters: {
        distance(value) {
            return formatDistance(subDays(new Date(value), 0), new Date(), {
                locale: zhCN
            })
        },
        date(value) {
            return format(new Date(value), 'yyyy-MM-dd hh:mm', { locale: zhCN })
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
    methods: {
        ...mapMutations(['']),

        async __getDatas(currentPage = 1, pageSize = 5) {
            let { dynamicId } = this.$route.params
            let req = {
                currentPage,
                pageSize,
                userId: this.userInfo.userId,
                dynamicId
            }
            const res = await this.api.snsDynamicordRewardList(req)
            console.log(res, '======')
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
        },
        __go() {
            this.$router.go(-1)
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
input {
    outline: none;
}

.list {
    margin-top: 16px;
    background: #ffffff;
    min-height: 100%;
    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f7f8f0;
        height: 30px;
        .icon {
            margin: 0 10px;
            width: 20px;
            height: 20px;
            background-size: 80% 80%;
            background-position: center;
            background-repeat: no-repeat;
        }
        .give {
            background-image: url('./img/thumb_sum@3x.png');
        }
    }

    ul.title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f7f8f0;

        > li {
            height: 40px;
            // text-align: center;
            line-height: 40px;
            font-size: 14px;
        }
        > :nth-of-type(1) {
            font-size: 20px;
            width: 10%;
        }
        > :nth-of-type(2) {
            width: 30%;
        }
        > :nth-of-type(3) {
            width: 30%;
        }
        > :nth-of-type(4) {
            width: 30%;
        }
        .forward:hover {
            background-image: url('./img/head_go_slide_pressed@3x.png');
        }
        .forward {
            width: 30px;
            height: 30px;
            margin: 10px;
            background: url('./img/head_go@3x.png') no-repeat;
            background-size: 80% 80%;
        }
    }
    > ul.res {
        padding: 0 10px;
        > li {
            display: flex;
            align-items: center;

            padding: 8px 0;
            border-bottom: 1px solid #f7f8f0;
            .placeholder {
                // width: 10%;
            }
            > .avatar {
                width: 40%;
                display: flex;
                div {
                    border-radius: 50%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #eff0f0;
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
                }
                .name {
                    width: calc(100% - 50px);
                    line-height: 40px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            > .currency {
                width: 30%;
            }
            > .time {
                width: 30%;
            }
        }
    }
}
</style>