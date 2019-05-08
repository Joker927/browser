<template>
    <div class="mask"
         v-if="payLookId"
         :style="{zIndex:zIndex}">
        <div class="content"
             v-if="!sureShow">
            <div class="title">
                <p>{{$t('main.paytowatch')}}</p>
                <span class="x"
                      @click="__out"></span>
            </div>

            <div class="statement">
                {{$t('main.text')}}
            </div>

            <div class="rank">
                <div class="clearfix"
                     v-for="(item,index) in priceList"
                     :key="index"
                     :class="{'selected':selected==index}"
                     @click='__select(index,item)'>
                    <div class="fl"> {{$t('main.opt'+index)}}</div>
                    <div class="fr">{{item.currency}}</div>
                    <div class="fr">{{item.price}}</div>
                </div>
            </div>

            <div class="btn"
                 @click="__configReward">{{$t('confirm')}}</div>
        </div>

        <div class="content"
             v-if="sureShow">
            <div class="title">
                <p>{{$t('main.congratulation')}}</p>
                <span class="x"
                      @click="__out"></span>
            </div>

            <div class="hearImg">
                <Avatar :src="userInfo.avatar" />
                <div>{{userInfo.nickname}}</div>
            </div>

            <div class="btn"
                 @click="__out">{{$t('confirm')}}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            selected: 0,
            selectedItem: {},
            sureShow: false,

            priceList: [],
            payUserId: 0
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            payLookId: state => state.Feed.payLookId,
            payLookItem: state => state.Feed.payLookItem,
            zIndex: state => state.Feed.zIndex
        })
    },
    mounted() {},
    watch: {
        payLookId() {
            this.__getWorkInfo()
        }
    },
    methods: {
        ...mapMutations(['SET_FEED_PAY_LOOK']),
        async __getWorkInfo() {
            this.payUserId =
                this.payLookItem.parentUserId || this.payLookItem.userId

            const res = await this.api.snsWorkInfo({
                userId: this.payLookItem.parentUserId || this.payLookItem.userId
            })
            this.priceList = res.data
            this.selectedItem = this.priceList[0]
        },
        async __configReward() {
            let type = 1
            if (this.selectedItem.price == 1) type = 0
            let params = {
                authorId: this.payUserId,
                currency: this.selectedItem.currency,
                dynamicId: this.payLookId,
                endTime: this.__getDate(new Date())
                    .split(' ')
                    .join('T'),
                orderAmount: this.selectedItem.price,
                orderType: type,
                startTime: this.__getDate(new Date())
                    .split(' ')
                    .join('T'),
                userId: this.userInfo.userId
            }
            const res = await this.api.snsDynamicorderBuy(params)
            this.sureShow = true
        },
        __getDate(timestamp) {
            var time = new Date(timestamp)
            var ye = time.getFullYear()
            var mn = time.getMonth() + 1
            var da = time.getDate()
            var h = time.getHours()
            var m = time.getMinutes()
            var s = time.getSeconds()
            mn = mn < 10 ? '0' + mn : mn
            da = da < 10 ? '0' + da : da
            h = h < 10 ? '0' + h : h
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            return ye + '-' + mn + '-' + da + ' ' + h + ':' + m + ':' + s
        },
        __out() {
            this.sureShow = false
            this.SET_FEED_PAY_LOOK({ item: {}, id: null })
        },
        __select(num, item) {
            this.selected = num
            this.selectedItem = item
        }
    }
}
</script>

<style lang='scss' scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    overflow: auto;
}
.content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 546px;
    height: 484px;
    background: #fff;
    transform: translate(-50%, -50%);
    .title {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f3f3f3;
        height: 60px;
        font-weight: 600;
        border-bottom: 1px solid #dfdfe0;
        .x {
            width: 20px;
            height: 30px;
            background: url('./img/popup_cancel@3x.png') no-repeat center;
            background-size: 15px 15px;
        }
    }
}
.statement {
    color: #717171;
    margin: 26px;
}
.rank {
    > div {
        width: 90%;
        height: 50px;
        line-height: 50px;
        background: #efefef;
        border: 1px solid #d6d6d6;
        margin-left: 5%;
        margin-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        font-weight: 600;
        > div:nth-child(2) {
            color: #3f61a6;
            margin-left: 20px;
        }
    }
    .selected {
        border: 1px solid #3f61a6;
        background: #e6eefd;
    }
}

.btn {
    width: 90%;
    margin-left: 5%;
    background: #3f61a6;
    color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 40px;
}
.hearImg {
    margin-top: 40px;
    img {
        border-radius: 50% 50%;
        margin: 0 auto;
        display: block;
        width: 106px;
    }
    > div {
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
    }
}
</style>
