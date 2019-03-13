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
                    <div class="img">
                        <img :src="item.dynamicVO.avatar"
                             alt=""></div>
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
                     @click="__view(index)"
                     v-if="item.type===0&&type!==0">
                    <div class="img">
                        <img :src="item.collectionVOList[0].videoImg"
                             alt="">
                        <img :src="item.collectionVOList[0].imgUrl"
                             alt="">
                    </div>
                    <div class="desc">

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
                        <img :src="item.collectionVOList[0].videoImg"
                             alt="">
                        <img :src="item.collectionVOList[0].imgUrl"
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
    </div>
</template>

<script>
import PagesPreview from './PagesPreview'

import { mapState, mapMutations } from 'vuex'
import { format, formatDistance, subDays } from 'date-fns'
import { zhCN, el } from 'date-fns/locale'
export default {
    data() {
        return {
            type: '',
            list: [],
            viewState: false,
            viewItem: {},
            active: 0,
            menuStyle: {
                top: -100,
                left: -100
            }
        }
    },
    components: { PagesPreview },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    filters: {
        distance(value) {
            return formatDistance(subDays(new Date(value), 0), new Date(), {
                locale: zhCN
            })
        },
        date(value) {
            return format(new Date(value), 'yyyy-MM-dd', { locale: zhCN })
        }
    },
    methods: {
        __showMenu(e, index) {
            this.menuStyle = {
                top: e.clientY,
                left: e.clientX
            }
            this.active = index
        },
        async __option(index) {
            this.menuStyle = {
                top: -100,
                left: -100
            }
            if (index === 0) {
            } else {
                let id = this.list[this.active]['collectionId']
                const res = await this.api.snsCollectionDelete({
                    ids: [id]
                })
                if (res.code === 0) {
                    this.$Toast(this.$t('collect.toast'))
                    this.list = this.list.filter(
                        item => item.collectionId !== id
                    )
                }
            }
        },
        __out() {
            this.viewState = false
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
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #e6e6e6;
        img {
            max-width: 100%;
        }
        .type {
            display: flex;
            width: 100%;
            .img {
                height: 76px;
                width: 76px;
                margin-right: 10px;
                overflow: hidden;
                // background: #000;
            }
            .desc {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: calc(100% - 176px);
            }
            .instr {
                width: 100px;
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
</style>
