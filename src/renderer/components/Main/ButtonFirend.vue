<template>

    <div class="reqBtn"
         :style="{zIndex:zIndex}">
        <span class="add cp NAV_MENU"
              v-if="!item.flag"
              @click="__add(item)">{{text}}</span>
        <span class="add cp active NAV_MENU"
              v-else>{{text1}}</span>
        <span class='ignore cp NAV_MENU'
              v-if="type=='request'&&!item.flag"
              @click="__changeConfirm(item,true)">{{$t('delete')}}</span>
        <div class="confirm"
             v-if="item.confirmState">
            <p>{{$t('main.confirmTxt')}}</p>
            <span class="add cp  NAV_MENU"
                  @click="__ignore(item)">{{$t('main.confirm')}}</span>
            <span class="ignore cp NAV_MENU"
                  @click="__changeConfirm(item,false)">{{$t('cancel')}}</span>
        </div>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: {
        item: {
            type: Object
        },
        type: {
            type: String,
            default: 'request'
        }
    },
    data() {
        return {
            text1: '',
            zIndex: 1
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        text() {
            if (this.type === 'request') return this.$t('main.confirm')
            return this.$t('main.add')
        }
    },
    methods: {
        ...mapActions(['SET_BADGE_COUNT']),
        async __add(item) {
            let data, res
            if (this.type === 'request') {
                data = {
                    friendId: item.userId,
                    remarkName: '',
                    userId: this.userInfo.userId
                }
                res = await this.api.friendeAdd(data)
                this.text1 = this.$t('main.added')
            } else {
                data = {
                    requesterId: item.userId
                }
                res = await this.api.friendApply(data)
                this.text1 = this.$t('main.requested')
            }
            this.$set(item, 'flag', true)
            this.SET_BADGE_COUNT()
            this.$bus.emit('getData')
        },
        async __ignore(item) {
            let data = {
                requesterId: item.userId
            }
            const res = await this.api.friendeReject(data)
            this.$set(item, 'flag', true)
            this.text1 = this.$t('main.rejected')
            this.SET_BADGE_COUNT()
        },
        __changeConfirm(item, state) {
            this.zIndex++
            this.$set(item, 'confirmState', state)
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.reqBtn {
    position: relative;
    display: flex;
    .add,
    .ignore {
        font-size: 12px;
        width: 50px;
        height: 18px;
        background: #d9d9da;
        text-align: center;
        margin-left: 10px;
    }
    .add {
        background: #3f61a6;
        color: #ffffff;
    }
    .add:hover {
        background: #355390;
        color: #ffffff;
    }
    .active {
        background: #dbdcdc;
        color: #000;
    }
}
.confirm {
    position: absolute;
    top: -10px;
    left: -20px;
    text-align: center;
    width: 140px;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba($color: #000000, $alpha: 0.5);
    padding: 5px;
    > p {
        display: block;
    }
    span {
        display: inline-block;
        margin-left: 1px;
    }
}
</style>
