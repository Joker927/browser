<template>

    <div class="collect cp"
         v-show="collectBtnState"
         :style="{top:collectBtnStyle.top +'px',left:collectBtnStyle.left+'px'}"
         @click="__collect">
        <p>{{$t('collect.collect')}}</p>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            collectBtnState: state => state.Feed.collectBtnState,
            collectBtnStyle: state => state.Feed.collectBtnStyle,
            collectSourse: state => state.Feed.collectSourse
        })
    },
    methods: {
        ...mapMutations(['SET_FEED_COLLECT_BTN']),

        async __collect() {
            // collectionVOList	[
            // 收藏内容
            // CollectionVO{
            // address	string
            // 收藏的地点名称
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
            // }]
            // dynamicId	integer($int64)
            // 动态id（类型为7时有值）
            // type	integer($int32)
            // 收藏文件类型0.图片或影片;1.链接；2.文档; 3.音乐；4.聊天记录；5…语音;6.位置；7.动态
            // userId	integer($int64)
            // 用户id

            let req = Object.assign(this.collectSourse, {
                userId: this.userInfo.userId
            })

            const res = await this.api.snsCollectSave(req)
            console.log(res, 'snsCollectSave')
            if (res.code === 0) {
                this.$Toast('收藏成功')
                this.SET_FEED_COLLECT_BTN({
                    state: false,
                    style: {
                        top: 0,
                        left: 0
                    },
                    sourse: {}
                })
            }
        }
    },
    watch: {},
    created() {}
}
</script>

<style  scoped lang='scss'>
.collect {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    background: #ffffff;
    color: #000000;
    padding: 4px 10px;
    z-index: 100001;
}
</style>
