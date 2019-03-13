<template>
    <div>
        <div class="inputer">
            <img class="avatar"
                 :src="userInfo.avatar"
                 alt="">
            <div class="msg">
                <div class="input">
                    <input type="text"
                           :placeholder="$t('main.placeholder2')"
                           @input="__update($event.target.value)"
                           :value="msg"
                           class="EMOJI_MENU"
                           ref="Input">
                </div>
                <div class="opt">
                    <div class="cp icon emoji EMOJI_MENU"
                         ref="Emoji"
                         v-tip="$t('main.emoji')"
                         @click="__showEmojiPanel"></div>
                    <div v-if="!item"
                         v-tip="$t('main.photo')"
                         @click="__startUpload(index)"
                         class="cp icon camera"></div>

                </div>
            </div>

        </div>
        <div class="cache"
             v-if="item">
            <span class="del cp"
                  @click="__delUpload(index)"></span>
            <div class="progressWrap"
                 v-if="item.loaded!==100">
                <div class="progress"
                     :style="{width:item.loaded +'%'}">
                    {{Math.floor(item.loaded) +'%'}}
                </div>
            </div>
            <div class="source">
                <img :src="item.src"
                     alt="">
            </div>
        </div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    model: {
        prop: 'msg',
        event: 'update'
    },
    props: {
        item: {},
        index: null,
        msg: ''
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            emojiState: state => state.Emoji.state,
            emoji: state => state.Emoji.text
        })
    },

    methods: {
        ...mapMutations([
            'SET_EMOJI_STYLE',
            'SET_EMOJI_STATE',
            'SET_EMOJI_NODE'
        ]),
        __update(value) {
            this.$emit('update', value)
        },
        __delUpload(index) {
            this.$emit('change', 'del', index)
        },
        __startUpload(index) {
            this.$emit('change', 'start', index)
        },
        __showEmojiPanel() {
            let dom = this.$refs.Emoji.getBoundingClientRect()
            let top = dom.bottom + 10
            this.SET_EMOJI_STYLE({
                left: dom.left,
                top
            })
            this.SET_EMOJI_NODE(this.$refs.Input)
            this.SET_EMOJI_STATE(true)
        }
    },
    watch: {
        emoji() {
            this.__update(this.$refs.Input.value)
        }
    },
    created() {}
}
</script>

<style lang="scss" scoped>
.avatar {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background: #000;
}
.inputer {
    display: flex;
    align-items: center;
    .msg {
        display: flex;
        align-items: center;
        //width: ;
        flex-grow: 1;
        background: #f7f7f7;
        border-radius: 30px;
        border: 1px solid #e3e4e4;
        margin: 0 0 0 10px;
        .input {
            height: 34px;
            flex-grow: 1;

            > input {
                font-size: 14px;
                border: none;
                height: 34px;
                width: 100%;
                padding: 0 10px;
                background: transparent;
                outline: none;
            }
        }
        .opt {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
            .icon {
                width: 20px;
                height: 20px;
                background-size: 100% 100%;
                margin: 4px;
            }
            .emoji {
                background-image: url('./img/emoji@2x.png');
            }
            .camera {
                background-image: url('./img/camera@2x.png');
            }
            .gif {
                background-image: url('./img/gif@2x.png');
            }
            .album {
                background-image: url('./img/album@2x.png');
            }
            .send {
                width: 41px;
                height: 31px;
                background-image: url('./img/send.png');
            }
        }
    }
}

.cache {
    position: relative;
    border: 1px solid #dfdfdf;
    margin-top: 10px;
    margin-left: 45px;
    .del {
        position: absolute;
        right: 4px;
        top: 6px;
        width: 10px;
        height: 10px;
        background: url('./img/comment_report_video_cancel@2x.png');
        background-size: 100% 100%;
    }
    .progressWrap {
        position: relative;
        width: 100%;
        height: 22px;
        .progress {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: #3f61a6;
            color: #ffffff;
            text-indent: 2em;
        }
    }
    .source {
        width: 100%;
        height: 98px;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}

.func {
    //height: 98px;
    padding: 12px 0;

    .tip {
        font-size: 12px;
        margin-top: 10px;
        color: #888888;
        padding-left: 45px;
    }
}
</style>
