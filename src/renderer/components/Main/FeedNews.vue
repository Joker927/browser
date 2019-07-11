<template>
    <div class="feedNews mt16"
         v-if="item">
        <div class="info">
            <div class="avatar cp"
                 @click="__jump(item)">
                <Avatar :src="item.avatar" />
            </div>
            <div class="desc">
                <p class="name"><span>{{ item.userName }}</span>
                    <span v-if="item.permission===5||item.parentPermission===5"
                          class="isNeedPay"></span></p>
                <span class="time">{{ item.publishTime | date}}</span>
            </div>
            <div class="menuBtn cp FEED_MENU"
                 @click="__showMenu"></div>
            <ul class="menu "
                v-show='index===menuState'>
                <li class="cp"
                    @click="__collect"><span class="icon collect"
                          :class="{'collected':item.isReward===1}"></span>
                    <p>{{$t('main.collection')}}</p>
                </li>
                <li v-if="item.userId!==userInfo.userId"
                    class="cp"
                    @click="__unBlock"><span class="icon unblock"></span>
                    <p>{{$t('main.block')}}</p>
                </li>
                <li class="cp"
                    v-if="item.userId===userInfo.userId"
                    @click="__delComment"><span class="icon delete"></span>
                    <p>{{$t('delete')}}</p>
                </li>
            </ul>
        </div>
        <div v-if="item.parentDynamicId"
             class="txt">{{item.forwardRemark}}</div>
        <div class="newDesc"
             :class="{'isForward':item.parentDynamicId}">
            <div class="txt"
                 v-if="item.permission===5&&item.userId!==userInfo.userId||item.parentPermission===5&&item.userId!==userInfo.userId">
                <span v-html="$options.filters.isUrl(cutStr)"></span>
                <span v-if="item.dynamicDesc.length>20&&cutStr.length==23&&!checked"
                      class="cp highlight"
                      @click="__checkPermission">{{$t('main.more')}}</span> </div>
            <p class="txt"
               v-else
               v-html="$options.filters.isUrl(item.dynamicDesc)"></p>
            <div class="content"
                 v-if="item.contentList&&item.contentList.length">
                <div v-for="(ele,index) in item.contentList.slice(0,3)"
                     :key="index"
                     :class="{[classArr[index]]:true}"
                     @click="__preview(item.contentList,index,'0')">
                    <img v-if="ele.imgUrl"
                         :src="ele.imgUrl"
                         alt="">
                    <div v-if="ele.videoImg">
                        <span v-if="index!==2"
                              class="palyIcon cp"></span>
                        <img :src="ele.videoImg"
                             alt="">
                    </div>

                    <p class="remain"
                       v-if="item.contentList.length>3">
                        + {{item.contentList.length - 3}}
                    </p>
                </div>
            </div>
        </div>

        <div class="about">
            <div class="give"
                 :class="{'reward':item.isReward ==='1'}">
                <div @click="__setReward(item)"
                     v-tip="$t('main.reward')">
                    <span class="icon"></span>
                    <p>{{$t('main.reward')}}</p>
                </div>
                <router-link tag="p"
                             :to="{name:'rewardList',params:{
                                 dynamicId:item.dynamicId
                             }}"
                             class="go cp">{{item.rewardCount}}</router-link>
            </div>
            <div class="operate">
                <div class="like cp"
                     v-tip="$t('main.like')"
                     @click="__setLike()">
                    <span :class="{ 'icon': true, 'active': item.likeFlag === '1' }"></span>
                    <p>{{$t('main.like')}}</p>
                </div>

                <div class="share cp"
                     v-tip="$t('main.share')"
                     @click="__setForwardId">
                    <span class="icon"></span>
                    <p>{{$t('main.share')}}</p>
                </div>

            </div>

        </div>
        <div class="about">
            <div class="num cp"
                 ref="Like"
                 v-tip="$t('main.likeCount')"
                 @click='__showLikeList(item.dynamicId)'>
                <span class="icon"></span>
                <p>{{item.likeCount}}</p>
            </div>
            <div class="operate">
                <div class="total cp"
                     @click="__getCommentList">
                    <p>{{ item.commentCount }}{{$t('main.comments')}}</p>
                </div>
            </div>
        </div>
        <div class="func"
             @keyup.enter="__setComment">
            <FeedNewsInputer v-model='text'
                             :index='0'
                             :item='uploadList[0]'
                             @change='__changeUpload'></FeedNewsInputer>
            <p class="tip">{{$t('main.tips')}}</p>
        </div>
        <div class="comments"
             v-if="commentsShow">
            <div v-for="(ele,index) in comments.slice(0, checkMore)"
                 :key="index">
                <div class="commentsList">
                    <div class="avatar cp"
                         @click="__jump(ele)">

                        <Avatar :src="ele.avatar" />
                    </div>
                    <div class="subject"
                         v-if="ele.contentVO">
                        <p class="name">{{ele.userName}}</p>
                        <div class="opt">
                            <div class="text"
                                 v-if="ele.contentVO.text">
                                {{ele.contentVO.text}}
                            </div>
                            <div v-if="ele.userId===userInfo.userId"
                                 @click="__delCommentOrReply(ele.commentId)"
                                 class="del highlight cp">
                                {{$t('delete')}}
                            </div>
                        </div>
                        <div class="contentDesc"
                             @click="__preview(ele.contentVO,0,'1')">
                            <img v-if="ele.contentVO.imgUrl"
                                 :src="ele.contentVO.imgUrl"
                                 alt="">

                            <div v-if="ele.contentVO.videoImg">
                                <span class="palyIcon cp"></span>
                                <img :src="ele.contentVO.videoImg"
                                     alt="">
                            </div>
                        </div>
                        <div class="reply">
                            <a class="highlight"
                               @click="__showInputer('inputCount',index)"
                               href="javascript:;">{{$t('main.reply')}}</a>
                            <span class="dis">{{ele.createTime | distance}}</span>
                        </div>
                        <div v-if="inputCount==index"
                             @keyup.enter='__reply(ele,0)'>
                            <FeedNewsInputer v-model='commentText'
                                             :index='1'
                                             :item='uploadList[1]'
                                             @change='__changeUpload'></FeedNewsInputer>

                        </div>
                    </div>
                </div>
                <div class="msgToggle ml45"
                     v-if="ele.replyList.length"
                     @click="__changeMsgToggle(ele)">
                    <span class="icon"
                          :class="{'active':ele.toggle}"></span>
                    <p class="highlight">
                        <span v-if="ele.toggle">{{$t('main.packUp')}}</span>
                        <span v-else>{{$t('main.expand')}}</span>
                        {{ele.replyList.length}}{{$t('main.article')}}</p>
                </div>
                <div v-if="ele.toggle">
                    <div class="comments ml45"
                         v-for="(el, i) in ele.replyList"
                         :key="i">
                        <div class="commentsList">
                            <div class="avatar"
                                 @click="__jump(ele)">

                                <Avatar :src="ele.avatar" />
                            </div>
                            <div class="subject"
                                 v-if="el.contentVO">
                                <p class="name">{{el.replyUserName}}</p>
                                <div class="opt">
                                    <div class="text"
                                         v-if="el.contentVO.text">
                                        {{el.contentVO.text}}
                                    </div>
                                    <div v-if="el.replyUserId===userInfo.userId"
                                         @click="__delCommentOrReply(el.replyId,'reply')"
                                         class="del highlight cp">
                                        {{$t('delete')}}
                                    </div>
                                </div>
                                <div class="contentDesc"
                                     @click="__preview(el.contentVO,0,'1')">
                                    <img v-if="el.contentVO.imgUrl"
                                         :src="el.contentVO.imgUrl"
                                         alt="">
                                    <div v-if="el.contentVO.videoImg">
                                        <span class="palyIcon cp"></span>
                                        <img :src="el.contentVO.videoImg"
                                             alt="">
                                    </div>
                                </div>
                                <div class="reply">
                                    <a class="highlight"
                                       @click="__showInputer('replyInputCount',i)"
                                       href="javascript:;">
                                        {{$t('main.reply')}}
                                    </a>
                                    <span class="dis">{{el.replyTime | distance}}</span>
                                </div>
                                <div v-if="replyInputCount==i"
                                     @keyup.enter='__reply(el,1)'>
                                    <FeedNewsInputer v-model='replyText'
                                                     :index='2'
                                                     :item='uploadList[2]'
                                                     @change='__changeUpload'></FeedNewsInputer>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="msgToggle"
                 v-if="comments.length > 1&&checkMore===1"
                 @click="__changeCommentsToggle">
                <p class="highlight"> {{$t('main.moreMsg')}}
                </p>
            </div>
        </div>
        <FeedUpload ref="Upload"
                    :list='uploadList'
                    :multiple="false"
                    @progress='__uploadProgress'></FeedUpload>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import FeedUpload from './FeedUpload'
import FeedNewsInputer from './FeedNewsInputer'
export default {
    props: {
        item: {},
        index: null
    },
    data() {
        return {
            comments: [], //一级评论列表
            commentsShow: false,
            inputCount: null,
            replyInputCount: null,
            text: '', //一级评论
            commentText: '', //二级评论
            replyText: '', //回复二级评论
            uploadList: [],
            uploadCount: null,
            checkMore: 1, // 查看更多留言
            checked: false //是否有权限查看
        }
    },
    components: { FeedUpload, FeedNewsInputer },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            menuState: state => state.Feed.menuState
        }),
        classArr() {
            let len = this.item.contentList.length

            if (len >= 3) return ['item1', 'item2', 'item3']

            if (len == 2) return ['item2', 'item3']

            if (len == 1) return ['item1']
        },
        cutStr() {
            let value = this.item.dynamicDesc
            let str = ''
            let len = 20
            if (!this.checked) {
                str = value.length > len ? value.substring(0, len) + '...' : str
            } else {
                str = value
            }
            return str
        }
    },
    filters: {
        distance(value) {
            return formatDistance(subDays(new Date(value), 0), new Date(), {
                locale: zhCN
            })
        },
        date(value) {
            return format(new Date(value), 'yyyy-MM-dd hh:mm', {
                locale: zhCN
            })
        },
        isUrl(value) {
            let reg = /^https?:\/\/((\w|=|\?|\.*(:\d+)?|\/|&|-)+)/g
            let str = value
            if (reg.test(value)) {
                let url = value.match(reg)[0]
                let index = str.indexOf(url)

                str = str.replace(reg, (a, b, c) => {
                    return `<a class='link DynamicLink' href='javascript:;'  data-href=${a}> ${a}</a>`
                })
            }
            return str
        }
    },
    methods: {
        ...mapMutations([
            'SET_FEED_LIKE_STATE',
            'SET_FEED_LIKE_STYLE',
            'SET_FEED_PREVIEW',
            'SET_FEED_PARENT_DYNAMIC',
            'SET_FEED_MENU_STATE',
            'SET_FEED_REWARD',
            'SET_FEED_PAY_LOOK',
            'ADD_TABS'
        ]),
        __setDynamicLink() {
            this.$nextTick(() => {
                let hrefs = document.querySelectorAll('.DynamicLink')
                hrefs.forEach((item, index) => {
                    item.onclick = () => {
                        var obj = {
                            title: '',
                            url: item.dataset.href
                        }
                        this.ADD_TABS(obj)
                    }
                })
            })
        },
        async __unBlock() {
            let res = {}
            if (this.item.isFriend === '1') {
                let req = {
                    friendIds: [this.item.userId],
                    type: 1,
                    userId: this.userInfo.userId
                }
                res = await this.api.privacySetDynamicView(req)
            } else {
                let req = {
                    blackIds: [this.item.userId],
                    userId: this.userInfo.userId
                }
                res = await this.api.privacyAddBlacklist(req)
            }

            if (res.code === 0) {
                this.$Toast(this.$t('success'))
                this.$bus.emit('refreshfeed')
            } else {
                this.$Toast(res.msg)
            }
        },
        //设置转发 TODO:目前二次转发会忽略转发动态的内容 只转发原始动态
        async __setForwardId() {
            let id = this.item.parentDynamicId || this.item.dynamicId
            let permission = this.item.parentPermission || this.item.permission
            let userId = this.item.parentUserId || this.item.userId

            this.SET_FEED_PARENT_DYNAMIC({
                item: this.item,
                id
            })
            // if (permission === 5 && this.item.userId !== this.userInfo.userId) {
            //     await this.__checkPermission()
            //     if (this.checked) {
            //         this.SET_FEED_PARENT_DYNAMIC({
            //             item: this.item,
            //             id
            //         })
            //     }
            // } else {
            //     this.SET_FEED_PARENT_DYNAMIC({
            //         item: this.item,
            //         id
            //     })
            // }
        },
        __setReward(item) {
            let id = item.dynamicId
            this.SET_FEED_REWARD({
                item,
                id
            })
        },
        //评论
        async __setComment() {
            let data = {
                text: this.text
            }
            data = Object.assign(data, this.__getUploadSource(0))
            if (
                data.text.trim() === '' &&
                !data.videoUrl &&
                !data.videoImg &&
                !data.imgUrl
            ) {
                this.$Toast(this.$t('main.toast6'))
                return
            }

            let req = {
                dynamicId: this.item.dynamicId,
                contentVO: data
            }
            const res = await this.api.snsComment(req)
            if (res.code === 0) {
                this.text = ''
                this.$Toast(this.$t('main.toast'))
                this.__commentSuccess()
            }
        },
        async __delComment() {
            let req = {
                ids: [this.item.dynamicId]
            }
            const res = await this.api.snsDelete(req)
            if (res.code === 0) {
                this.$Toast(this.$t('main.toast1'))
                this.$emit('refresh', this.item.dynamicId)
            }
        },

        //点赞
        async __setLike() {
            let flag = this.item.likeFlag
            let req = {
                dynamicId: this.item.dynamicId
            }
            let res = {}
            if (flag === '1') {
                res = await this.api.snsCancelLike(req)
            } else {
                res = await this.api.snsLike(req)
            }

            if (res.code == 0) {
                let state = '1'
                if (flag === '1') {
                    state = '0'
                    this.item.likeCount--
                } else {
                    this.item.likeCount++
                }
                this.$set(this.item, 'likeFlag', state)
            }
        },

        //显示点赞列表
        __showLikeList(id) {
            this.SET_FEED_LIKE_STATE({ state: true, id })
            let dom = this.$refs.Like.getBoundingClientRect()
            let height = dom.height
            let top = dom.bottom
            this.SET_FEED_LIKE_STYLE({
                left: dom.left,
                top
            })
        },

        async __getCommentList(flag) {
            if (this.commentsShow && !flag) {
                this.commentsShow = !this.commentsShow
            } else {
                let req = {
                    currentPage: 1,
                    dynamicId: this.item.dynamicId,
                    pageSize: 100
                }
                const res = await this.api.snsCommentList(req)
                if (res.code === 0) {
                    this.comments = res.data.list
                    this.commentsShow = true

                    //更新留言数量
                    this.item.commentCount = this.comments.length
                }
            }
        },
        __showInputer(str, index) {
            this[str] = index
        },
        async __delCommentOrReply(id, type) {
            let req = {
                ids: [id]
            }
            let res = {}
            let msg = ''
            if (type === 'reply') {
                res = await this.api.snsDeleteReply(req)
                msg = this.$t('main.toast2')
            } else {
                res = await this.api.snsDelComment(req)
                msg = this.$t('main.toast3')
            }

            if (res.code === 0) {
                this.$Toast(msg)
                this.__getCommentList(true)
            }
        },
        __getUploadSource(index) {
            let data = {}
            if (this.uploadList[index]) {
                let type = this.uploadList[index]['type']
                let item = this.uploadList[index]

                if (type === 'image') {
                    data.imgUrl = item.src
                } else {
                    data.videoImg = item.src
                    data.videoUrl = item.url
                }
            }
            return data
        },
        async __reply(item, type) {
            let data = {
                text: type == 0 ? this.commentText : this.replyText
            }

            data = Object.assign(data, this.__getUploadSource(type + 1))
            if (
                data.text.trim() === '' &&
                !data.videoUrl &&
                !data.videoImg &&
                !data.imgUrl
            ) {
                this.$Toast(this.$t('main.toast6'))
                return
            }
            let req = {
                commentId: item.commentId,
                contentVO: data,
                replyTargetId: type == 0 ? item.commentId : item.replyId,
                replyType: type,
                targetUserId: type == 0 ? item.userId : item.replyUserId
            }
            const res = await this.api.snsReply(req)
            if (res.code === 0) {
                this.$emit('refresh')

                this.$Toast(this.$t('main.toast4'))
                this.__commentSuccess()

                if (type === 0) {
                    this.commentText = ''
                    this.inputCount = null
                } else {
                    this.replyText = ''
                    this.replyInputCount = null
                }
            }
        },
        __showMenu() {
            this.$emit('showMenu')
        },
        __uploadProgress(res) {
            this.$set(this.uploadList, [this.uploadCount], res)
        },

        __commentSuccess() {
            this.__getCommentList(true)
            this.$set(this.uploadList, [this.uploadCount], null)
        },
        __changeUpload(name, state) {
            if (name === 'del') {
                this.$set(this.uploadList, [state], null)
            } else {
                this.uploadCount = state
                this.$refs.Upload.show(state)
            }
        },
        __changeMsgToggle(item) {
            let state = item.toggle
            this.$set(item, 'toggle', !state)
        },
        __changeCommentsToggle() {
            this.checkMore = this.comments.length
        },
        async __preview(list, index, type) {
            if (type === '1') {
                list = [list]
                this.SET_FEED_PREVIEW({
                    list,
                    index
                })
            } else {
                let id = this.item.parentDynamicId || this.item.dynamicId
                let userId = this.item.parentUserId || this.item.userId

                let permission =
                    this.item.parentPermission || this.item.permission
                if (permission === 5 && userId !== this.userInfo.userId) {
                    await this.__checkPermission()

                    if (this.checked) {
                        this.SET_FEED_PREVIEW({
                            list,
                            index
                        })
                        await this.api.snsDynamicorderUpdate({
                            dynamicId: id
                        })
                    }
                } else {
                    this.SET_FEED_PREVIEW({
                        list,
                        index
                    })
                }
            }
        },
        async __checkPermission() {
            this.checked = false
            let id = this.item.parentDynamicId || this.item.dynamicId
            let userId = this.item.parentUserId || this.item.userId
            let req = {
                authorId: userId,
                dynamicId: id
            }
            const res = await this.api.snsDynamicorderCheck(req)
            if (res.code === 500) {
                this.$Toast(res.msg)
                this.SET_FEED_PAY_LOOK({
                    id,
                    item: this.item
                })
            } else {
                this.checked = true
            }
        },
        async __collect() {
            // dynamicId	integer($int64)
            // 动态id（类型为7时有值）
            // type	integer($int32)
            // 收藏文件类型0.图片或影片;1.链接；2.文档; 3.音乐；4.聊天记录；5…语音;6.位置；7.动态
            // userId	integer($int64)
            // 用户id

            let req = {
                userId: this.userInfo.userId,
                type: 7,
                dynamicId: this.item.dynamicId
                // collectionVOList: [this.item]
            }

            const res = await this.api.snsCollectionSingleSave(req)
            if (res.code === 0) {
                this.$Toast(this.$t('main.toast5'))
                this.SET_FEED_MENU_STATE(null)
            }
        },
        async __jump(item) {
            //
            let id = item.userId
            const res = await this.api.userInfo({ id })
            this.$router.push({
                name: 'user',
                query: {
                    id: res.data.userId,
                    is: res.data.isFriend
                }
            })
        },
        //打赏数+1
        __addReward(id) {
            if (id == this.item.dynamicId) {
                this.item.rewardCount++
            }
        }
    },
    watch: {
        comments() {
            if (this.checkMore !== 1) {
                this.checkMore = this.comments.length
            }
        },
        checked() {
            this.__setDynamicLink()
        }
    },
    created() {
        this.__setDynamicLink()
        this.$bus.on('add' + this.item.dynamicId, this.__addReward)
    },
    beforeDestroy() {
        this.$bus.off('add' + this.item.dynamicId, this.__addReward)
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eff0f0;
    img {
        object-fit: cover;
        width: 36px;
        height: 36px;
    }
}
.feedNews {
    padding: 15px 0;

    background: #fff;

    .info {
        position: relative;
        padding: 10px 20px;
        display: flex;
        flex-wrap: nowrap;
        .desc {
            margin-right: 20px;
            .name {
                .text {
                    display: inline-block;
                }
                .isNeedPay {
                    display: inline-block;

                    width: 18px;
                    height: 12px;
                    background: url('./img/paid@3x.png') no-repeat center;
                    background-size: 100% 100%;
                }
            }
        }
        .menuBtn {
            position: absolute;
            right: 0;
            width: 40px;
            height: 40px;
            background: url('./img/home_edit_more@3x.png') no-repeat center top;
            background-size: 18px 4px;
            opacity: 0.4;
        }
        .menu {
            position: absolute;
            right: -160px;
            top: 20px;
            box-shadow: 0 2px 20px rgba($color: #000000, $alpha: 0.2);
            background: #ffffff;
            width: 190px;
            z-index: 10;
            > li {
                display: flex;
                align-items: center;
                padding: 0 0 0 26px;
                height: 64px;
                border-bottom: 1px solid #f1f1f1;
            }
            .icon {
                width: 18px;
                height: 18px;
                margin-right: 20px;
            }

            .collect {
                background: url('./img/dynamic_collect@2x.png');
            }
            .collected {
                background: url('./img/dynamic_collected@2x.png');
            }

            .unblock {
                background: url('./img/dynamic_unblock@2x.png');
            }
            .delete {
                background: url('./img/dynamic_delete@2x.png');
            }
        }
    }

    .txt {
        padding: 10px 20px;
        word-wrap: break-word;
    }
    .palyIcon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: url('./img/dynamic_video@2x.png');
        background-size: contain;
        z-index: 2;
    }

    .isForward {
        padding: 10px;
        background: #f1f1f1;
        border-radius: 14px;
        margin: 10px;
    }
    .content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        > div {
            height: 246px;
            position: relative;
            overflow: hidden;
            img {
                // position: absolute;
                // left: 50%;
                // top: 50%;
                // transform: translate(-50%, -50%);
                width: 540px;
                height: 246px;
                object-fit: cover;

                background: rgba($color: #000000, $alpha: 0.2);
            }
            > div {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .remain {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 50px;
                color: #ffffff;
                display: none;
                text-align: center;
                line-height: 246px;
                width: 100%;
                background: rgba($color: #000000, $alpha: 0.2);
            }
        }
        .item1 {
            width: 100%;
            margin-bottom: 4px;
        }
        .item2 {
            width: calc(50% - 2px);
            margin-right: 2px;
        }
        .item3 {
            width: calc(50% - 2px);

            margin-left: 2px;

            .remain {
                display: block;
            }
        }
    }
    .about {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        min-height: 35px;
        line-height: 35px;
        margin: 0 20px;
        padding: 0px 10px;
        justify-content: space-between;
        border-bottom: 1px solid #f7f8f0;
        .icon {
            width: 16px;
            height: 16px;
            background-size: 100% 100%;
            margin-right: 4px;
        }
        .operate {
            display: flex;

            .total {
                height: 35px;
                line-height: 35px;
            }
            > div {
                display: flex;
                align-items: center;
                padding: 0 10px;
            }

            .share {
                .icon {
                    background-image: url('./img/home_share@3x.png');
                }
            }
            .msg {
                .icon {
                    background-image: url('./img/home_message@3x.png');
                }
            }
            .like {
                .icon {
                    background-image: url('./img/home_thumb@3x.png');
                }
                .active {
                    background-image: url('./img/home_thumbA@3x.png');
                }
            }
        }
        .give {
            display: flex;
            align-items: center;
            > div {
                display: flex;
                align-items: center;
            }
            .icon {
                width: 14px;
                height: 14px;
                background-image: url('./img/dynamic_reward@2x.png');
            }
            .go {
                margin-left: 10px;
            }
        }
        .reward {
            .icon {
                background-image: url('./img/reward_pressed@3x.png');
            }
        }
        .num {
            display: flex;
            align-items: center;
            .icon {
                width: 20px;
                height: 20px;
                background-image: url('./img/thumb_sum@3x.png');
            }
        }
    }
    .contentDesc {
        display: inline-flex;
        margin: 4px 0;
        max-height: 210px;
        max-width: 400px;
        //width: 100%;
        overflow: hidden;
        border-radius: 10px;
        img {
            max-height: 210px;
        }
        div {
            position: relative;
        }
    }
    .func {
        //height: 98px;
        padding: 12px 20px;

        .tip {
            font-size: 12px;
            margin-top: 10px;
            color: #888888;
            padding-left: 45px;
        }
    }

    .msgToggle {
        margin: 10px 0;
        display: flex;
        align-items: center;
        .icon {
            width: 12px;
            height: 8px;
            background: url('./img/comment_open@2x.png');
            background-size: 100% 100%;
        }
        .active {
            background: url('./img/comment_close@2x.png');
        }
        p {
            margin-left: 4px;
        }
    }
    .comments {
        padding: 0 20px;
        .commentsList {
            display: flex;
        }
        .img {
        }
        .subject {
            // width: 100%;
            margin-left: 10px;
            > .name {
                font-weight: bold;
                line-height: 36px;
            }
            .opt {
                display: flex;
                align-items: flex-end;
                .text {
                    display: inline-flex;
                    margin: 4px 0;
                    font-size: 14px;
                    background: #f7f7f7;
                    border-radius: 14px;
                    padding: 6px 14px;
                }
                .del {
                    margin-left: 10px;
                    margin-bottom: 5px;
                    font-size: 12px;
                }
            }

            .reply {
                margin-top: 10px;
                .dis {
                    margin-left: 14px;
                    font-size: 11px;
                    color: #888888;
                }
            }
            .inputer {
                margin-top: 10px;
            }
        }
    }
    .ml45 {
        margin-left: 45px;
    }

    .link {
        color: #3f61a6;
    }
}
</style>
