<template>
    <div class="column">
        <Main></Main>
        <FeedModal></FeedModal>
        <EmojiPanel v-show="emojiState"
                    :style="{top:emojiStyle.top +'px',left:emojiStyle.left+'px'}"
                    class="emojiPanel"></EmojiPanel>
        <FeedLikeList></FeedLikeList>
        <FeedPreview></FeedPreview>
        <FeedForward></FeedForward>
        <FeedReward></FeedReward>
        <FeedPayLook></FeedPayLook>
        <FeedAccessMenu></FeedAccessMenu>
        <CollectionBtn></CollectionBtn>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Main from '@/components/Main'
import FeedModal from '@/components/Main/FeedModal'
import EmojiPanel from '@/components/Emoji'
import FeedLikeList from '@/components/Main/FeedLikeList'
import FeedPreview from '@/components/Main/FeedPreview'
import FeedForward from '@/components/Main/FeedForward'
import FeedReward from '@/components/Main/FeedReward'
import FeedPayLook from '@/components/Main/FeedPayLook'
import FeedAccessMenu from '@/components/Main/FeedAccessMenu'
import CollectionBtn from '@/components/Collection/Btn'

export default {
    data() {
        return {}
    },
    components: {
        Main,
        FeedModal,
        EmojiPanel,
        FeedLikeList,
        FeedPreview,
        FeedPayLook,
        FeedForward,
        FeedAccessMenu,
        CollectionBtn,
        FeedReward,
        FeedAccessMenu
    },
    computed: {
        ...mapState({
            emojiState: state => state.Emoji.state,
            emojiStyle: state => state.Emoji.style
        })
    },
    methods: {},
    watch: {},
    created() {}
}
</script>

<style  lang='scss' scoped>
.emojiPanel {
    position: fixed;
}
.column {
    width: 75%;
    background: #eeeeef;
}
</style>
