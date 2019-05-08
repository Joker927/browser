<template>
    <div class="menuWrap">
        <Scroll>
            <div class="menu">
                <div class="srarchWrap">
                    <div class="srarch cp" @click="__search">
                        <p>{{$t('search')}}</p>
                    </div>
                    <a @click="__createGroup" class="add cp" href="javascript:;" v-tip="$t('side.createagroup')"></a>

                </div>
                <div class="menuList">
                    <div class="item">
                        <div class="title cp" @click="__open(0)">
                            <i class="arrow " :class="{'active':state[0]}"></i>
                            <span class="name">{{$t('side.chatlist')}}</span>

                        </div>
                        <ul class="list" :class="{'active':state[0]}">
                            <li class="lis cp" v-for="(item,index) in chatRecords" :key="index" @click='SET_WEBIM_List(item)'>

                                <Avatar class="img" :src="item.avatar" />
                                <span class="name">{{item.userName}} </span>
                            </li>
                        </ul>
                    </div>
                    <div class="item">
                        <div class="title cp" @click="__open(1)">
                            <i class="arrow " :class="{'active':state[1]}"></i>
                            <span class="name">{{$t('side.contact')}}</span>

                        </div>
                        <ul class="list" :class="{'active':state[1]}">
                            <li class="lis cp" @click="__jump(item)" v-for="(item,index) in friends" :key="index">

                                <Avatar class="img" :src="item.avatar" />
                                <span class="name">{{item.remarkName||item.nickname||item.userName}} </span>
                            </li>
                        </ul>
                    </div>
                    <div class="item">
                        <div class="title cp" @click="__open(2)">
                            <i class="arrow" :class="{'active':state[2]}"></i>
                            <span class="name">{{$t('side.groupconversations')}}</span>
                        </div>
                        <ul class="list" :class="{'active':state[2]}">
                            <li class="lis cp" v-for="(item,index) in groupList" :key="index" @click='__groupIM(item)'>

                                <Avatar class="img" :src="item.image" />
                                <span class="name">{{item.groupName}} </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Scroll>
        <Scroll v-if="searchVisible" ref="Scroll">
            <Search @refresh='__refresh' @close="__close"></Search>
        </Scroll>

    </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
import Search from "./Search";
import Scroll from "@/commom/Scroll";

export default {
    data() {
        return {
            friends: [],
            groupList: [],
            searchVisible: false,
            state: [false, false, false]
        };
    },
    components: {
        Search,
        Scroll
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            webIMList: state => state.WebImQueue.webIMList,
            chatRecords: state => state.WebImQueue.chatRecords
        })
    },
    watch: {
        chatRecords: {
            handler(newVal,old) {
                console.log(newVal)
            },
            immediate: true,
            deep:true
        }
    },
    methods: {
        ...mapMutations([
            "SET_GROUP_STATE",
            "SET_WEBIM_List",
            "SET_WEBIM_SHOW"
        ]),
        async __getdatas() {
            let userId = this.userInfo.userId;
            const res = await Promise.all([
                this.api.friendsList({ userId }),
                this.api.groupList({ userId }),
                this.api.startListener({
                    userId: userId
                })
            ]);
            this.friends = res[0].data;
            this.groupList = res[1].data;
        },
        async __getFriendsList() {
            let userId = this.userInfo.userId;
            const res = await this.api.friendsList({ userId });
            this.friends = res.data;
        },
        async __getGroupList() {
            let userId = this.userInfo.userId;
            const res = await this.api.groupList({ userId });
            this.api.startListener({
                userId: userId
            });
            this.groupList = res.data;
        },
        __open(index) {
            this.$set(this.state, [index], !this.state[index]);
            if (index === 1) {
                this.__getFriendsList();
            } else if (index === 2) {
                this.__getGroupList();
            }
        },
        __close() {
            this.searchVisible = false;
        },
        __search() {
            // this.state = [false, false, false]
            this.searchVisible = true;
        },
        __createGroup() {
            this.SET_GROUP_STATE({ add: true });
        },
        __jump(item) {
            this.$router.push({
                name: "user",
                query: {
                    id: item.friendId,
                    is: item.isFriend
                }
            });

            let obj = {
                userId: item.friendId,
                userName: item.nickname,
                avatar: item.avatar,
                type: "personal",
                isShow: true,
                width: "210px",
                height: "168px",
                msgList: []
            };
            if (this.chatRecords) {
                this.chatRecords.forEach((val, index) => {
                    if (val.userId == obj.userId) {
                        obj.msgList = val.msgList;
                    }
                });
            }

            this.SET_WEBIM_List(obj);
        },
        __groupIM(item) {
            let obj = {
                groupId: item.groupId,
                userName: item.groupName,
                avatar: item.image,
                type: "group",
                isShow: true,
                width: "210px",
                height: "168px",
                msgList: []
            };
            if (this.chatRecords) {
                this.chatRecords.forEach((val, index) => {
                    if (val.groupId == obj.groupId) {
                        obj.msgList = val.msgList;
                    }
                });
            }
            this.SET_WEBIM_List(obj);
        },
        __refresh() {
            this.$refs.Scroll.refresh();
        }
    },
    created() {
        this.__getdatas();
        this.$bus.on("getData", this.__getdatas);
    }
};
</script>

<style lang='scss' scoped>
.menuWrap {
    position: fixed;
    right: 0;
    top: 80px;
    bottom: 0;
    width: 210px;
    background: #ffffff;
    overflow: hidden;
    z-index: 99;
}

.menu {
    padding: 25px 15px;
}
.srarchWrap {
    display: flex;
    justify-content: space-between;
    .srarch {
        width: 140px;
        height: 26px;
        border-radius: 5px;
        background: #dbdcdc url("./img/friends_search@2x.png") no-repeat 8px
            center;
        > p {
            font-size: 12px;
            height: 26px;
            line-height: 26px;
            margin-left: 28px;
            color: #888888;
        }
    }
    .add {
        margin-left: 10px;
        width: 26px;
        height: 26px;
        border-radius: 5px;
        background: #dbdcdc url("./img/addGroup@2x.png") no-repeat center;
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
    .icon,
    .setting {
        background-size: 100% 100%;
    }
    .icon {
        width: 20px;
        height: 20px;
    }

    .name {
        font-size: 14px;
        line-height: 20px;
        min-width: 170px;
        display: inline-block;
    }
    .arrow {
        width: 20px;
        height: 20px;
        background-image: url("./img/dropDown_none@2x.png");
        background-repeat: no-repeat;
        background-position: center;
    }
    .active {
        background-image: url("./img/dropDown@2x.png");
    }
}

.list {
    height: 0;
    overflow: hidden;
    .lis {
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
            background: #000;
            overflow: hidden;
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
.horizontal {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .lis {
        .img {
            // margin-right: 4px;
        }
    }
}
</style>
