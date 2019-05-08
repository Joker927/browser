<template>
    <div class="options">
        <p>{{$t('cloud.buyTitle')}}</p>
        <div>
            <ul class="list">
                <li>
                    <span class="title">{{$t('cloud.demand')}}</span>
                    <div class="select">
                        <input type="text"
                               v-model="form.size"
                               placeholder="0">
                        <span class="cp"
                              :class="{'active':form.sizeType=='mb'}"
                              @click="__setForm('sizeType','mb')">mb</span>
                        <span class="cp"
                              :class="{'active':form.sizeType=='gb'}"
                              @click="__setForm('sizeType','gb')">gb</span>
                        <span class="cp"
                              :class="{'active':form.sizeType=='tb'}"
                              @click="__setForm('sizeType','tb')">tb</span>

                    </div>
                    <span class="tip">{{$t('cloud.tip')}}</span>
                </li>
                <li>
                    <span class="title">{{$t('cloud.opt1')}}</span>
                    <div class="select">
                        <span class="cp"
                              :class="{'active':form.type==1}"
                              @click="__setForm('type',1)">{{$t('cloud.typeArr[0]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==2}"
                              @click="__setForm('type',2)">{{$t('cloud.typeArr[1]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==3}"
                              @click="__setForm('type',3)">{{$t('cloud.typeArr[2]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==4}"
                              @click="__setForm('type',4)">{{$t('cloud.typeArr[3]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==5}"
                              @click="__setForm('type',5)">{{$t('cloud.typeArr[4]')}}</span>
                    </div>
                    <!-- <span class="tip">可複選</span> -->
                </li>
                <li>
                    <span class="title">{{$t('cloud.opt2')}}</span>
                    <div class="select">
                        <span class="cp active">GIT</span>
                    </div>
                </li>
                <li>
                    <span class="title">{{$t('cloud.opt3')}}</span>
                    <div class="select">
                        <input type="text"
                               maxlength="1"
                               @input="__limitMax"
                               v-model="form.backNum">
                    </div>
                    <span class="btn cp"
                          @click="__search">{{$t('cloud.search')}}</span>
                </li>
                <li v-if="showList.length">
                    <span class="title">{{$t('cloud.opt4')}}</span>

                    <div class="select">
                        <span class="cp"
                              :class="{'active':form.sort==1}"
                              @click="__setForm('sort',1)">{{$t('cloud.select1')}}</span>
                        <span class="cp"
                              :class="{'active':form.sort==2}"
                              @click="__setForm('sort',2)">{{$t('cloud.select2')}}</span>
                        <span class="cp"
                              :class="{'active':form.sort==3}"
                              @click="__setForm('sort',3)">{{$t('cloud.select3')}}</span>
                        <span class="cp"
                              :class="{'active':form.sort==4}"
                              @click="__setForm('sort',4)">{{$t('cloud.select4')}}</span>
                    </div>

                </li>
            </ul>
            <ul class="result"
                v-if="showList.length">
                <li class="cp"
                    :class="{'active':active===index,'gary':index%2==0}"
                    @click="__selected(item,index)"
                    v-for="(item,index) in showList"
                    :key="index">
                    <span>{{item.price}} {{item.currency}}</span>
                    <span>{{item.sizeDisplay}}</span>
                    <span>{{$t('cloud.netSpeed')}}{{item.netSpeed}}mbps</span>
                    <span>{{$t('cloud.creditRate')}}{{item.creditRate}}%</span>
                    <span @click="__showDetailDialog(item.matchNo)">{{$t('cloud.desc')}}</span>
                </li>

            </ul>
            <div class="btn"
                 v-if="showList.length">
                <div class="pagination">
                    <div class="prev"
                         :class="{'disable':current===0}"
                         @click="__changePages(-1)"></div>
                    <p>Page</p>
                    <ul>
                        <li @click="__turnPages(index)"
                            v-for="(el,index) in pages"
                            :key="index">{{index+1}} </li>
                    </ul>
                    <div class="next"
                         :class="{'disable':current===pages-1}"
                         @click="__changePages(1)"></div>
                </div>
                <div>
                    <!-- <span class="tip">1GIT計費換算: 約 xxx mb 每 xxx 日</span> -->

                    <span class="cp confirm"
                          @click="__createOrder">{{$t('confirm')}}</span>
                </div>
            </div>
        </div>
        <CloudPay :visible.sync='confirmVisible'
                  :paid='paid'
                  @refresh="__refresh"
                  @confirm='__transferToSeedAddress'
                  :form='form'
                  :info='detail[0]'
                  :amount='amount'></CloudPay>
        <CloudDetail :list='detail'
                     :state='dialogVisible'
                     @confirm='__createOrder'
                     @out='__out'></CloudDetail>
    </div>
</template>

<script>
const COUNT = 5
import { mapState, mapMutations } from 'vuex'
import CloudDetail from './CloudDetail'
import CloudPay from './CloudPay'

import { request } from 'http'
export default {
    props: {},
    data() {
        return {
            form: {
                backNum: 1,
                currency: 'GIT',
                size: '500',
                sizeType: 'gb',
                sort: 1,
                sortType: 1,
                type: 1
            },
            list: [],
            showList: [],
            current: 0,
            dialogVisible: false,
            confirmVisible: false,
            paid: false,
            detail: [],
            active: null,
            amount: 0,
            matchNo: null,
            orderList: []
        }
    },
    components: { CloudDetail, CloudPay },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            propertyList: state => state.Wallet.propertyList
        }),
        pages() {
            return Math.ceil(this.list.length / COUNT)
        }
    },
    methods: {
        ...mapMutations(['SET_LOADING_STATE']),
        __out() {
            this.dialogVisible = false
        },
        __refresh() {
            this.__search()
            let routeName = this.$route.name
            this.$bus.emit('refresh' + routeName)
        },
        async __selected(item, index) {
            this.active = index
            this.matchNo = item.matchNo
            this.__getDetail(this.matchNo)
        },
        async __search() {
            const res = await this.api.cloudMatchStorage(this.form)
            if (res.code === 0) {
                this.list = res.data
                this.showList = this.__setShowList(this.list, 0)
            }
        },
        async __createOrder() {
            this.paid = false
            this.dialogVisible = false

            const res = await this.api.cloudStorageBuy({
                matchNo: this.matchNo
            })

            this.orderList = res.data

            this.amount = this.orderList.reduce((prev, cur) => {
                return cur.orderAmount + prev
            }, 0)
            this.confirmVisible = true
        },

        async __transferToSeedAddress() {
            let contractAddress = null
            for (var i = 0; i < this.propertyList.length; i++) {
                let val = this.propertyList[i]
                if (val.name == this.form.currency) {
                    contractAddress = val.address
                    break
                }
            }

            this.SET_LOADING_STATE(true)
            let total = await this.__getMuchCurrenty(contractAddress)
            console.log(total, '0')
            if (this.amount > total) {
                this.$Toast('余额不足')
                this.SET_LOADING_STATE(false)
                return
            }
            let reqs = []
            let callbackArr = []
            this.orderList.forEach((item, index) => {
                let params = {
                    seed: this.seed,
                    addressList: this.addressList,
                    amount: item.orderAmount,
                    toAddress: item.walletAddress,
                    contractAddress: contractAddress
                }
                const req = this.api.transferToSeedAddress(params)
                reqs.push(req)
            })
            const res = await Promise.all(reqs)

            res.forEach((item, index) => {
                if (item.status !== 1) {
                    this.$Toast(res.msg)
                } else {
                    this.orderList[index]['hash'] = item.data.hash
                }
            })
            console.log(res, '__transferToSeedAddress')
            await this.__orderCallback(this.orderList)
            this.SET_LOADING_STATE(false)
            this.paid = true
        },
        async __orderCallback(array) {
            let reqs = []
            array.forEach((item, index) => {
                if (item.hash) {
                    let params = {
                        orderNo: item.orderNo,
                        payHash: item.hash,
                        success: true
                    }
                    const req = this.api.cloudOrderCallback(params)
                    reqs.push(req)
                }
            })
            const res = await Promise.all(reqs)
            console.log(res, '__orderCallback')
            // if (res.code === 0) {
            this.$bus.emit('cloudRefresh')
            this.$bus.emit('refresh' + 'cloud')

            // }
        },

        //获取多币种余额
        async __getMuchCurrenty(address) {
            let arr = []
            let total = 0
            this.propertyList.forEach(val => {
                arr.push(val.address)
            })
            let params = {
                contractAddressList: arr,
                addressList: this.addressList
            }
            const res = await this.api.getMuchCurrentySum(params)
            console.log(res, 'getCurrencyBalance')
            if (res.status === 1) {
                res.data.forEach((val, index) => {
                    if (val.address == address) {
                        total = val.totalValue
                    }
                })
            }
            return total
        },
        __setShowList(arr, p) {
            let start = p * COUNT
            return arr.slice(start, start + COUNT)
        },
        __turnPages(index) {
            this.current = index
        },
        __changePages(n) {
            this.current = this.current + n
            if (this.current <= 0) {
                this.current = 0
            } else if (this.current >= this.pages - 1) {
                this.current = this.pages - 1
            }
        },
        __showDetailDialog(matchNo) {
            this.dialogVisible = true
            this.matchNo = matchNo
        },
        async __getDetail(matchNo) {
            let req = {
                matchNo
            }
            const res = await this.api.cloudMatchStorageDetail(req)

            this.detail = res.data
        },
        __setForm(key, value) {
            this.form[key] = value
            if (key === 'sort') {
                this.current = 0
                this.__search()
            }
        },
        __limitMax() {
            if (this.form.backNum > 5) {
                this.form.backNum = 5
            }
            if (this.form.backNum < 0) {
                this.form.backNum = 1
            }
        }
    },
    watch: {
        current() {
            this.showList = this.__setShowList(this.list, this.current)
        }
    },
    created() {
        // this.__search()
    }
}
</script>

<style lang='scss'  scoped>
.options {
    > p {
        margin: 20px 0 10px;
        font-size: 16px;
    }
    > div {
        border: 1px solid #e4e4e5;
        .list {
            > li {
                height: 30px;
                font-size: 12px;

                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e4e4e5;

                .title {
                    padding: 0 20px;
                }
                .select {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    > * {
                        padding: 0 14px;
                        margin: 0 4px;
                        border-radius: 12px;
                    }
                    > span {
                        height: 24px;
                        line-height: 24px;
                        border: 1px solid transparent;
                        font-weight: 800;
                    }
                    .active {
                        color: #3f61a6;
                        border: 1px solid #3f61a6;
                        border-radius: 100px;
                    }
                    > input {
                        height: 24px;
                        max-width: 60px;
                        color: #3f61a6;
                        border: 1px solid #3f61a6;
                        outline: none;
                    }
                    > input::placeholder {
                        color: #3f61a6;
                    }
                }
                .btn {
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                    width: 100px;
                    color: #fff;
                    background: #3f61a6;
                    padding: 0 10px;
                }
                .tip {
                    font-size: 12px;
                    color: #888888;
                    margin-right: 8px;
                }
            }
        }
        .result {
            padding: 4px 0;
            display: flex;
            flex-direction: column;
            height: 138px;
            .img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                overflow: hidden;
                background: #000;
            }
            > li {
                font-size: 12px;
                padding: 4px 20px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e4e4e5;
                > :nth-of-type(1) {
                    width: 20%;
                }
                > :nth-of-type(2) {
                    width: 20%;
                }
                > :nth-of-type(3) {
                    width: 30%;
                }
                > :nth-of-type(4) {
                    width: 15%;
                }
                > :nth-of-type(5) {
                    width: 15%;
                    text-align: center;
                }
            }
            .gary {
                background: #f7f8f8;
            }
            > li:hover,
            .active {
                background: #3f61a6;
                color: #fff;
            }
        }
        > .btn {
            display: flex;
            justify-content: space-between;
            color: #fff;
            align-items: center;
            height: 28px;
            .tip {
                background: #3e3a39;
                padding: 0 10px;
                font-size: 12px;
            }
            .pagination {
                color: #000000;
                height: 100%;
                display: flex;
                align-items: center;
                > ul {
                    display: flex;
                    align-items: center;
                    > li {
                        padding: 0 3px;
                    }
                }
                .prev,
                .next {
                    width: 30px;
                    height: 100%;
                    background-size: 20px 20px;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .prev {
                    background-image: url('./img/icon_64@2x.png');
                }
                .disable {
                    opacity: 0.7;
                }
                .next {
                    background-image: url('./img/icon_65@2x.png');
                }
            }
            > div {
                display: flex;
                height: 100%;
                align-items: center;
                span {
                    text-align: center;
                    height: 100%;
                    line-height: 28px;
                }
                > span:nth-of-type(1) {
                    background: #3e3a39;
                }
                > span.confirm {
                    width: 100px;
                    background: #3f61a6;
                }
            }
        }
    }
}
</style>
