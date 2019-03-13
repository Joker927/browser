<template>
    <div class="mailMenu">
        <Scroll>
            <div>
                <div class="postal cp"
                     @click="__edit">
                    <p>{{$t('email.write')}}</p>
                </div>
                <ul class="list">
                    <li v-for="(item,index) in list"
                        :key='index'
                        :class="{'active':active==index}"
                        @click="__check(index,item)">
                        <i class="icon"
                           :class=item.class></i>
                        <p>{{item.name}}</p>
                        <span>{{item.num}}</span>
                    </li>
                </ul>
                <div class="out cp"
                     @click="__out">
                    <p>{{$t('email.leave')}}</p>
                </div>
            </div>
        </Scroll>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Scroll from '@/commom/Scroll'
export default {
    data() {
        return {
            list: [
                { name: this.$t('email.all'), num: 0, class: 'all' },
                { name: this.$t('email.collection'), class: 'collection' },
                { name: this.$t('email.backup'), class: 'backup' },
                { name: this.$t('email.draft'), class: 'draft' },
                { name: this.$t('email.white'), class: 'white' },
                { name: this.$t('email.black'), class: 'black' },
                { name: this.$t('email.cloud'), class: 'cloud' },
                { name: this.$t('email.local'), class: 'local' },
                { name: this.$t('email.trash'), class: 'trash' }
                // { name: '收件夾', num: 2 }
            ],
            active: 0
        }
    },
    components: { Scroll },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            editPanel: state => state.Mail.editPanel,
            mailBridge: state => state.Mail.mailBridge
        })
    },
    methods: {
        ...mapMutations(['SET_MAIL_STATE', 'SET_MAIL_PANEL_STATE']),
        __out() {
            this.SET_MAIL_STATE()
        },
        __check(index, item) {
            this.active = index
            this.$emit('selected', item.class)
        },
        __edit() {
            if (this.editPanel) return
            this.SET_MAIL_PANEL_STATE({ name: 'titleStatus', state: '0' })
            this.SET_MAIL_PANEL_STATE({ name: 'editPanel', state: true })
        },
        async __getData() {
            let req = {
                id: this.userInfo.userId
            }
            const res = await this.api.emailUnreadnum(req)

            if (res.code === 0) {
                this.list.forEach((item, index) => {
                    if (item.class === 'all') {
                        this.$set(item, 'num', res.data)
                    }
                })
            }
        }
    },
    watch: {
        mailBridge() {
            this.__getData()
        }
    },
    created() {
        this.__getData()
    }
}
</script>

<style  lang='scss' scoped>
.mailMenu {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 210px;
    border-right: 1px solid #e8e8e9;
    overflow: hidden;
    .list {
        > li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 28px;
            margin-right: 10px;
            cursor: pointer;
            > span {
                width: 28px;
                padding-right: 10px;
            }
            > p {
                flex-grow: 1;
            }
            .icon {
                width: 20px;
                height: 20px;
                margin: 0 10px 0 14px;
                background-size: 100% 100%;
            }

            .collection {
                background-image: url('./img/icon_2@2x.png');
            }
            .all {
                background-image: url('./img/icon_4@2x.png');
            }

            .backup {
                background-image: url('./img/icon_6@2x.png');
            }

            .draft {
                background-image: url('./img/icon_7@2x.png');
            }

            .white {
                background-image: url('./img/icon_8@2x.png');
            }

            .black {
                background-image: url('./img/icon_9@2x.png');
            }

            .cloud {
                background-image: url('./img/icon_10@2x.png');
            }

            .local {
                background-image: url('./img/icon_11@2x.png');
            }

            .trash {
                background-image: url('./img/icon_12@2x.png');
            }
        }
        > li.active {
            background: #3f61a6;
            border-radius: 0 5px 5px 0;
            > span,
            > p {
                color: #ffffff;
            }
            .collection {
                background-image: url('./img/icon_a2@2x.png');
            }
            .all {
                background-image: url('./img/icon_a4@2x.png');
            }

            .backup {
                background-image: url('./img/icon_a6@2x.png');
            }

            .draft {
                background-image: url('./img/icon_a7@2x.png');
            }

            .white {
                background-image: url('./img/icon_a8@2x.png');
            }

            .black {
                background-image: url('./img/icon_a9@2x.png');
            }

            .cloud {
                background-image: url('./img/icon_a10@2x.png');
            }

            .local {
                background-image: url('./img/icon_a11@2x.png');
            }

            .trash {
                background-image: url('./img/icon_a12@2x.png');
            }
        }
    }
    .postal,
    .out {
        margin: 12px 8px;
        width: 114px;
        height: 42px;
        font-size: 16px;
        background: #3e3a39;

        border-radius: 6px;
        color: #ffffff;
        line-height: 42px;
        text-align: center;
        > p {
            padding-left: 16px;
            background: url('./img/add.png') no-repeat 16px center;
            background-size: 14px 14px;
        }
    }
    .out {
        width: 134px;
        border-radius: 0 6px 6px 0;
        margin: 30px 0;
        > p {
            padding-left: 16px;
            background: url('./img/out.png') no-repeat 16px center;
            background-size: 9px 12px;
        }
    }
}
</style>
