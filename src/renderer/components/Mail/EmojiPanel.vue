<template>
    <div ref="panel"
         class="panel">

        <picker :i18n='i18n'
                title=''
                @select="__addEmoji" />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Picker } from 'emoji-mart-vue'
export default {
    data() {
        return {
            i18n: {
                search: '搜索',
                notfound: '没有找到该表情',
                categories: {
                    search: '搜索结果',
                    recent: '最近',
                    people: '人',
                    nature: '生物',
                    foods: '食物',
                    activity: '活动',
                    places: '地点',
                    objects: '元素',
                    symbols: '符号',
                    flags: '旗',
                    custom: '自定义'
                }
            }
        }
    },
    components: { Picker },
    computed: {},
    methods: {
        __addEmoji(emoji) {
            this.$emit('setEmoji', emoji.native)
        }
    },
    watch: {},
    mounted() {
        this.$nextTick(() => {})
    },
    created() {}
}
</script>

<style scoped lang='scss'>
.panel {
}
</style>
