<template>
    <div class="tab mt16">

        <ul class="list ">
            <li class="lis cp"
                @click="__handler(el.class)"
                v-for="(el,index) in list"
                :key="index">
                <span class="icon"
                      :class="el.class"></span>
                <p>{{el.name}}</p>
            </li>
        </ul>
        <div class="send"
             @keyup.enter="__publish">
            <div class="inputer">
                <div class="img">

                    <Avatar :src="userInfo.avatar" />
                </div>
                <p>{{userInfo.nickname}}</p>
                <input :placeholder="$t('main.placeholder3')"
                       ref="TabInput"
                       class="EMOJI_MENU"
                       v-model="dynamicDesc">
            </div>
            <div class="upload"
                 v-if="uploadListVisible">
                <div v-for="(item ,index) in uploadList"
                     :key="index">
                    <div v-if="item.flag"
                         class="con"
                         @click="__viewRes(item)">
                        <div class="loadMask"
                             v-show="item.loaded!==100">
                            <svg width="100"
                                 height="100"
                                 viewBox="0 0 100 100">
                                <circle cx="50"
                                        cy="50"
                                        r="30"
                                        fill="none"
                                        stroke="#767676"
                                        stroke-width="4" />
                                <circle cx="50"
                                        cy="50"
                                        r="30"
                                        fill="none"
                                        ref="Circle"
                                        stroke="#ffffff"
                                        stroke-width="4"
                                        :stroke-dasharray="perimeter"
                                        :stroke-dashoffset="item.loaded|progress(perimeter)"
                                        stroke-linecap="round" />
                            </svg>
                        </div>
                        <div class="mask">
                            <span class="del cp"
                                  @click="__delItem(item)">X</span>
                        </div>
                        <img :src="item.src">
                    </div>

                </div>
                <div class="add"
                     @click="__startUpload"></div>
            </div>
            <div class="menu">
                <div class="opt">
                    <div class="album cp"
                         @click="__startUpload">
                        <span class="icon"></span>{{$t('main.photo')}}</div>
                    <div class="emoji cp EMOJI_MENU"
                         ref="Emoji"
                         @click="__showEmojiPanel">
                        <span class="icon"></span>
                        {{$t('main.emoji')}}</div>
                    <div class="more cp ACCESS_MENU"
                         v-tip="$t('main.access')"
                         ref="More"
                         @click="__showAccessMenu">
                        <span class="icon ACCESS_MENU"></span>
                    </div>
                </div>
                <div class="s cp"
                     v-tip="$t('main.send')"
                     @click="__publish()">
                    <span class="icon"></span>
                </div>
            </div>
        </div>

        <FeedUpload ref="Upload"
                    :list='uploadList'
                    @progress='__uploadProgress'></FeedUpload>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FeedUpload from './FeedUpload'

export default {
    data() {
        return {
            dynamicDesc: '',
            uploadList: [],
            perimeter: 0,
            accessMenuStyle: {
                top: 288,
                left: 535
            }
        }
    },
    components: { FeedUpload },
    filters: {
        progress(value, perimeter) {
            if (perimeter && value) {
                return perimeter - value * (perimeter / 100)
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            selectedList: state => state.Feed.selected,
            emoji: state => state.Emoji.text,
            emojiState: state => state.Emoji.state,
            permission: state => state.Feed.accessMenuPermission
        }),

        list() {
            return [
                {
                    name: this.$t('main.news'),
                    class: 'news'
                },
                {
                    name: this.$t('search'),
                    class: 'search'
                }
                // {
                //   name: '相片/影片相簿',
                //   class: 'album'
                // },
                // {
                //   name: '直播视讯',
                //   class: 'video'
                // }
            ]
        },
        attachmentList() {
            let arr = this.uploadList.filter(item => item.flag)
            return arr.map(item => {
                if (item.type === 'image') {
                    return {
                        imgUrl: item.src
                    }
                } else {
                    return {
                        videoImg: item.src,
                        videoUrl: item.url
                    }
                }
            })
        },
        uploadListVisible() {
            return this.uploadList.some(item => item.flag)
        }
    },
    methods: {
        ...mapMutations([
            'SET_FEED_ACCESS_MENU_STATE',
            'SET_EMOJI_STATE',
            'SET_EMOJI_STYLE',
            'SET_EMOJI_NODE',
            'SET_FEED_MODAL_SELECTED'
        ]),
        __setEmoji() {},
        async __publish() {
            // forwardRemark	string
            // 转发时的说明（转发时该字段才可能有值）

            // parentDynamicId	integer($int64)
            // 原动态id（转发的动态才有值）

            // remindUserIds	string
            // @用户id多个之间用英文逗号分开
            if (
                this.dynamicDesc.trim() === '' &&
                this.attachmentList.length === 0
            ) {
                this.$Toast(this.$t('main.toast6'))
                return
            }
            let req = {
                dynamicDesc: this.dynamicDesc,
                contentVOList: this.attachmentList,
                dynamicType: 0,
                permission: this.permission
            }

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
            this.dynamicDesc = ''
            this.$emit('refresh')
            this.$Toast(this.$t('main.success'))
            this.$refs.Upload.clear()
            this.uploadList = []
        },
        __startUpload() {
            this.$refs.Upload.show()
        },
        __uploadProgress(res) {
            this.uploadList.push(res)

            if (this.perimeter === 0) {
                this.$nextTick(() => {
                    this.perimeter = this.$refs.Circle[0].getTotalLength()
                })
            }
        },
        __delItem(item) {
            item.flag = false
        },
        __viewRes(item) {},
        __handler(cla) {
            if (cla === 'search') {
                this.$router.push({
                    name: cla
                })
            }
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
        __showEmojiPanel() {
            let dom = this.$refs.Emoji.getBoundingClientRect()
            let height = dom.height
            let top = dom.top + height + 10
            this.SET_EMOJI_STYLE({
                left: dom.left,
                top
            })
            this.SET_EMOJI_NODE(this.$refs.TabInput)
            this.SET_EMOJI_STATE(true)
        }
    },
    watch: {
        emoji() {
            this.dynamicDesc = this.$refs.TabInput.value
        }
    }
}
</script>

<style lang='scss' scoped>
.tab {
    background: #fff;
}
.send {
    padding: 5px 20px;
    .inputer {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin: 5px 0;
        height: 50px;
        border-bottom: 1px solid #eff0f0;
        .img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eff0f0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        input {
            flex-grow: 1;
            resize: none;
            outline: none;
            border: none;
            padding: 5px;
            min-height: 100%;
            font-size: 14px;
        }
    }
    .menu {
        margin: 10px 0;
        height: 30px;
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
                border-radius: 40px;
                padding: 0 8px;
                margin: 0 5px;
                background: #f7f7f7;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            > div:hover {
                background: rgba($color: #525252, $alpha: 0.1);
            }
            .album > .icon {
                background-image: url('./img/home_edit_film@3x.png');
            }

            .emoji > .icon {
                background-image: url('./img/home_edit_expression@3x.png');
            }
            .more > .icon {
                height: 4px;
                margin-right: 0px;
                background-image: url('./img/home_edit_more@3x.png');
            }
        }

        .s > .icon {
            height: 31px;
            width: 41px;
            background-image: url('./img/send.png');
        }
    }
}
.upload {
    display: flex;
    flex-wrap: wrap;
    .con,
    .add {
        width: 100px;
        height: 100px;
        margin-right: 5px;
    }
    .con {
        position: relative;
        img,
        video {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 100px;
            max-height: 100px;
        }

        .mask,
        .loadMask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 4;
            background: rgba($color: #000000, $alpha: 0.4);
            display: none;
            .del {
                position: absolute;
                right: 0;
                top: 0;
                width: 20px;
                height: 20px;
                color: #fff;
                text-align: center;
            }
        }

        .loadMask {
            display: block;
            z-index: 3;
            background: rgba($color: #000000, $alpha: 0.2);
        }
    }
    .con:hover {
        .mask {
            display: block;
        }
    }
    .add {
        // border: 1px dashed #e2e2e3;
        background: url('./img/dynamic_add_pics@2x.png') no-repeat;
    }
}
.list {
    border: 1px solid #c8c9c0;
    display: flex;
    flex-wrap: nowrap;
    background: #f7f7f7;
    justify-content: space-between;
    .lis {
        height: 30px;
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            width: 20px;
            height: 18px;
            margin-right: 5px;
            background-size: 100% 100%;
        }
        .news {
            background-image: url('./img/home_edit@3x.png');
        }
        .album {
            background-image: url('./img/home_camera@3x.png');
        }
        .video {
            background-image: url('./img/home_video@3x.png');
        }
        .search {
            width: 18px;
            height: 18px;
            background-image: url('./img/head_search_down@3x.png');
        }
        > p {
        }
    }
}
.more {
    font-size: 12px;
    color: #888888;
    margin-top: 20px;
    text-align: center;
    span {
        display: inline-block;
        padding-left: 20px;
        //   background: url(./img/home_seeMore@3x.png) no-repeat 0px center;
        background-size: 15px 8px;
        border: none;
    }
}
</style>
