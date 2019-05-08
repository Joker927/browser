<template>
    <div ref="panel"
         class="panel">

        <picker :i18n='i18n'
                title=''
                @select="__addEmoji"
                :perLine='4'
                :sheetSize='16'
                :showCategories='false'
                :showSearch='false'
                :showPreview='false' />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Picker } from 'emoji-mart-vue'
export default {
    data() {
        return {}
    },
    components: { Picker },
    computed: {
        i18n() {
            return {
                search: this.$t('search'),
                notfound: this.$t('emoji.notfound'),
                categories: {
                    search: this.$t('emoji.search'),
                    recent: this.$t('emoji.recent'),
                    people: this.$t('emoji.people'),
                    nature: this.$t('emoji.nature'),
                    foods: this.$t('emoji.foods'),
                    activity: this.$t('emoji.activity'),
                    places: this.$t('emoji.places'),
                    objects: this.$t('emoji.objects'),
                    symbols: this.$t('emoji.symbols'),
                    flags: this.$t('emoji.flags'),
                    custom: this.$t('emoji.custom')
                }
            }
        }
    },
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
