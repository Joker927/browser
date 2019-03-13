<template>
    <div class="mask"
         v-if="state">

        <div class="box">
            <div class="title">{{title}}
                <span class="exit cp"
                      @click='__out'></span>
            </div>
            <div class="search">
                <input type="text"
                       @focus="__foucus"
                       @blur="__blur"
                       :placeholder="$t('main.placeholder1')" />
                <span class="icon"
                      :class="{'focusIcon':focusIcon}"></span>
            </div>

            <div class="list">
                <div v-for="(item,index) in list"
                     :key="index"
                     class="clearfix cp"
                     @click="__select(item)">
                    <div>
                        <img :src="item.avatar" />
                    </div>
                    <div>
                        {{item.nickname}}
                    </div>
                    <input type="checkbox"
                           v-model="item.isChecked" />
                </div>
            </div>

            <div class="btns clearfix">
                <div class="cp ACCESS_MENU"
                     @click="__out">{{$t('cancel')}}</div>
                <div class="cp ACCESS_MENU"
                     @click="__done">{{$t('confirm')}}</div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            focusIcon: false,
            list: []
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            state: state => state.Feed.modalState,
            title: state => state.Feed.title,
            selectedList: state => state.Feed.selected
        })
    },
    watch: {},
    methods: {
        ...mapMutations([
            'SET_FEED_MODAL_STATE',
            'SET_FEED_MODAL_SELECTED',
            'SET_FEED_ACCESS_MENU_STATE',
            'SET_FEED_ACCESS_PERMISSION'
        ]),
        __out() {
            if (!this.selectedList.length) {
                this.SET_FEED_ACCESS_PERMISSION(0)
            }
            this.SET_FEED_MODAL_STATE({ state: false, title: '' })
            this.SET_FEED_ACCESS_MENU_STATE({
                state: true
            })
        },
        __foucus() {
            this.focusIcon = true
        },
        __blur() {
            this.focusIcon = false
        },
        async __getList() {
            const res = await this.api.friendsList({
                userId: this.userInfo.userId
            })
            if (res.code === 0) {
                this.list = res.data
            }
        },
        __select(item) {
            this.$set(item, 'isChecked', !item.isChecked)
        },

        async __done() {
            let selected = this.list.filter(item => item.isChecked)

            if (selected.length) {
                this.SET_FEED_MODAL_SELECTED(selected)
                this.__out()
            }
        }
    },

    created() {
        this.__getList()
    }
}
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 500px;
    // height: 550px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 16px;
    height: 16px;
    display: block;
    background: url('./img/popup_cancel@3x.png');
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

.search {
    width: 254px;
    margin: 20px auto;
    position: relative;
    padding: 0 20px;
    width: 100%;
    input {
        width: 100%;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 30px;
    }

    .icon {
        display: block;
        width: 14px;
        height: 14px;
        background: url('./img/search-icon.png');
        background-size: 100% 100%;
        position: absolute;
        top: 5px;
        left: 30px;
    }
    .focusIcon {
        // right: 10px;
    }
}

.list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
.list {
    overflow-y: scroll;
    padding: 0 20px;
    margin: 20px auto 0;
    height: 310px;
    > div {
        width: 100%;
        height: 30px;
        margin-top: 14px;
        line-height: 30px;
        > div {
            float: left;
        }
        > div:nth-child(1) {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            background: #f1f1f1;
            img {
                width: 100%;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        input {
            float: right;
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;

            background-size: 100% 100%;
            margin-top: 9px;
            margin-right: 20px;
        }
    }
}

.btns {
    border-top: 1px solid #dfdfe0;
    width: 100%;
    padding: 14px 0;
    div {
        float: right;
        width: 66px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        margin-right: 18px;
    }
    > div:nth-child(1) {
        background: #dbdbdb;
    }
    > div:nth-child(2) {
        background: #3f61a6;
        color: #fff;
    }
}
</style>