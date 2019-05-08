<template>

    <div class="collectionWrap">
        <div :class="{'imagesWrap':type===0}">
            <div class="item"
                 :class="{'images':type===0}"
                 v-for="(item,index) in list"
                 :key="index">
                <div class="type"
                     @contextmenu="__showMenu($event,index)"
                     @click="__view(index)"
                     v-if="item.type===7">
                    <div class="img ">
                        <Avatar :src="item.dynamicVO.avatar" />
                    </div>
                    <div class="desc">
                        {{item.dynamicVO.dynamicDesc}}
                    </div>
                    <div class="instr">
                        <p>{{item.collectionTime| date}}</p>
                        <span></span>
                    </div>
                </div>

                <div class="type"
                     @contextmenu="__showMenu($event,index)"
                     v-if="item.type===1&&type!==0">
                    <div class="link cp desc"
                         @click="__openUrl(item.collectionVOList[0].link)">
                        {{item.collectionVOList[0].link}}
                    </div>
                    <div class="instr">
                        <p>{{item.collectionTime| date}}</p>
                        <span></span>
                    </div>
                </div>
                <div class="type"
                     @contextmenu="__showMenu($event,index)"
                     @click="__view(index)"
                     v-if="item.type===0&&type!==0">
                    <div class="img">
                        <img class="img0"
                             v-if="item.collectionVOList[0].videoImg"
                             :src="item.collectionVOList[0].videoImg"
                             alt="">
                        <img class="img0"
                             v-if="item.collectionVOList[0].imgUrl"
                             :src="item.collectionVOList[0].imgUrl"
                             alt="">
                    </div>
                    <div class="desc">

                    </div>
                    <div class="instr">
                        <p>{{item.collectionTime| date}}</p>
                        <span></span>
                    </div>
                </div>
                <div class="type"
                     v-if="item.type===4&&item.chatContentList[0]"
                     @contextmenu="__showMenu($event,index)">
                    <div class="img"
                         v-if='item.chatContentList[0]'>
                        <Avatar :src="item.chatContentList[0].avatar" />

                    </div>

                    <div class="desc"
                         v-if='item.chatContentList[0]'>
                        <p>
                            {{item.chatContentList[0].userName}}
                        </p>
                        <p>{{item.chatContentList[0].message}}</p>
                    </div>
                    <div class="instr">
                        <p>{{item.collectionTime| date}}</p>
                        <span></span>
                    </div>
                </div>
                <div class=""
                     @contextmenu="__showMenu($event,index)"
                     @click="__view(index)"
                     v-if="item.type===0&&type===0">
                    <div class="img">
                        <img class="img0"
                             v-if="item.collectionVOList[0].videoImg"
                             :src="item.collectionVOList[0].videoImg"
                             alt="">
                        <img class="img0"
                             v-if="item.collectionVOList[0].imgUrl"
                             :src="item.collectionVOList[0].imgUrl"
                             alt="">
                    </div>
                    <!-- <div class="instr">
                        <p>{{item.collectionTime| date}}</p>
                        <span></span>
                    </div> -->
                </div>
            </div>
        </div>
        <PagesPreview :item='viewItem'
                      :state='viewState'
                      @out='__out'></PagesPreview>
        <div class="menu cp"
             :style="{top:menuStyle.top +'px',left:menuStyle.left+'px'}">
            <div @click="__option(0)">{{$t('collect.forward')}}</div>
            <div @click="__option(1)">{{$t('collect.del')}}</div>
        </div>
        <div class="mask"
             v-if="dialogState"
             @click.self="__out('dialogState')">
            <div class="details">
                <p class="title">{{$t('collect.dealTitle')}}</p>
                <div class="btn">
                    <span class="cp"
                          :class="{'isLoading':isLoading}"
                          @click="__del">{{$t('confirm')}}</span>
                    <span class="cp"
                          @click="__out('dialogState')">{{$t('cancel')}}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import PagesPreview from './PagesPreview'

import { mapState, mapMutations } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
export default {
    data() {
        return {
            type: '',
            list: [],
            viewState: false,
            dialogState: false,
            viewItem: {},
            active: 0,
            menuStyle: {
                top: -100,
                left: -100
            },
            isLoading: false
        }
    },
    components: { PagesPreview },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
        // isUrl(value) {
        //     let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.*(:\d+)?|\/|&|-)+)/g
        //     let str = value
        //     if (reg.test(value)) {
        //         let url = value.match(reg)[0]
        //         let index = str.indexOf(url)

        //         str = str.replace(reg, (a, b, c) => {
        //             return `<a class='link DynamicLink' href='javascript:;'  data-href=${a}> ${a}</a>`
        //         })
        //     }
        //     return str
        // }
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
    methods: {
        ...mapMutations(['ADD_TABS']),
        __showMenu(e, index) {
            this.menuStyle = {
                top: e.clientY,
                left: e.clientX
            }
            this.active = index
        },
        __option(index) {
            this.menuStyle = {
                top: -100,
                left: -100
            }
            if (index === 0) {
            } else {
                this.dialogState = true
            }
        },
        async __del() {
            if (this.isLoading) return
            this.isLoading = true
            let id = this.list[this.active]['collectionId']
            const res = await this.api.snsCollectionDelete({
                ids: [id]
            })
            if (res.code === 0) {
                this.$Toast(this.$t('collect.toast'))
                this.list = this.list.filter(item => item.collectionId !== id)
            }
            this.__out('dialogState')
            this.isLoading = false
        },
        __openUrl(url) {
            var obj = { isShow: true, title: '', url: url }
            this.ADD_TABS(obj)
        },
        __out(state) {
            this[state] = false
        },
        __view(index) {
            this.menuStyle = {
                top: -100,
                left: -100
            }
            this.viewState = true
            this.viewItem = this.list[index]
        },
        async __getDatas(currentPage = 1, pageSize = 10) {
            this.requestCompleted = false
            let req = {
                currentPage,
                pageSize,
                type: this.type,
                userId: this.userInfo.userId
            }

            const res = await this.api.snsCollectionList(req)
            if (res.code === 0) {
                this.list = this.list.concat(res.data.list)
                this.requestCompleted = true
            }
        },
        __turnPages() {
            if (this.requestCompleted) {
                if (this.currentPage !== this.totalPage) {
                    this.currentPage++
                    this.__getDatas(this.currentPage)
                }
            }
        }
    },
    watch: {
        $route: {
            handler(oldValue, newValue) {
                if (this.$route.name === 'collection') {
                    this.type = this.$route.params.type
                    if (this.type !== '') {
                        this.type = Number(this.type)
                    }
                    let oldName = oldName && oldValue.name
                    let newName = newValue && newValue.name
                    if (oldName !== newName) this.list = []
                    this.__getDatas()
                }
            },
            immediate: true
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

<style  scoped lang='scss'>
.collectionWrap {
    background: #fff;
    padding: 0 20px;
    width: 75%;
    overflow: hidden;
    .item {
        img {
            max-width: 100%;
        }

        .type {
            // display: flex;
            width: 100%;
            padding: 15px 0;
            border-bottom: 1px solid #e6e6e6;
            overflow: hidden;
            .img {
                float: left;
                height: 76px;
                width: 76px;
                margin-right: 10px;
                overflow: hidden;
                // background: #000;
            }
            .img0 {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .desc {
                float: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 500px;
            }
            .instr {
                float: right;
                width: 150px;
                margin: 0 10px;
            }
        }
    }
    .imagesWrap {
        display: flex;
        margin-top: 10px;
    }
    .images {
        display: inline-flex;
        align-items: center;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-bottom: none;
        padding: 0;
        margin: 10px 10px 0 0;
        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
    }
}
.menu {
    position: fixed;
    width: 100px;
    background: #ffffff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    z-index: 1;
    > div {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        border-bottom: 1px solid #dbdcdc;
    }
}
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
}
.details {
    position: absolute;
    left: 50%;
    top: 55%;
    width: 200px;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #ffffff;
    .title {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        line-height: 40px;
        span {
            flex-grow: 1;
        }
        .isLoading {
            background: url('./img/loading.gif') no-repeat 10px center;
            background-size: 20px 20px;
        }
        > :nth-of-type(1) {
            // background: #000;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
    }
}
.link {
    color: #3f61a6;
    flex-grow: 1;
}
</style>
