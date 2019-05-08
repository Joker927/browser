<template>
    <div class="contain">
        <div class="title">
            {{$t('nav.bill')}}
        </div>

        <!-- <div>
            <table>
                <thead>
                    <tr class="head">
                        <td>{{$t('wallet.td')}}</td>
                        <td>{{$t('wallet.td1')}}</td>
                        <td>{{$t('wallet.td2')}}</td>
                        <td>{{$t('wallet.td3')}}</td>
                        <td>{{$t('wallet.td4')}}</td>
                        <td>{{$t('wallet.td5')}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" :key="index" class="body">
                        <td>{{item.id}}</td>
                        <td>{{item.currency}}</td>
                        <td>{{item.chargeValue}}</td>
                        <td style="max-width:200px;">{{item.receivedAddress}}</td>
                        <td>{{item.createDate}}</td>
                        <td>{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->

        <div class="clearfix box">
            <div class="fl">
                <div v-for="(item,index) in navList" :key="index" :class="{acNav:acNav==index}" @click="__nav(index)">
                    {{item}}
                </div>
            </div>
            <div class="fl">
                <div class="nav clearfix">
                    <div class="fl" v-for="(item,index) in opt" :key="index" :class="{acOpt:acOpt==index}" @click="__opt(index)">
                        {{item}}
                    </div>
                </div>
                <div class="list">
                    <div v-for="(item,index) in list" :key="index" class="clearfix">
                        <div class="fl">{{item.rewardTime}}</div>
                        <div class="fl">{{item.text}}</div>
                        <div class="fr">{{item.rewardAmount}}{{item.currency}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            list: [],
            navList: [
                this.$t("wallet.dynamicReward"),
                this.$t("wallet.redRecord"),
                this.$t("wallet.transferRecord")
            ],
            acNav: 0,
            opt: [
                this.$t("wallet.opt1"),
                this.$t("wallet.opt2"),
                this.$t("wallet.opt3")
            ],
            acOpt: 0
        };
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList
        })
    },
    mounted() {
        this.__dtList(1, true);
    },
    methods: {
        getTime(timestamp) {
            var time = new Date(timestamp);
            var ye = time.getFullYear();
            var mn = time.getMonth() + 1;
            var da = time.getDate();
            var h = time.getHours();
            var m = time.getMinutes();
            var s = time.getSeconds();
            mn = mn < 10 ? "0" + mn : mn;
            da = da < 10 ? "0" + da : da;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            return ye + "-" + mn + "-" + da + " " + h + ":" + m + ":" + s;
        },
        __nav(index) {
            switch (index) {
                case 0:
                    this.__dtList(1, true);
                    break;
                case 1:
                    this.__hbList(1, true);
                    break;
                case 2:
                    this.__zzList(1, true);
                    break;
            }
            this.acNav = index;
        },
        __opt(index) {
            let isAll = false;
            if (index == 0) isAll = true;
            let type = 0;
            if (index == 2) type = 1;
            switch (this.acNav) {
                case 0:
                    this.__dtList(type, isAll);
                    break;
                case 1:
                    this.__hbList(type, isAll);
                    break;
                case 2:
                    this.__zzList(type, isAll);
                    break;
            }
            this.acOpt = index;
        },
        async __getRechargeRecord() {
            let params = {
                addressList: this.addressList
            };
            const res = await this.api.seedGetRechargeRecord(params);
            this.list = res.data.list;
        },
        //动态打赏
        __dtList(type, isAll) {
            let params = {
                currentPage: 1,
                pageSize: 50,
                type: type,
                userId: this.userInfo.userId
            };
            this.api.snsDynamicordList(params).then(res => {
                this.list = res.data.list;
                if (isAll) {
                    if (params.type == 0) {
                        params.type = 1;
                    } else {
                        params.type = 0;
                    }
                    this.api.snsDynamicordList(params).then(res => {
                        this.list = this.list.concat(res.data.list);

                        this.list.forEach(val => {
                            val.rewardTime = this.getTime(val.rewardTime);
                            //收到
                            if (val.type == 0) {
                                val.text =
                                    val.userName +
                                    " " +
                                    this.$t("wallet.forYou");
                                val.rewardAmount = "+" + val.rewardAmount;
                            } else {
                                val.text =
                                    this.$t("wallet.youFor") +
                                    " " +
                                    val.authorName +
                                    " " +
                                    this.$t("main.reward");
                                val.rewardAmount = "-" + val.rewardAmount;
                            }
                        });
                    });
                }
                if (!isAll) {
                    this.list.forEach(val => {
                        val.rewardTime = this.getTime(val.rewardTime);
                        //收到
                        if (val.type == 0) {
                            val.text =
                                val.userName + " " + this.$t("wallet.forYou");
                            val.rewardAmount = "+" + val.rewardAmount;
                        } else {
                            val.text =
                                this.$t("wallet.youFor") +
                                " " +
                                val.authorName +
                                " " +
                                this.$t("main.reward");
                            val.rewardAmount = "-" + val.rewardAmount;
                        }
                    });
                }
            });
        },
        //红包
        __hbList(type, isAll) {
            let params = {
                currentPage: 1,
                pageSize: 50,
                type: type,
                userId: this.userInfo.userId
            };
            this.api.snsRedList(params).then(res => {
                this.list = res.data.list;
                if (isAll) {
                    if (params.type == 0) {
                        params.type = 1;
                    } else {
                        params.type = 0;
                    }
                    this.api.snsRedList(params).then(res => {
                        this.list = this.list.concat(res.data.list);

                        this.list.forEach(val => {
                            this.$set(
                                val,
                                "rewardTime",
                                this.getTime(val.time)
                            );
                            //收到
                            if (val.type == 0) {
                                this.$set(
                                    val,
                                    "text",
                                    val.senderUserName +
                                        " " +
                                        this.$t("wallet.forYouRed")
                                );
                                this.$set(
                                    val,
                                    "rewardAmount",
                                    "+" + val.amount
                                );
                            } else {
                                this.$set(
                                    val,
                                    "text",
                                    this.$t("wallet.youFor") +
                                        " " +
                                        val.receiveUserName +
                                        " " +
                                        this.$t("webim.red")
                                );
                                this.$set(
                                    val,
                                    "rewardAmount",
                                    "-" + val.amount
                                );
                            }
                        });
                    });
                }
                this.list.forEach(val => {
                    this.$set(val, "rewardTime", this.getTime(val.time));
                    //收到
                    if (val.type == 0) {
                        this.$set(
                            val,
                            "text",
                            val.senderUserName +
                                " " +
                                this.$t("wallet.forYouRed")
                        );
                        this.$set(val, "rewardAmount", "+" + val.amount);
                    } else {
                        this.$set(
                            val,
                            "text",
                            this.$t("wallet.youFor") +
                                " " +
                                val.receiveUserName +
                                " " +
                                this.$t("webim.red")
                        );
                        this.$set(val, "rewardAmount", "-" + val.amount);
                    }
                });
            });
        },
        //转账
        __zzList(type, isAll) {
            let params = {
                currentPage: 1,
                pageSize: 50,
                type: type,
                userId: this.userInfo.userId
            };
            this.api.snstransferList(params).then(res => {
                this.list = res.data.list;
                if (isAll) {
                    if (params.type == 0) {
                        params.type = 1;
                    } else {
                        params.type = 0;
                    }
                    this.api.snstransferList(params).then(res => {
                        this.list = this.list.concat(res.data.list);

                        this.list.forEach(val => {
                            this.$set(
                                val,
                                "rewardTime",
                                this.getTime(val.createTime)
                            );
                            //收到
                            if (val.type == 0) {
                                this.$set(
                                    val,
                                    "text",
                                    val.userName +
                                        " " +
                                        this.$t("wallet.forYouTransfer")
                                );
                                this.$set(
                                    val,
                                    "rewardAmount",
                                    "+" + val.amount
                                );
                            } else {
                                this.$set(
                                    val,
                                    "text",
                                    this.$t("wallet.youFor") +
                                        " " +
                                        val.payeeName +
                                        " " +
                                        this.$t("webim.transfer")
                                );
                                this.$set(
                                    val,
                                    "rewardAmount",
                                    "-" + val.amount
                                );
                            }
                        });
                    });
                }
                this.list.forEach(val => {
                    this.$set(val, "rewardTime", this.getTime(val.createTime));
                    //收到
                    if (val.type == 0) {
                        this.$set(
                            val,
                            "text",
                            val.userName +
                                " " +
                                this.$t("wallet.forYouTransfer")
                        );
                        this.$set(val, "rewardAmount", "+" + val.amount);
                    } else {
                        this.$set(
                            val,
                            "text",
                            this.$t("wallet.youFor") +
                                " " +
                                val.payeeName +
                                " " +
                                this.$t("webim.transfer")
                        );
                        this.$set(val, "rewardAmount", "-" + val.amount);
                    }
                });
            });
        }
    },
    watch: {},
    created() {}
};
</script>

<style  scoped lang='scss'>
.contain {
    margin: 30px;
    margin-left: 0;
}
.title {
    color: #231815;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #dfdfe0;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    > div:last-child {
        color: #3f61a6;
        font-size: 14px;
    }
}
// table {
//     width: 100%;
//     border-collapse: collapse;
//     margin-top: 10px;
// }
// .head {
//     td {
//         width: 16%;
//         text-align: center;
//         height: 40px;
//         background: #f7f7f7;
//         border: 1px solid #dfdfe0;
//     }
// }
// .body{
//     border: 1px solid #dfdfe0;
//     text-align: center;
//     td{
//         border: 1px solid #dfdfe0;
//         word-wrap: break-word;
//     }
// }
.box {
    > div:first-child {
        width: 120px;
        border-right: 1px solid #eaeaea;
        min-height: 600px;
        padding-top: 60px;
        > div {
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #eaeaea;
        }
    }
    > div:last-child {
        width: calc(100% - 120px);
        border-bottom: 1px solid #eaeaea;
        .nav {
            height: 45px;
            line-height: 45px;
            width: 100%;
            > div {
                width: 80px;
                text-align: center;
            }
        }
    }
}
.acNav {
    background: #3f61a6;
    color: #fff;
}
.acOpt {
    border-bottom: 2px solid #3f61a6;
}
.list {
    margin-top: 5px;
    > div {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eaeaea;
        text-align: center;
        > div:first-child {
            color: #999;
            width: 180px;
        }
        > div:last-child {
            margin-right: 10px;
        }
    }
}
</style>
