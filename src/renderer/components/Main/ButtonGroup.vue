<template>

    <div class="reqBtn">
        <span class="add cp"
              @click="__add"
              v-if="typeCount===0&&!item.flag">{{$t('main.join')}}</span>
        <span class="add cp"
              @click="__add"
              v-if="typeCount===1&&!item.flag">{{$t('confirm')}}</span>
        <span class="add cp active"
              v-if="item.flag">{{text}}</span>
        <span class='ignore cp'
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
import { mapState } from 'vuex'

export default {
    props: {
        item: {
            type: Object
        },
        type: {
            type: String,
            default: 'request'
        },
        typeCount: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            text: '',
            zIndex: 1
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        async __add() {
            let res
            let data = {
                groupId: this.item.groupId,
                requesterId: this.userInfo.userId
            }
            if (this.typeCount === 0) {
                res = await this.api.groupApply(data)
                if (res.msg === 'success') {
                    this.$set(this.item, 'flag', true)
                    this.text = this.$t('main.requested')
                }
            } else {
                res = await this.api.groupAgree(data)
                if (res.msg === 'success') {
                    this.$set(this.item, 'flag', true)
                    this.text = this.$t('main.added')
                }
            }
            this.$bus.emit('getData')
        },
        async __ignore() {
            let data = {
                requesterId: this.userInfo.userId,
                groupId: this.item.groupId
            }
            const res = await this.api.groupRefust(data)
            this.$set(this.item, 'flag', true)
            this.text = this.$t('main.rejected')
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
        color: #000;
        background: #dbdcdc;
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
