<template>
    <div class="panel EMOJI_MENU"
         :style="{height:styles.height +'px'}">
        <picker :i18n='i18n'
                title=''
                :showSearch='false'
                :showPreview='false'
                :perLine='8'
                :style="{height:styles.height +'px'}"
                @select="__addEmoji" />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Picker } from 'emoji-mart-vue'
export default {
    props: {
        styles: {
            type: Object,
            default: () => {
                return {
                    height: 300
                }
            }
        }
    },
    data() {
        return {
            i18n: {
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
    components: { Picker },
    computed: {},
    methods: {
        ...mapMutations(['SET_EMOJI_TEXT']),
        __addEmoji(emoji) {
            this.$emit('setEmoji', emoji.native)
            this.SET_EMOJI_TEXT(emoji.native)
        }
    },
    watch: {},
    mounted() {},
    created() {}
}
</script>

<style scoped lang='scss'>
.panel {
    background: #ffffff;
    box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.4);
    border-radius: 10px;
}
</style>
