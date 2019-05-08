<template>
    <div class="searchWrap">
        <div class="menu">
            <div class="srarchWrap"
                 @keyup.enter="__search">
                <div class="srarch">
                    <input type="text"
                           v-model="req.searchName"
                           :placeholder="$t('search')">
                    <span class="x cp"
                          @click="__close"></span>
                </div>

                <a class="add"
                   @click="__createGroup"
                   href="javascript:;"
                   v-tip="$t('side.createagroup')"></a>

            </div>
            <div class="searchResult">
                <div class="tip"
                     v-if="!userList.length&&!groupList.length">
                    {{$t('side.text')}}
                </div>
                <div class="menuList"
                     v-else>
                    <div class="item">
                        <div class="title cp">
                            <span class="name"> {{$t('side.contact')}}</span>
                        </div>
                        <ul class="list">
                            <li class="lis cp"
                                v-for="(item,index) in userList"
                                :key="index">

                                <Avatar class="img"
                                        @click="__jump(item)"
                                        :src="item.avatar" />
                                <span class="name"
                                      @click="__jump(item)">{{item.remarkName||item.nickname||item.userName}} </span>
                                <span class="add cp"
                                      @click="__addFriend(item)"
                                      v-if="!item.flag">{{$t('main.add')}}</span>
                                <span class="add requested"
                                      v-else>{{$t('main.requested')}}</span>
                            </li>
                        </ul>
                        <a href="javascript:;"
                           class="more"
                           v-if="userList.length>=3"
                           @click="__open(1)">{{text}}</a>
                    </div>
                    <div class="item">
                        <div class="title cp">
                            <span class="name">{{$t('side.groupconversations')}}</span>

                        </div>
                        <ul class="list">
                            <li class="lis cp"
                                v-for="(item,index) in groupList"
                                :key="index">

                                <Avatar class="img"
                                        :src="item.image" />
                                <span class="name">{{item.groupName}} </span>
                                <span class="add cp"
                                      @click="__addGroup(item)"
                                      v-if="!item.flag">{{$t('main.join')}}</span>
                                <span class="add requested"
                                      v-else>{{$t('main.requested')}}</span>
                            </li>
                        </ul>
                        <a href="javascript:;"
                           class="more"
                           v-if="groupList.length>=3"
                           @click="__open(2)">{{text1}}</a>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            req: {
                searchName: ''
            },
            userList: [],
            groupList: [],
            datas: [],
            text: '',
            text1: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        ...mapMutations(['SET_GROUP_STATE']),
        async __search() {
            const res = await this.api.searchAll(this.req)
            this.datas = res.data
            this.userList = this.datas.userList.slice(0, 3)
            this.groupList = this.datas.groupList.slice(0, 3)
            if (this.datas.userList.length > 2)
                this.text = this.$t('side.text1')
            if (this.datas.groupList.length > 2)
                this.text = this.$t('side.text1')
        },
        __close() {
            this.$emit('close')
        },
        __open(index) {
            if (index == 1) {
                let len = this.userList.length
                if (len == 3) {
                    this.userList = this.datas.userList
                    this.text = this.$t('side.packup')
                } else {
                    this.userList = this.datas.userList.slice(0, 3)

                    this.text = this.$t('side.lookatall')
                }
            } else {
                let len = this.groupList.length
                if (len == 3) {
                    this.groupList = this.datas.groupList
                    this.text1 = this.$t('side.packup')
                } else {
                    this.groupList = this.datas.groupList.slice(0, 3)
                    this.text1 = this.$t('side.lookatall')
                }
            }
            this.$emit('refresh')
        },
        __createGroup() {
            this.SET_GROUP_STATE()
        },
        __jump(item) {
            this.$router.push({
                name: 'user',
                query: {
                    id: item.userId,
                    is: item.isFriend
                }
            })
        },
        async __addGroup(item) {
            let data = {
                groupId: item.groupId,
                requesterId: this.userInfo.userId
            }

            const res = await this.api.groupApply(data)
            if (res.code == 0) {
                this.$set(item, 'flag', true)
            }

            this.$bus.emit('getData')
        },
        async __addFriend(item) {
            let data = {
                requesterId: item.userId
            }
            const res = await this.api.friendApply(data)
            this.$set(item, 'flag', true)
            this.$bus.emit('getData')
        }
    },
    components: {},
    created() {}
}
</script>

<style lang='scss' scoped>
.searchWrap {
    position: relative;
    background: #ffffff;
    min-height: 100%;
}
.menu {
    padding: 15px;
}
.srarchWrap {
    display: flex;
    .srarch {
        position: relative;
        width: 140px;
        height: 26px;
        border-radius: 5px;
        background: #dbdcdc url('./img/friends_search@2x.png') no-repeat 8px
            center;
        > input {
            height: 26px;
            margin-left: 28px;
            background: transparent;
            border: none;
            outline: none;
        }
        .x {
            position: absolute;
            top: 0;
            right: 0;
            width: 26px;
            height: 26px;
            background: url('./img/addFriends_clear@3x.png') no-repeat center;
            background-size: 12px 12px;
        }
    }
    .add {
        margin-left: 10px;
        width: 26px;
        height: 26px;
        border-radius: 5px;
        background: #dbdcdc url('./img/addGroup@2x.png') no-repeat center;
    }
}
.searchResult {
    .tip {
        margin-top: 10px;
        font-size: 14px;
        color: #888888;
    }
}
.menuList {
    // margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
}
.item {
    padding-top: 20px;
}
.title {
    display: flex;
    flex-wrap: nowrap;
    align-self: center;
    height: 20px;
    .name {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        min-width: 170px;
        display: inline-block;
    }
}

.list {
    overflow: hidden;
    .lis {
        position: relative;
        height: 40px;
        // line-height: 26px;
        // margin-top: 6px;
        display: flex;
        align-items: center;
        .img {
            width: 30px;
            height: 30px;
            margin-right: 4px;
            border-radius: 50%;
            overflow: hidden;
            background: #eff0f0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                background: #eff0f0;
            }
        }
        .add {
            position: absolute;
            right: 0;
            background: #3f61a6;
            color: #ffffff;
            padding: 0 5px;
            font-size: 12px;
            // top: 0;
        }
        .requested {
            color: #000;
            background: #dbdcdc;
        }
        .name {
            width: 110px;
            margin: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
.active.list {
    min-height: 1px;
    height: auto;
}
.more {
    text-decoration: none;
    color: #888888;
}
</style>
