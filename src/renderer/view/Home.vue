<template>
    <div class="column">
        <Main></Main>
        <FeedModal></FeedModal>
        <EmojiPanel v-show="emojiState"
                    :style="{top:emojiStyle.top +'px',left:emojiStyle.left+'px'}"
                    class="emojiPanel"></EmojiPanel>

        <CollectionBtn></CollectionBtn>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Main from '@/components/Main'
import FeedModal from '@/components/Main/FeedModal'
import EmojiPanel from '@/components/Emoji'

import CollectionBtn from '@/components/Collection/Btn'

export default {
    data() {
        return {}
    },
    components: {
        Main,
        FeedModal,
        EmojiPanel,

        CollectionBtn
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
