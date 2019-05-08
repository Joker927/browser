<template>
    <div class="mask mt16"
         v-if="parentDynamicId"
         :style="{zIndex:zIndex}"
         @click.self="__out">
        <div class="content">
            <div class="title">
                <p>{{$t('main.forward')}}</p>
                <span class="x"
                      @click="__out"></span>
            </div>
            <ul class="tab">
                <li class="cp"
                    :class='{"active":tabActive===0}'
                    @click="__toggle(0)">{{$t('main.dynamic')}}</li>
                <li class="cp"
                    :class='{"active":tabActive===1}'
                    @click="__toggle(1)">{{$t('main.groupAndfriends')}}</li>
            </ul>
            <div v-if="
                    tabActive===0">
                <div class="input">
                    <textarea v-model="forwardRemark"></textarea>
                </div>
                <div class="btn">
                    <div class="opt">
                        <div class="more cp ACCESS_MENU"
                             ref="More"
                             @click="__showAccessMenu">
                            <span class="icon ACCESS_MENU"></span>
                        </div>
                    </div>
                    <div class="s cp"
                         @click="__publish()">
                        {{$t('confirm')}}
                    </div>

                </div>
            </div>
            <div v-if="tabActive===1"
                 class="dynamicWrap">
                <div class="dynamicItem">
                    <div v-if="dynamicItem.contentList.length">
                        <img v-if="dynamicItem.contentList[0].imgUrl"
                             :src="dynamicItem.contentList[0].imgUrl"
                             alt="">
                        <div v-if="dynamicItem.contentList[0].videoImg">
                            <img :src="dynamicItem.contentList[0].videoImg"
                                 alt="">
                        </div>

                    </div>
                    <div class="text">{{dynamicItem.dynamicDesc}}</div>
                </div>
                <div class="inputWrap">

                    <input type="text"
                           :placeholder="$t('main.placeholder')"
                           v-model="remark">
                </div>
                <SelectWidget @done='__selectDone'></SelectWidget>
            </div>
        </div>

    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SelectWidget from '@/components/Common/SelectWidget'
export default {
    data() {
        return {
            remark: '',
            tabActive: 0
        }
    },
    components: { SelectWidget },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            selectedList: state => state.Feed.selected,
            permission: state => state.Feed.accessMenuPermission,
            parentDynamicId: state => state.Feed.parentDynamicId,
            dynamicItem: state => state.Feed.dynamicItem,
            webIMList: state => state.WebImQueue.webIMList,
            zIndex: state => state.Feed.zIndex
        }),
        forwardRemark() {
            return this.$t('main.forwardRemark') //转发说明
        }
    },
    methods: {
        ...mapMutations([
            'SET_FEED_MODAL_STATE',
            'SET_FEED_MODAL_SELECTED',
            'SET_FEED_ACCESS_MENU_STATE',
            'SET_FEED_PARENT_DYNAMIC',
            'SET_WEBIM_List',
            'SET_MSG_List'
        ]),

        async __publish() {
            // forwardRemark	string
            // 转发时的说明（转发时该字段才可能有值）

            // parentDynamicId	integer($int64)
            // 原动态id（转发的动态才有值）

            // remindUserIds	string
            // @用户id多个之间用英文逗号分开

            let req = {
                // dynamicDesc: this.dynamicDesc,
                // contentVOList: this.attachmentList,
                forwardRemark: this.forwardRemark,
                dynamicType: 0,
                permission: this.permission,
                parentDynamicId: this.parentDynamicId
            }
            req = Object.assign(
                JSON.parse(JSON.stringify(this.dynamicItem)),
                req
            )
            if (this.permission === 3) {
                req.unvisibleUserIds = this.selectedList
                    .map(item => {
                        return item.friendId
                    })
                    .join(',')
            } else if (this.permission === 4) {
                req.visibleUserIds = this.selectedList
                    .map(item => {
                        return item.friendId
                    })
                    .join(',')
            }
            const res = await this.api.snsPublish(req)

            if (res.code == 0) {
                this.SET_FEED_MODAL_SELECTED([])
                this.__publishSuccess()
            }
        },
        __publishSuccess() {
            this.$Toast(this.$t('main.shareSuccess'))
            this.__out()
            this.$bus.emit('refresh' + this.$route.name)
        },

        __out() {
            this.SET_FEED_PARENT_DYNAMIC({ id: null })
            this.SET_FEED_ACCESS_MENU_STATE({ state: false })
        },

        __showAccessMenu() {
            let pos = this.$refs.More.getBoundingClientRect()

            this.SET_FEED_ACCESS_MENU_STATE({
                state: !this.accessMenuState,
                pos: {
                    left: pos.left,
                    top: pos.top + pos.height
                }
            })
        },
        __toggle(index) {
            this.tabActive = index
        },
        __selectDone(res) {
            this.__out()

            if (res.hander === 'cancel') {
                // this.__out()
            } else if (res.hander === 'submit') {
                console.log(res.data, 'submit')
                let list = res.data

                list.forEach(item => {
                    this.__sendIM(item)
                })
            }
        },
        async __sendIM(item) {
            // 遍历当前展示聊天界面, 确认转发路径

            for (var i = 0; i < 2; i++) {
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
                let msg = ''
                let type = 11
                if (i === 0) {
                    let dynamicDesc = this.dynamicItem.dynamicDesc
                    let contentList0 = this.dynamicItem.contentList[0]
                    if (dynamicDesc.length > 10) {
                        dynamicDesc = dynamicDesc.substring(0, 10) + '...'
                    }
                    msg = {
                        dynamicDesc: dynamicDesc,
                        dynamicId: this.dynamicItem.dynamicId,
                        imageUrl: contentList0
                            ? contentList0.videoImg || contentList0.imgUrl
                            : ''
                    }
                } else {
                    msg = this.remark
                    type = 1
                }
                let obj = {}
                let message = {
                    type: '0',
                    messageType: type,
                    msg
                }
                if (!msg) return
                if ('groupId' in item) {
                    obj = {
                        userId: item.groupId,
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

                if (flag) {
                    this.SET_MSG_List({
                        index: equalIdx,
                        msg: message
                    })
                } else {
                    this.SET_WEBIM_List(obj)
                }
                let para = {
                    body: type == 11 ? JSON.stringify(msg) : msg,
                    fromUserId: this.userInfo.userId,
                    messageType: type,
                    time: 0,
                    toUserId: obj.userId,
                    type: 'chat'
                }
                if ('groupId' in item) {
                    para.type = 'groupchat'
                    const res = await this.api.sendGroupMessage(para)
                } else {
                    const res = await this.api.sendMessage(para)
                }
            }

            // let o = {
            //     body: '',
            //     fromUserId: 214,
            //     messageType: 7,
            //     time: 0,
            //     toUserId: 206,
            //     type: 'chat'
            // }
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
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    overflow: auto;
}
.content {
    position: absolute;
    left: 50%;
    top: 50%;
    // width: 486px;
    // height: 296px;
    background: #ffffff;
    transform: translate(-50%, -50%);

    .title {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f3f3f3;
        height: 30px;
        .x {
            width: 20px;
            height: 30px;
            background: url('./img/popup_cancel@3x.png') no-repeat center;
            background-size: 15px 15px;
        }
    }
    .tab {
        display: flex;
        margin-top: 20px;
        height: 30px;
        align-items: center;
        padding: 0 20px;
        font-size: 14px;
        li {
            margin-right: 30px;
            padding-bottom: 4px;
        }
        .active {
            color: #3f61a6;
            border-bottom: 2px solid #3f61a6;
        }
    }
    .btn {
        padding: 0 30px;
        height: 30px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 5px;
            background-size: 100% 100%;
        }
        .opt {
            display: flex;
            flex-wrap: nowrap;
            > div {
                border: 1px solid #c8c9c0;
                border-radius: 20px;
                padding: 0 10px;
                margin: 0 5px;
                background: #f7f7f7;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .more > .icon {
                height: 4px;
                margin-right: 0px;
                background-image: url('./img/home_edit_more@3x.png');
            }
        }

        .s {
            border-radius: 3px;
            padding: 4px 14px;

            background: #3f61a6;
            color: #ffffff;
        }
    }
    .input {
        margin: 20px 30px;
        width: 432px;
        height: 120px;
        border: 1px solid #eff0f0;
        font-size: 14px;
        textarea {
            padding: 10px;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            resize: none;
        }
    }
    .dynamicWrap {
        width: 600px;
        .dynamicItem {
            display: flex;
            padding: 20px 10px;
        }
        img {
            width: 70px;
            height: 70px;
        }
        .text {
            max-height: 70px;
            font-size: 14px;
            line-height: 23px;
            padding-left: 10px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .inputWrap {
            margin: 0px 10px 10px;
            input {
                width: 100%;
                border-radius: 4px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #efefe0;
                background: #f5f6f7;
                padding-left: 20px;
                outline: none;
            }
        }
    }
}
</style>
