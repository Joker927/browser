<template>

    <div class="content">
        <div class="mainWrapper"
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
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Collection from '@/components/Collection'
import Side from '@/components/Side'
import Mail from '@/components/Mail'
import SideButtom from '@/components/SideButtom'
import WebIM from '@/components/WebIM'
import Group from '@/components/Group'

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
        Group
    },
    computed: {
        ...mapState({
            sideButtomState: state => state.Mail.sideButtomState,
            mailState: state => state.Mail.mailState,
            groupState: state => state.Visible.groupState,
            webIMList: state => state.WebImQueue.webIMList,
            emojiState: state => state.Emoji.state,
            likeState: state => state.Feed.likeState
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
        }
    },

    watch: {},
    created() {}
}
</script>

<style lang='scss' scoped>
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
    width: 1156px;
    margin: 0 auto;
    overflow-y: scroll;
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
