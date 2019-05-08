<template>
    <div class="options">
        <p>{{$t('cloud.recordTitle')}}</p>
        <div>
            <ul class="list">
                <li>
                    <!-- <span class="title active">{{$t('cloud.recordTh1')}}</span> -->
                    <!-- <div class="select">
                        <span class="cp">{{$t('cloud.recordTh2')}}</span>
                        <span class="cp">{{$t('cloud.recordTh3')}}</span>
                        <span class="cp">{{$t('cloud.recordTh4')}}</span>
                        <span class="cp">{{$t('cloud.recordTh5')}}</span>
                        <span class="cp">{{$t('cloud.recordTh6')}}</span>
                    </div> -->
                    <div class="lis">
                        <span class="cp">{{$t('cloud.recordTh7')}}</span>
                        <span class="cp">{{$t('cloud.recordTh13')}}</span>
                        <span class="cp">{{$t('cloud.recordTh8')}}</span>
                        <span class="cp">{{$t('cloud.recordTh12')}}</span>
                        <span class="cp">{{$t('cloud.recordTh9')}}</span>
                        <span class="cp">{{$t('cloud.recordTh10')}}</span>
                        <span class="cp">{{$t('cloud.recordTh11')}}</span>
                    </div>
                </li>
            </ul>
            <ul class="result">
                <li class="cp"
                    v-for="(item,index) in list"
                    :key="index">
                    <div class="lis"
                         :class="{'gary':index%2==0}">
                        <!-- <span>{{item.optType |optTypeTxt(optTypeArr)}}111</span> -->
                        <span>{{item.periodValue}}{{item.periodType |periodTypeTxt(periodTypeArr) }}</span>
                        <span>{{item.nickName}}</span>
                        <span>{{item.sizeDisplay}}</span>
                        <span>{{item.price+' '+item.currency}}</span>
                        <!-- <span>約 xxx mb 每 xxx 日</span> -->

                        <span> {{item.serviceStartDate|date}}_{{item.serviceStopDate|date}}</span>
                        <span :class="{'status':true,
                                        'waitPay':item.status==0,
                                        'wait':item.status==20,
                                        'ing':item.status==30,
                                        'cancel':item.status==90,
                                        'complete':item.status==99}">{{item.status|statusTxt( statusArr)}}</span>

                        <span v-if="item.status!==30&&item.status!==90&&item.status!==40&&item.status!==41">
                            <span class="cancelBtn"
                                  @click="__showDialog(item.id,'dialogState')">{{$t('cloud.cancel')}}</span>

                            <!-- <span class="copy">{{$t('cloud.copy')}}</span> -->
                        </span>
                        <span v-if="item.userId==userInfo.userId&&item.status==30">
                            <span class="cancelBtn"
                                  @click="__showDialog(item.id,'dialogState1')">{{$t('cloud.statusArr[4]')}}</span>

                        </span>
                        <span v-if="item.userId!==userInfo.userId&&item.status==40">
                            <span class="cancelBtn"
                                  @click="__showDialog(item.id,'dialogState2','agree')">{{$t('cloud.agree')}}</span>

                            <span class="copy"
                                  @click="__showDialog(item.id,'dialogState2','reject')">{{$t('cloud.reject')}}</span>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mask"
             v-if="dialogState"
             @click.self="__out">
            <div class="details">
                <p class="title">{{$t('cloud.tip3')}}</p>
                <div class="btn">
                    <span class="cp"
                          :class="{'isLoading':isLoading}"
                          @click="__cancel">{{$t('confirm')}}</span>
                    <span class="cp"
                          @click="__out('dialogState')">{{$t('cancel')}}</span>
                </div>
            </div>

        </div>
        <div class="mask"
             v-if="dialogState1"
             @click.self="__out">
            <div class="details">
                <p class="title">{{$t('cloud.tip3')}}</p>
                <div class="btn">
                    <span class="cp"
                          :class="{'isLoading':isLoading}"
                          @click="__close">{{$t('confirm')}}</span>
                    <span class="cp"
                          @click="__out('dialogState1')">{{$t('cancel')}}</span>
                </div>
            </div>

        </div>
        <div class="mask"
             v-if="dialogState2"
             @click.self="__out">
            <div class="details">
                <p class="title">{{$t('cloud.tip3')}}</p>
                <div class="btn">
                    <span class="cp"
                          :class="{'isLoading':isLoading}"
                          @click="__confirm">{{$t('confirm')}}</span>
                    <span class="cp"
                          @click="__out('dialogState2')">{{$t('cancel')}}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { mapState, mapMutations } from 'vuex'
export default {
    props: {},
    data() {
        return {
            list: [],

            dialogState: false,
            dialogState1: false,
            dialogState2: false,
            id: null,
            isLoading: false,
            opt: 'reject'
        }
    },
    filters: {
        statusTxt(value, statusArr) {
            let str = ''
            // 状态 0=待支付 10=待审核 20=待出租 30=出租中 40=申请关闭 41=关闭 90=取消 99=结束
            switch (value) {
                case 0:
                    return statusArr[0]

                    break
                case 10:
                    return statusArr[1]

                    break
                case 20:
                    return statusArr[2]

                    break
                case 30:
                    return statusArr[3]
                    break

                case 40:
                    return statusArr[4]

                    break
                case 41:
                    return statusArr[5]

                    break
                case 90:
                    return statusArr[6]

                    break
                case 99:
                    return statusArr[7]

                    break
            }
        },
        periodTypeTxt(value, periodTypeArr) {
            switch (value) {
                case 0:
                    return periodTypeArr[0]
                    break
                case 1:
                    return periodTypeArr[1]
                    break
                case 2:
                    return periodTypeArr[2]
                    break
                case 3:
                    return periodTypeArr[3]
                    break
                case 4:
                    return periodTypeArr[4]
                    break
            }
        },
        optTypeTxt(value, optTypeArr) {
            switch (value) {
                case 1:
                    return optTypeArr[0]
                    break
                case 2:
                    return optTypeArr[1]
                    break
            }
        },
        date(value) {
            if (!value) return ''
            return format(new Date(value), 'yyyy-MM-dd', { locale: zhCN })
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        statusArr() {
            return this.$t('cloud.statusArr')
        },
        periodTypeArr() {
            return this.$t('cloud.periodTypeArr')
        },
        optTypeArr() {
            return this.$t('cloud.optTypeArr')
        }
    },
    created() {
        this.__getList()
        let routeName = this.$route.name

        this.$bus.on('refresh' + routeName, this.__getList)
    },
    beforeDestroy() {
        let routeName = this.$route.name

        this.$bus.off('refresh' + routeName, this.__getList)
    },
    methods: {
        ...mapMutations(['SET_LOADING_STATE']),

        async __getList() {
            const res = await this.api.cloudStorageList({ optType: '' })
            if (res.code == 0) {
                this.list = res.data
            } else {
                this.$Toast(res.msg)
            }
        },
        __showDialog(id, variable, opt) {
            this.id = id
            this[variable] = true
            this.opt = opt
        },
        async __cancel() {
            if (this.isLoading) return
            this.isLoading = true
            const res = await this.api.cloudStorageCancel({
                storageId: this.id
            })
            this.isLoading = false
            this.$Toast(res.msg)
            this.__out('dialogState')
            this.__getList()
        },
        __out(variable) {
            this[variable] = false
        },

        async __close() {
            if (this.isLoading) return
            this.isLoading = true
            const res = await this.api.cloudStorageApplyClose({
                storageId: this.id
            })
            this.isLoading = false
            this.$Toast(res.msg)
            this.__out('dialogState1')
            this.__getList()
        },
        __confirm() {
            if (this.opt === 'agree') {
                this.__agree()
            } else if (this.opt === 'reject') {
                this.__reject()
            }
        },
        async __agree() {
            if (this.isLoading) return
            this.__out('dialogState2')
            this.SET_LOADING_STATE(true)
            // this.isLoading = true
            const res = await this.api.cloudStorageYesClose({
                storageId: this.id
            })
            // this.isLoading = false
            this.$Toast(res.msg)
            this.__getList()
            this.SET_LOADING_STATE(false)
        },
        async __reject() {
            if (this.isLoading) return
            this.isLoading = true
            const res = await this.api.cloudStorageNoClose({
                storageId: this.id
            })
            this.isLoading = false
            this.$Toast(res.msg)
            this.__out('dialogState2')
            this.__getList()
        }
    },
    watch: {}
}
</script>

<style lang='scss'  scoped>
.options {
    > p {
        margin: 20px 0 10px;
        font-size: 16px;
    }
    > div {
        .list {
            .active {
                border: 1px solid #3f61a6;
                color: #3f61a6;
                font-weight: bold;
                border-radius: 12px;
            }
            > li {
                height: 40px;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #e4e4e5;

                .tip {
                    font-size: 12px;
                    color: #888888;
                    margin-right: 4px;
                }
            }
        }
        .lis {
            width: 100%;
            display: flex;
            > span {
                height: 40px;
                line-height: 40px;
                font-weight: 600;
                // margin: 0 4px 0 0;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            > :nth-of-type(1) {
                width: 60px;
            }
            > :nth-of-type(2) {
                width: 62px;
            }
            > :nth-of-type(3) {
                width: 94px;
            }
            > :nth-of-type(4) {
                width: 74px;
            }
            > :nth-of-type(5) {
                width: 160px;
            }
            > :nth-of-type(6) {
                width: 60px;
            }
            > :nth-of-type(7) {
                width: 100px;
            }
        }
        .result {
            > li {
                .status {
                    font-weight: 600;
                }
                .wait {
                    color: #3f61a6;
                }
                .waitPay {
                    color: #e6a23c;
                }
                .cancel {
                    color: #fc3d3d;
                }
                .ing {
                    color: #66cc00;
                }
                .complete {
                    // #e6a23c
                    // color: #3f61a6;
                }

                > div {
                    height: 40px;
                    border: 1px solid #e4e4e5;
                    border-top: none;
                    background: #ffffff;
                    > span {
                        font-weight: 400;
                        font-size: 12px;
                        text-align: center;
                    }
                }
                .gary {
                    background: #f7f8f8;
                }
            }
            .copy,
            .cancelBtn {
                display: inline-flex;
                justify-content: center;
                line-height: 22px;
                height: 22px;
                // width: 80px;
                padding: 0 6px;
                background: #ffffff;
                border: 1px solid #3f61a6;
                border-radius: 14px;
            }
            .copy:hover,
            .cancelBtn:hover {
                color: #ffffff;
                background: #3f61a6;
                transition: 0.4s;
            }
        }
    }
}
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    .details {
        position: absolute;
        left: 50%;
        top: 55%;
        width: 260px;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #ffffff;
        .title {
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .btn {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            line-height: 40px;
            span {
                flex-grow: 1;
            }
            .isLoading {
                background: url('./img/loading.gif') no-repeat 10px center;
                background-size: 20px 20px;
            }
            > :nth-of-type(1) {
                // background: #000;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>
