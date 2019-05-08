<template>
    <div class="contain">
        <div class="title">
            {{$t('wallet.works')}}
        </div>
        <div class="contain">
            <div class="input clearfix">
                <span class="fl">{{$t('wallet.way')}}:</span>
                <div class="fl">
                    <input type="text" :placeholder="$t('wallet.placeholder')" v-model="input1" @focus="__focus(1)" />
                    <div class="option1" v-if="options1Show">
                        <div @click="__select(1, $t('wallet.way1'))">{{$t('wallet.way1')}}</div>
                        <div @click="__select(1, $t('wallet.way2'))">{{$t('wallet.way2')}}</div>
                        <div @click="__select(1, $t('wallet.way3'))">{{$t('wallet.way3')}}</div>
                    </div>
                </div>
            </div>

            <div class="input clearfix">
                <span class="fl">{{$t('wallet.cost')}}:</span>
                <div class="fl">
                    <input type="text" :placeholder="$t('wallet.placeholder1')" v-model="input2" />
                </div>
            </div>

            <div class="input clearfix">
                <span class="fl">{{$t('wallet.conversion')}}:</span>
                <div class="fl">
                    <input type="text" v-model="input3" @focus="__focus(3)" />
                    <div class="option3" v-if="options3Show">
                        <div @click="__select(3,'GIT')">GIT</div>
                        <div @click="__select(3,'BTC')">BTC</div>
                        <div @click="__select(3,'LHT')">LHT</div>
                    </div>
                </div>
            </div>

            <div class="btns">
                <div class="fl" @click="__workSet">{{$t('confirm')}}</div>
                <div class="fl">{{$t('cancel')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1: "",
            input3: "",
            input2: "",
            options1Show: false,
            options3Show: false
        };
    },
    components: {},
    computed: {},
    methods: {
        __focus(idx) {
            var index = idx;
            var flag = "options" + index + "Show";
            this[flag] = true;
        },
        __blur(idx) {
            var index = idx;
            var flag = "options" + index + "Show";
            this[flag] = false;
        },
        __select(idx, value) {
            var index = idx;
            var flag = "input" + index;
            var flag2 = "options" + index + "Show";
            this[flag2] = false;
            this[flag] = value;
        },
        //获取币种列表
        async __workSet() {
            let params = {
                currency: this.input3,
                currentcyPath: "string",
                cycleTime: 1,
                id: 1,
                price: this.input2
            };
            const res = await this.api.snsWorkSet({priceList:[params]});
            this.$Toast(res.msg)
        }
    },
    watch: {},
    created() {}
};
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
.input {
    margin-top: 80px;
    margin-left: 30px;
    span {
        color: #231815;
        font-weight: 600;
        line-height: 30px;
    }
    input {
        height: 30px;
        width: 376px;
        background: #efefef;
        outline: none;
        border: 1px solid #d6d6d6;
        padding-left: 10px;
        margin-left: 20px;
    }
    > div {
        position: relative;
    }
}
.option1 {
    position: absolute;
    left: 20px;
    z-index: 1;
    div {
        height: 30px;
        line-height: 30px;
        width: 376px;
        background: #fff;
        border: 1px solid #d6d6d6;
        border-top: none;
        padding-left: 10px;
        font-weight: 600;
    }
}
.option3 {
    position: absolute;
    left: 20px;
    z-index: 1;
    div {
        height: 30px;
        line-height: 30px;
        width: 376px;
        background: #fff;
        border: 1px solid #d6d6d6;
        border-top: none;
        padding-left: 10px;
        font-weight: 600;
    }
}
.btns {
    margin: 50px;
    > div {
        width: 66px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
    }
    > div:first-child {
        background: #3f61a6;
        color: #fff;
    }
    > div:last-child {
        background: #dbdcdc;
        margin-left: 60px;
    }
}
</style>
