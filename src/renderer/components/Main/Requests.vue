<template>
    <div class="requests mt16">
        <div>
            <div class="title">
                <p>{{title}}</p>
            </div>
            <ul class="result"
                v-if="type===0">
                <li class="cp"
                    v-for="(item,index) in list"
                    :key="index">
                    <div>
                        <div class="img"><img :src="item.avatar"
                                 alt=""></div>
                        <span>{{item.nickname}}</span>
                    </div>
                    <ButtonFirend :item='item'></ButtonFirend>
                </li>

            </ul>
            <ul class="result"
                v-else>
                <li class=""
                    v-for="(item,index) in list"
                    :key="index">
                    <div>
                        <div class="img "><img :src="item.image"
                                 alt=""></div>
                        <span class="name ">{{item.groupName}}</span>
                    </div>
                    <ButtonGroup :item='item'
                                 :typeCount='type'></ButtonGroup>

                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonGroup from './ButtonGroup'
import ButtonFirend from './ButtonFirend'
export default {
    data() {
        return {
            req: {
                userId: null
            },
            type: 0,
            list: []
        }
    },
    components: { ButtonFirend, ButtonGroup },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        title() {
            switch (this.type) {
                case 0:
                    return this.$t('main.friendrequest')
                    break
                case 1:
                    return this.$t('main.groupofinvitation')
                    break
                case 2:
                    return this.$t('main.addgrouptoapplyfor')
                    break
            }
        }
    },
    methods: {
        async __getDatas() {
            let res
            switch (this.type) {
                case 0:
                    this.req.userId = this.userInfo.userId
                    res = await this.api.friendRequestList(this.req)
                    if (res.code === 0) this.list = res.data
                    break
                case 1:
                    res = await this.api.groupInvite()
                    if (res.code === 0) this.list = res.data
                    break
                case 2:
                    res = await this.api.groupRequestList()
                    if (res.code === 0) this.list = res.data
                    break
                default:
                    break
            }
            console.log(typeof this.type)
        }
    },

    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'requests') {
                    this.type = Number(this.$route.params.type)
                    this.__getDatas()
                }
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.requests {
    width: 100%;
    height: 100%;
    background: #ffffff;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;
        height: 40px;
        border-bottom: 1px solid #dbdcdc;
        .more {
            color: #3f61a6;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .result {
        padding: 10px 24px;
        overflow: auto;
        .img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
        }
        > li {
            font-size: 12px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
