<template>

    <div class="content">
        <div class="mainWrapper"
             ref="FeedWrap"
             v-scroll.start=__clearState
             v-scroll.end=__turnPages>
            <div class="main">
                <div class="view">
                    <Collection></Collection>
                    <router-view />
                </div>
            </div>
            <Group v-if="groupState"></Group>
        </div>
        <Mail></Mail>
        <Side></Side>
        <SideButtom class="fixed"
                    v-if="sideButtomState"></SideButtom>
        <WebIM :webIMList="webIMList"></WebIM>
        <Map v-if="mapState"></Map>
        <DynamicPreview></DynamicPreview>
        <FeedPreview></FeedPreview>
        <FeedLikeList></FeedLikeList>
        <FeedForward></FeedForward>
        <FeedReward></FeedReward>
        <FeedPayLook></FeedPayLook>
        <FeedAccessMenu></FeedAccessMenu>
        <DealDetail v-if="dealState"></DealDetail>
        <PreviewImg v-if="previewState"></PreviewImg>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Collection from '@/components/Collection'
import Side from '@/components/Side'
import Mail from '@/components/Mail'
import SideButtom from '@/components/SideButtom'
import WebIM from '@/components/WebIM'
import Map from '@/components/WebIM/Map'
import Group from '@/components/Group'
import PreviewImg from '@/components/Cloud/PreviewImg'
import DealDetail from '@/components/Wallet/DealDetail'
import FeedPreview from '@/components/Main/FeedPreview'
import DynamicPreview from '@/components/Main/DynamicPreview'
import FeedLikeList from '@/components/Main/FeedLikeList'
import FeedForward from '@/components/Main/FeedForward'
import FeedReward from '@/components/Main/FeedReward'
import FeedPayLook from '@/components/Main/FeedPayLook'
import FeedAccessMenu from '@/components/Main/FeedAccessMenu'
export default {
    data() {
        return {}
    },
    components: {
        Collection,
        Side,
        Mail,
        SideButtom,
        WebIM,
        Map,
        Group,
        DealDetail,
        FeedPreview,
        DynamicPreview,
        FeedLikeList,
        FeedPayLook,
        FeedForward,
        FeedAccessMenu,
        FeedReward,
        FeedAccessMenu,
        PreviewImg
    },
    computed: {
        ...mapState({
            sideButtomState: state => state.Mail.sideButtomState,
            mailState: state => state.Mail.mailState,
            groupState: state => state.Visible.groupState,
            emojiState: state => state.Emoji.state,
            likeState: state => state.Feed.likeState,
            webIMList: state => state.WebImQueue.webIMList,
            mapState: state => state.WebImQueue.mapState,
            dealState: state => state.Wallet.dealState,
            previewState: state => state.Feed.previewState
        })
    },
    methods: {
        ...mapMutations(['SET_EMOJI_STATE', 'SET_FEED_LIKE_STATE']),
        __clearState() {
            if (this.emojiState) {
                this.SET_EMOJI_STATE(false)
            }
            if (this.likeState) {
                this.SET_FEED_LIKE_STATE({ state: false })
            }
        },
        __turnPages() {
            let routeName = this.$route.name
            // 通过bus 通知翻页
            this.$bus.emit('turnPages' + routeName)
        },
        __refresh() {
            this.$refs.FeedWrap.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    },

    watch: {},
    created() {
        this.$bus.on('refreshfeed', this.__refresh)
    },
    beforeDestroy() {
        this.$bus.off('refreshfeed', this.__refresh)
    }
}
</script>

<style lang='scss' scoped>
@media screen and (min-width: 1370px) {
    .mainWrapper {
        margin: 0 auto;
    }
}
.content {
    position: relative;
    background: #eeeeef;
    width: 100%;
    height: 100%;
}
.mainWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // width: 1156px;
    width: 100%;
    max-width: 1156px;
    padding-right: 210px;
    overflow-y: scroll;
    box-sizing: content-box;
}
.main {
    min-height: 100%;
    display: flex;
    > .view {
        display: flex;
        flex-grow: 1;
        overflow: hidden;
    }
}
</style>
