<template>
    <div class="mask"
         v-if="rewardId"
         :style="{zIndex:zIndex}">
        <div class="box">
            <div class="title">{{$t('main.reward')}}
                <span class="exit"
                      @click='__out'></span>
            </div>

            <div class="contain clearfix">
                <div class="clearfix input">
                    <div class="fl">{{$t('main.selectReward')}}</div>
                    <div class="fl">
                        <div class="simulateInput"
                             @click='scrollShow=true'>{{selected.name}}</div>
                        <div class="scroll"
                             v-if="scrollShow">
                            <div v-for="(item,index) in currencyList"
                                 :key="index"
                                 @click='__select(item)'>
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix input">
                    <div class="fl">{{$t('main.inputRewardMoney')}}</div>
                    <div class="fl">
                        <input type="text"
                               v-model="inputMoney" />
                    </div>
                </div>
                <div class="btn"
                     @click="__configReward">
                    {{$t('confirm')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            currencyList: [],
            scrollShow: false,
            selected: '',
            inputMoney: '',
            otherInfo: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            rewardId: state => state.Feed.rewardId,
            rewardItem: state => state.Feed.rewardItem,
            zIndex: state => state.Feed.zIndex
        })
    },
    mounted() {
        this.__getCuurrercyList()
    },
    methods: {
        ...mapMutations(['SET_FEED_REWARD', 'SET_LOADING_STATE']),
        //获取币种列表
        async __getCuurrercyList() {
            const res = await this.api.getCuurrercyList()
            this.currencyList = res.data
            this.selected = res.data[0]
        },
        __select(item) {
            this.selected = item
            this.scrollShow = false
        },
        __out() {
            this.sureShow = false
            this.SET_FEED_REWARD({ item: {}, id: null })
        },
        //获取对方用户信息
        async __getUserInfo() {
            const res = await this.api.userInfo({ id: this.rewardItem.userId })
            this.otherInfo = res.data
        },
        __configReward() {
            let price = null
            let params = {
                currency: this.selected.name,
                authorId: this.rewardItem.userId,
                dynamicId: this.rewardId,
                rewardAmount: this.inputMoney,
                userId: this.userInfo.userId
            }
            let transferParams = {
                seed: this.seed,
                addressList: this.addressList,
                amount: this.inputMoney,
                contractAddress: this.selected.address
            }
            //获取对方用户信息
            this.api.userInfo({ id: this.rewardItem.userId }).then(otherRes => {
                //补充转账地址
                transferParams.toAddress = otherRes.data.collectionAddress
                //调用打赏接口
                this.api.snsRewardIns(params).then(res => {
                    if (res.msg == 'success') {
                        this.SET_LOADING_STATE(true)
                        //调用转账接口
                        this.api
                            .transferToSeedAddress(transferParams)
                            .then(transferRes => {
                                this.SET_LOADING_STATE(false)
                                //成功后打赏数加1
                                this.$bus.emit(
                                    'add' + params.dynamicId,
                                    params.dynamicId
                                )
                                this.__out()
                                this.$Toast(transferRes.msg)
                            })
                    } else {
                        this.$Toast(res.msg)
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 400px;
    height: 550px;
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
    width: 21px;
    height: 21px;
    display: block;
    background: url('./img/popup_cancel@3x.png');
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

.contain {
    height: 500px;
    position: relative;
}
.input {
    margin-top: 30px;
    > div:first-child {
        width: 30%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    > div:last-child {
        width: 70%;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    .simulateInput {
        background: #efefef;
        outline: none;
        border: 1px solid #d6d6d6;
        height: 30px;
        line-height: 30px;
        width: 200px;
        border-radius: 15px;
        padding-left: 10px;
    }
    input {
        background: #efefef;
        outline: none;
        border: 1px solid #d6d6d6;
        height: 30px;
        line-height: 30px;
        width: 200px;
        border-radius: 15px;
        padding-left: 10px;
    }
}
.scroll {
    position: absolute;
    z-index: 1;
    top: 35px;
    width: 200px;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #fff;
    border: 1px solid #d6d6d6;
    > div {
        width: 80%;
        height: 30px;
        line-height: 30px;
    }
}
.btn {
    background: #3f61a6;
    color: #fff;
    text-align: center;
    line-height: 30px;
    height: 30px;
    width: 120px;
    border-radius: 15px;
    margin: 60px auto;
}
</style>