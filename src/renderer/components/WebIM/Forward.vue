<template>
    <div class="mask mt16">
        <div class="box">
            <div class="title">
                转发
                <span class="exit" @click='__out'></span>
            </div>

            <div class="contain clearfix">
                <div class="bl fl">
                    <div class="search-f">
                        <input type="text" @focus="foucus" :placeholder="$t('group.placeholder1')" v-model="searchVal" />
                        <span class="search-icon" :class="{'focusIcon':focusIcon}" @click="__searchF"></span>
                    </div>
                    <div class="f-list">
                        <div v-for="(item,index) in list" :key="index" class="clearfix" @click="__sendIM(item)">
                            <div>
                                <img :src="item.avatar" v-if="item.avatar" />
                                <img :src="item.image" v-else-if="item.image" />
                                <img src="./img/icon.png" v-else />
                            </div>
                            <div>
                                {{item.nickname||item.groupName}}
                            </div>
                        </div>
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
            list: [],
            searchName: '',
            searchVal: '',
            focusIcon: false,
            memberList: [], //存着原始的成员列表
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            forwardItem: state => state.WebImQueue.forwardItem,
            webIMList: state => state.WebImQueue.webIMList,
            chatRecords: state => state.WebImQueue.chatRecords
        })
    },
    mounted() {
        this.__getList()
        console.log(this.forwardItem)
    },
    methods: {
        ...mapMutations([
            'SET_IMFORWARD_STATE',
            'SET_WEBIM_List',
            'SET_MSG_List',
            'EXIT_IMFORWARD'
        ]),
        __out() {
            this.EXIT_IMFORWARD()
        },
        foucus() {
            this.focusIcon = true
        },
        __searchF() {
            if (!this.searchVal) {
                this.list = this.memberList;
                return;
            }
            var arr = [];
            this.list.forEach(val => {
                console.log(val)
                if (val.groupName && val.groupName.indexOf(this.searchVal) >= 0) {
                    arr.push(val);
                } else if (val.nickname && val.nickname.indexOf(this.searchVal) >= 0) {
                    arr.push(val);
                }
            });
            this.list = arr;
        },
        async __getList() {
            const res = await this.api.searchFriendAndGroup({
                searchName: this.searchName
            })
            this.list = res.data.containFriendGroupList.concat(
                res.data.friendList
            )
            Object.assign(this.memberList, this.list);
        },
        async __sendIM(item) {
            //遍历当前展示聊天界面,确认转发路径
            let equalIdx = 0
            let flag = this.webIMList.some((val, index) => {
                if (val.groupId) {
                    if (val.groupId == item.groupId) equalIdx = index
                    return val.groupId == item.groupId
                } else {
                    if (val.userId == item.friendId) equalIdx = index
                    return val.userId == item.friendId
                }
            })

            let obj = {}
            //每条msg添加userName和avatar,保证群聊消息展示正确
            let message = {
                type: 0,
                messageType: this.forwardItem.messageType,
                userName: item.nickname,
                avatar: item.avatar,
                msg: this.forwardItem.msg
            }

            if ('groupId' in item) {
                obj = {
                    groupId: item.groupId,
                    userName: item.groupName,
                    avatar: item.image,
                    type: 'group',
                    isShow: true,
                    width: '210px',
                    height: '168px',
                    msgList: [message]
                }
            } else {
                obj = {
                    userId: item.friendId,
                    userName: item.nickname,
                    avatar: item.avatar,
                    type: 'personal',
                    isShow: true,
                    width: '210px',
                    height: '168px',
                    msgList: [message]
                }
            }

            //使用mutations维护vuex,state
            //转发对象存在当前界面,根据index,将msg存入数组
            //转发对象不存在当年界面,push入webImList
            if (flag) {
                this.SET_MSG_List({
                    index: equalIdx,
                    msg: message
                })
            } else {
                this.SET_WEBIM_List(obj)
            }

            this.EXIT_IMFORWARD();

            let para = {
                body: this.forwardItem.msg,
                fromUserId: this.userInfo.userId,
                messageType: 1,
                time: 0,
                toUserId: obj.userId || obj.groupId, //群聊取groupId,个人取userId
                type: 'chat'
            }
            if (!item.groupId) {
                const res = await this.api.sendMessage(para)
            } else {
                para.type = 'groupchat'
                const res = await this.api.sendGroupMessage(para)
            }
        }
    },
    watch: {}
}
</script>

<style lang='scss' scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    overflow: auto;
}
.box {
    width: 300px;
    height: 541px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}

.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

input {
    outline: none;
}

.contain {
    height: 300px;
}

.bl {
    width: 300px;
}

.bl {
    padding-top: 20px;
    border-right: 1px solid #dfdfe0;
}

.bl::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.search-f {
    width: 254px;
    margin: 0 auto;
    position: relative;
    input {
        width: 100%;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 10px;
    }
    input::-webkit-input-placeholder {
        padding-left: 26px;
    }
}

.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url("./img/search-icon.png");
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 230px;
}

.focusIcon {
    right: 10px;
}

.f-list {
    width: 254px;
    margin: 20px auto 0;
    overflow-y: scroll;
    height: 420px;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        > div {
            float: left;
        }
        > div:first-child {
            width: 30px;
            height: 30px;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        input {
            float: right;
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;
            background: url(./img/addFriends_clear@3x.png);
            background-size: 100% 100%;
            margin-top: 9px;
            margin-right: 20px;
        }
    }
}
</style>
