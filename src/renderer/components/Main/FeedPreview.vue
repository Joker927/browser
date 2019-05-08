<template>
    <div class="mask"
         v-if="list.length"
         :style="{zIndex:zIndex}"
         @click.self="__out">
        <div class="details">
            <div class="controls cp prev"
                 :class="{'disabled':index==0}"
                 @click="__toggle(-1)">
            </div>

            <div class="main">
                <img v-if="item.imgUrl"
                     :src="item.imgUrl"
                     @contextmenu="__showCollectBtnState($event,0)"
                     alt="">
                <video v-if="item.videoUrl"
                       :src="item.videoUrl"
                       :poster="item.videoImg"
                       @contextmenu="__showCollectBtnState($event,1)"
                       controls></video>
            </div>

            <div class="controls cp next"
                 :class="{'disabled':index==list.length-1}"
                 @click="__toggle(1)">
            </div>
        </div>
        <div class="out cp"
             @click="__out">
            {{$t('close')}}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            index: 0
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            list: state => state.Feed.previewList,
            current: state => state.Feed.previewCurrent,
            zIndex: state => state.Feed.zIndex
        }),
        item() {
            return this.list[this.index]
        }
    },
    watch: {},
    methods: {
        ...mapMutations(['SET_FEED_PREVIEW', 'SET_FEED_COLLECT_BTN']),
        __out() {
            this.SET_FEED_PREVIEW({
                list: [],
                index: 0
            })
        },
        __toggle(action) {
            this.index += action
            if (this.index >= this.list.length - 1) {
                this.index = this.list.length - 1
            }
            if (this.index <= 0) {
                this.index = 0
            }
        },

        __setIndex() {
            this.index = this.current
        },
        __showCollectBtnState(e, type) {
            // imgUrl	string
            // 图片
            // link	string
            // 链接
            // name	string
            // 名称
            // size	integer($int32)
            // 大小
            // videoImg	string
            // 视频封面图
            // videoUrl	string
            // 视频
            let data = {}
            if (type === 0) {
                data.imgUrl = this.item.imgUrl
            } else {
                data.videoImg = this.item.videoImg
                data.videoUrl = this.item.videoUrl
            }
            this.SET_FEED_COLLECT_BTN({
                state: true,
                style: {
                    top: e.clientY,
                    left: e.clientX
                },
                sourse: {
                    type: 0,
                    collectionVOList: [data]
                }
            })
        }
    },

    watch: {
        list: {
            handler() {
                if (this.list.length) this.__setIndex()

                console.log(this.list[this.index])
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss"  scoped>
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
}
.details {
    position: absolute;
    left: 50%;
    width: 80%;
    height: 100%;
    transform: translate(-50%, 0%);
    display: flex;
    align-items: center;
    .main {
        flex-grow: 1;
        display: flex;
        padding: 20px;
        width: 100%;
        height: 100%;
        align-items: center;

        img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 100%;
        }
        video {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .controls {
        width: 28px;
        height: 50px;
    }
    .prev {
        background: url('./img/dynamic_pics_previous@2x.png');
    }
    .next {
        background: url('./img/dynamic_pics_next@2x.png');
    }
    .disabled {
        opacity: 0.2;
    }
}
.out {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    // background: #000;
    border: 1px solid #ffffff;
    color: #ffffff;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
}
</style>
