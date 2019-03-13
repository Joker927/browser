<template>
    <div>
        <div class="info">
            <div class="avatar"><img :src="item.avatar"
                     alt=""></div>
            <p>{{item.nickname}}</p>
            <div class="opt">
                <div class="msg cp">{{$t('main.sendMsg')}}</div>
                <div class="add cp"
                     v-if="item.isFriend==='0'"
                     @click="__add">{{$t('main.addFriend')}}</div>
                <div v-if="item.isFriend==='1'"
                     class="menu"
                     @click="__opt">
                    <div class="cp arrow">
                        {{$t('main.friends')}}
                    </div>
                    <ul class="list"
                        v-if="menuShow">
                        <li @click="__del">{{$t('main.del')}}</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {}
    },
    data() {
        return {
            menuShow: false
        }
    },
    components: {},
    computed: {},
    methods: {
        async __add() {
            console.log(this.item)
            let data = {
                requesterId: this.item.userId
            }
            const res = await this.api.friendApply(data)
            if (res.code === 0) {
                this.$Toast(this.$t('main.requested'))
            } else {
                this.$Toast(res.msg)
            }
        },
        __opt() {
            this.menuShow = !this.menuShow
        },
        async __del() {
            let data = {
                ids: [this.item.userId]
            }
            const res = await this.api.friendDelete(data)
            if (res.msg == 'success') {
                //  this.$Toast('已发送请求')
            }
        }
    },
    watch: {},
    created() {}
}
</script>

<style  scoped lang='scss'>
.info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid #efefe0;
    > p {
        flex-grow: 1;
        margin: 0 10px;
        font-size: 16px;
        font-weight: bold;
        color: #888888;
    }

    .avatar {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #ffffff;
        overflow: hidden;
        border: 1px solid #efefe0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.opt {
    display: flex;
    font-size: 14px;
    line-height: 22px;

    .add,
    .arrow,
    .msg {
        text-align: center;
        height: 22px;
        padding: 0 10px 0 30px;
        background: #f5f6f7 no-repeat 7px center;
        background-size: 16px 16px;
        border-radius: 4px;
        border: 1px solid #efefe0;
    }
    .msg {
        background-image: url('./img/chat@3x.png');
    }
    .add {
        margin-left: 20px;
        background-image: url('./img/friends@3x.png');
    }
    .arrow {
        position: relative;

        padding: 0 20px 0 25px;
        background-image: url('./img/friends@3x.png');
    }
    .arrow::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 3px;
        width: 10px;
        height: 8px;
        margin-top: -4px;
        background-image: url('./img/arrow.svg');
        background-size: 100% 100%;
    }
    .menu {
        margin-left: 20px;
        position: relative;
        .list {
            background: #ffffff;
            position: absolute;
            right: 0px;
            top: 24px;
            border: 1px solid #f1f1f1;
            font-size: 12px;
            > li {
                cursor: pointer;
                padding: 0 4px;
            }
        }
    }
}
</style>
