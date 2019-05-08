<template>
    <div class="requests">

        <div class="title NAV_MENU">
            <p v-for="(item,index) in titleList"
               :key="index"
               class="cp NAV_MENU"
               :class="{'active':type ===index}"
               @click="__tap(index)">{{item}}</p>

        </div>
        <ul class="result"
            v-if="type===0">
            <li class="cp"
                v-for="(item,index) in list"
                :key="index">
                <div class="NAV_MENU"
                     @click="__jump('user',item.userId)">
                    <div class="img">
                        <Avatar :src="item.avatar" />
                    </div>
                    <span class="name">{{item.nickname}}</span>
                </div>
                <ButtonFirend :item='item'></ButtonFirend>

            </li>

        </ul>
        <ul class="result"
            v-else>
            <li class="NAV_MENU"
                v-for="(item,index) in list"
                :key="index">
                <div class="NAV_MENU">
                    <div class="img NAV_MENU">

                        <Avatar class="NAV_MENU"
                                :src="item.image" />
                    </div>
                    <span class="name NAV_MENU">{{item.groupName}}</span>
                </div>
                <ButtonGroup :item='item'
                             :typeCount='type'></ButtonGroup>

            </li>

        </ul>
        <p class="noMore"
           v-if="!list.length">{{$t('nav.noData')}}</p>
        <div class="bottomBtn NAV_MENU">
            <router-link tag="span"
                         class="more cp"
                         :to="{name:'requests',params:{type:type}}">{{$t('nav.all')}}</router-link>
        </div>
    </div>
</template>

<script>
import ButtonGroup from '@/components/Main/ButtonGroup'
import ButtonFirend from '@/components/Main/ButtonFirend'
import { mapState, mapMutations, mapActions } from 'vuex'

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
    components: { ButtonGroup, ButtonFirend },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        titleList() {
            return this.$t('nav.titleList')
        }
    },
    methods: {
        __jump(w, q) {
            this.$router.push({
                name: w,
                query: {
                    id: q
                }
            })
        },
        __tap(index) {
            this.type = index
        },
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
        }
    },

    watch: {
        type: {
            handler() {
                this.__getDatas()
            },
            immediate: true
        }
    },
    created() {}
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
        padding: 14px;
        max-height: 600px;
        overflow: auto;
        .img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            img {
                max-width: 100%;
                max-height: 100%;
                /* background: #000; */
                object-fit: cover;
                width: 32px;
                height: 32px;
            }
        }
        > li {
            font-size: 12px;
            padding: 4px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
                display: flex;
                align-items: center;
            }
            .name {
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
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
    .noMore {
        padding: 0 20px 20px;
        color: #888888;
    }
}
</style>
