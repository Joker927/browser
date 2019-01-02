<template>
    <div class="mails">
        <div class="infoWrapper">
            <ul class="info">
                <li class="lis"
                    :class="{'active':item.check,'isRead':item.isRead}"
                    v-for="(item ,index) in data"
                    :key="index">
                    <div class="opt">
                        <span @click="__check(item)"
                              class="icon check"
                              :class="{'checked':item.check}"></span>
                        <span class="icon collect"
                              @click="__setCollect(item)"
                              :class="{'collected':item.isCollected}"></span>
                        <span class="icon cloud"
                              v-if="item.isClouds"></span>
                        <span class="icon local"
                              v-if="item.isLocal"></span>

                    </div>
                    <div class="desc cp"
                         @click="__checkDetails(item)">
                        <div class="name ellipsis">{{item.emailTitle}}</div>
                        <div class="desc ellipsis"
                             v-html="item.emailContentStr"></div>
                        <div class="date">{{item.date}}</div>
                    </div>
                </li>
            </ul>
            <div class="pd40"></div>
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { format, formatRelative, formatDistance, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            mailListState: state => state.Visible.mailListState
        })
    },
    methods: {
        ...mapMutations(['SET_MAIL_BRIDGE']),
        __check(item) {
            this.$set(item, 'check', !item.check)
        },
        async __setCollect(item) {
            console.log(item, 'item')
            let isCollected = item.isCollected ? 2 : 1
            let req = {
                sendOrAccept: item.sendOrAccept,
                // emailStatus: 0,
                ids: [item.id],
                isCollected: isCollected,
                userId: this.userInfo.userId
            }
            const res = await this.api.emailOperate(req)
            console.log(res, 'isCollected')
            this.$emit('refresh')
        },
        __checkDetails(item) {
            this.$emit('show', true, item)
            this.SET_MAIL_BRIDGE()
        }
    },
    watch: {
        data: {
            handler() {
                this.data.forEach(item => {
                    item.date = format(
                        new Date(item.sendTime),
                        'yyyy-MM-dd',

                        { locale: zhCN }
                    )
                })
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style  lang='scss' scoped>
.mails {
    display: flex;
    width: 100%;
    min-height: 100%;
    // height: calc(100vh - 136px); //(100vh - 80px- 56px)
    .infoWrapper {
        width: 100%;
        .info {
            width: 100%;
            .lis {
                min-height: 40px;
                border-bottom: 1px solid #e8e8e9;
                display: flex;
                align-items: center;

                .opt {
                    display: flex;
                    min-width: 120px;

                    margin-left: 20px;
                    align-items: center;
                    .icon {
                        width: 20px;
                        height: 20px;
                        background-size: 100% 100%;
                        margin-right: 12px;
                    }
                    .check {
                        background-image: url('./img/icon_check@2x.png');
                    }
                    .checked {
                        background-image: url('./img/icon_checked@2x.png');
                    }
                    .collect {
                        width: 16px;
                        height: 16px;
                        background-image: url('./img/collect.png');
                    }
                    .collected {
                        width: 16px;
                        height: 16px;
                        background-image: url('./img/collected.png');
                    }
                    .cloud {
                        width: 16px;
                        height: 16px;
                        background-image: url('./img/cloud.png');
                    }

                    .local {
                        width: 16px;
                        height: 16px;
                        background-image: url('./img/native.png');
                    }
                }
                > .desc {
                    display: flex;
                    justify-content: space-between;
                    .name {
                        width: 160px;
                        padding-right: 30px;
                        margin-left: 20px;
                    }
                    .desc {
                        width: 460px;
                        // max-height: 40px;
                        // padding-right: 110px;
                        margin-left: 20px;
                    }
                    .date {
                        padding: 0 20px;
                        min-width: 120px;
                    }
                }
            }
            .lis:hover {
                background: #eae9e8;
            }
            .active {
                background: #c9e0f7;
            }
            .isRead {
                color: #999;
            }
        }
    }
}
</style>
