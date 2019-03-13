<template>
    <div class="contain">
        <div class="title">
            {{$t('wallet.bill')}}
        </div>

        <div>
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
                    <tr v-for="(item,index) in list"
                        :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.currency}}</td>
                        <td>{{item.chargeValue}}</td>
                        <td>{{item.receivedAddress}}</td>
                        <td>{{item.createDate}}</td>
                        <td>{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            list: []
        }
    },
    components: {},
    computed: {
        ...mapState({
            addressList: state => state.UserInfo.addressList
        })
    },
    mounted() {
        this.__getRechargeRecord()
    },
    methods: {
        async __getRechargeRecord() {
            let params = {
                addressList: this.addressList
            }
            const res = await this.api.seedGetRechargeRecord(params)
            this.list = res.data.list
        }
    },
    watch: {},
    created() {}
}
</script>

<style  scoped lang='scss'>
.contain {
    margin: 30px;
}
.title {
    color: #231815;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #dfdfe0;
    height: 60px;
    line-height: 60px;
    > div:last-child {
        color: #3f61a6;
        font-size: 14px;
    }
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}
.head {
    td {
        width: 16%;
        text-align: center;
        height: 40px;
        background: #f7f7f7;
        border: 1px solid #dfdfe0;
    }
}
</style>
