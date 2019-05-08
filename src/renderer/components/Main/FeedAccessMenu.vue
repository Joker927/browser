<template>
    <div class="accessMenu"
         v-show="accessMenuState"
         :style="{top:accessMenuStyle.top +'px',left:accessMenuStyle.left+'px',zIndex:zIndex}">
        <p>{{$t('main.access')}}</p>
        <ul>
            <li @click="__selectOption(5)"
                v-if="dynamicItem.permission!==5&&dynamicItem.parentPermission!==5">
                <div class="title">
                    <span class="icon"></span>
                    <p>{{$t('main.works')}}</p>
                    <span :class="{'select':permission===5}"></span>
                </div>

            </li>
            <li @click="__selectOption(0)">
                <div class="title">
                    <span class="icon"></span>
                    <p>{{$t('main.open')}}</p>
                    <span :class="{'select':permission===0}"></span>
                </div>
            </li>
            <li @click="__selectOption(2)">
                <div class="title">
                    <span class="icon"></span>
                    <p>{{$t('main.friends')}}</p>
                    <span :class="{'select':permission===2}"></span>

                </div>

            </li>
            <li @click="__selectOption(3)">
                <div class="title">
                    <span class="icon"></span>
                    <p>{{$t('main.except')}}</p>
                    <span :class="{'select':permission===3}"></span>

                </div>
                <div class="subject"
                     v-if="permission===3">
                    <span v-for="(ele,index) in selectedList.slice(0,5)"
                          :key="index">{{ele.remarkName||ele.nickname}}、</span>
                    <span v-if="selectedList.length>5">{{$t('main.other')}}{{selectedList.length-5}}{{$t('main.people')}}</span>
                </div>
            </li>
            <li @click="__selectOption(4)">
                <div class="title">
                    <span class="icon"></span>
                    <p>{{$t('main.specified')}}</p>
                    <span :class="{'select':permission===4}"></span>

                </div>
                <div class="subject"
                     v-if="permission===4">
                    <span v-for="(ele,index) in selectedList.slice(0,5)"
                          :key="index">{{ele.remarkName||ele.nickname}}、</span>
                    <span v-if="selectedList.length>5">{{$t('main.other')}}{{selectedList.length-5}}{{$t('main.people')}}</span>
                </div>
            </li>
        </ul>
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
            permission: state => state.Feed.accessMenuPermission,
            accessMenuStyle: state => state.Feed.accessMenuStyle,
            accessMenuState: state => state.Feed.accessMenuState,
            selectedList: state => state.Feed.selected,
            dynamicItem: state => state.Feed.dynamicItem,
            zIndex: state => state.Feed.zIndex
        })
    },
    methods: {
        ...mapMutations([
            'SET_FEED_MODAL_STATE',
            'SET_FEED_MODAL_SELECTED',
            'SET_FEED_ACCESS_PERMISSION'
        ]),

        __selectOption(type) {
            switch (type) {
                case 0:
                case 2:
                    this.SET_FEED_MODAL_SELECTED([])
                    break
                case 5:
                    if (this.userInfo.setPriceFlag === '0') {
                        this.$Toast(this.$t('main.setPriceFlag'))
                    }
                    this.SET_FEED_MODAL_SELECTED([])
                    return
                    break
                case 3:
                    this.SET_FEED_MODAL_STATE({
                        state: true,
                        title: this.$t('main.except')
                    })
                    break
                case 4:
                    this.SET_FEED_MODAL_STATE({
                        state: true,
                        title: this.$t('main.specified')
                    })
                    break
            }
            this.SET_FEED_ACCESS_PERMISSION(type)
        }
    },
    watch: {},
    created() {}
}
</script>

<style lang='scss' scoped>
.accessMenu {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    padding-bottom: 12px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.4);
    > p {
        color: #7e7e7e;
        padding-left: 12px;
        line-height: 36px;
    }
    ul {
        width: 224px;

        li {
            min-height: 42px;
            background: #f5f6f7;
            padding-left: 12px;
            margin-bottom: 2px;
            cursor: pointer;
            .title {
                display: flex;
                align-items: center;
                line-height: 42px;
                > p {
                    flex-grow: 1;
                }
                > .select {
                    margin-right: 10px;
                    width: 14px;
                    height: 9px;
                    background: url('./img/dynamic_private_select@2x.png');
                }
            }
            .icon {
                margin-right: 12px;
                width: 14px;
                height: 14px;
            }

            > .subject {
                line-height: 22px;
                color: #999999;
                font-size: 12px;
                margin: 0 2px 0 12px;
            }
        }
        :nth-of-type(1) {
            .icon {
                background: url('./img/dynamic_private_works@2x.png');
            }
        }
        :nth-of-type(2) {
            .icon {
                background: url('./img/dynamic_private_public@2x.png');
            }
        }

        :nth-of-type(3) {
            .icon {
                background: url('./img/dynamic_private_friendsExcept@2x.png');
            }
        }
        :nth-of-type(4) {
            .icon {
                background: url('./img/dynamic_private_friends@2x.png');
            }
        }
        :nth-of-type(5) {
            .icon {
                background: url('./img/dynamic_private_specificFriends@2x.png');
            }
        }
        .active {
        }
        li:hover {
            color: #ffffff;
            background: #3f61a6;
        }
        :nth-of-type(1):hover {
            .icon {
                background: url('./img/dynamic_private_works_white@2x.png');
            }
        }
        :nth-of-type(2):hover {
            .icon {
                background: url('./img/dynamic_private_public_white@2x.png');
            }
        }

        :nth-of-type(3):hover {
            .icon {
                background: url('./img/dynamic_private_friendsExcept_white@2x.png');
            }
        }
        :nth-of-type(4):hover {
            .icon {
                background: url('./img/dynamic_private_friends_white@2x.png');
            }
        }
        :nth-of-type(5):hover {
            .icon {
                background: url('./img/dynamic_private_specificFriends_white@2x.png');
            }
        }
    }
}
</style>
