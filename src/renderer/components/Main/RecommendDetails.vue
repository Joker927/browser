<template>
    <div class="recommendDetails">
        <div class="list mt16"
             v-if="$route.name==='friends'">
            <h4>{{$t('main.friendsyoumightknow')}}</h4>
            <ul>
                <li class="lis"
                    v-for="(item,index) in recommendList"
                    :key="index">
                    <Avatar @click="__jump(item)"
                            :src="item.avatar"
                            class="cp" />
                    <p class="name">{{item.nickname}}</p>
                    <ButtonFirend :item='item'
                                  type='recommend'></ButtonFirend>
                </li>
            </ul>
        </div>
        <div class="list mt16"
             v-if="$route.name==='group'">
            <h4>{{$t('main.recommendgroup')}}</h4>
            <ul>
                <li class="lis"
                    v-for="(item,index) in recommendList"
                    :key="index">
                    <Avatar :src="item.avatar" />
                    <p class="name">{{item.groupName}}</p>
                    <ButtonGroup :item='item'
                                 type='recommend'
                                 :typeCount='0'></ButtonGroup>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonFirend from './ButtonFirend'
import ButtonGroup from './ButtonGroup'

export default {
    data() {
        return {
            req: {
                num: 50,
                userId: 0
            },
            recommendList: []
        }
    },
    components: { ButtonFirend, ButtonGroup },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        async __getDatas() {
            this.req.userId = this.userInfo.userId
            if (this.$route.name === 'friends') {
                const res = await this.api.recommendFriendes(this.req)
                this.recommendList = res.data
            } else {
                const res = await this.api.recommendGroup(this.req)
                this.recommendList = res.data
            }
        },
        async __add(item) {
            let data = {
                friendId: item.userId,
                remarkName: '',
                userId: this.userInfo.userId
            }
            const res = await this.api.friendeAdd(data)
            this.$set(item, 'flag', true)
        },
        __jump(item) {
            this.$router.push({
                name: 'user',
                query: {
                    id: item.userId,
                    is: item.isFriend
                }
            })
        }
    },
    watch: {
        $route: {
            handler() {
                if (
                    this.$route.name === 'group' ||
                    this.$route.name === 'friends'
                ) {
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
.recommendDetails {
    width: 100%;
    background: #eeeeef;
    display: flex;
    flex-wrap: wrap;
    .list {
        background: #fff;
        width: 100%;
        padding: 12px 10px 12px 20px;
        > h4 {
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            background-size: 14px 14px;
        }
        .lis {
            display: flex;
            align-items: center;
            margin: 10px 0;
            //  justify-content: space-between;
            > img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
                background: #dbdcdc;
            }
            .name {
                width: 360px;
                margin: 0 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .btn {
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                color: #fff;
                width: 50px;
                height: 18px;
                background: #3f61a6;
                margin-left: 10px;
            }
            .active {
                background: #dbdcdc;
            }
        }
    }
    .more {
        text-align: left;
    }
}
</style>
