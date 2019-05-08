<template>
    <div class="mask"
         v-if="state"
         @click.self="__out">
        <div class="main">
            <div class="title">
                <p>{{$t('cloud.descTitle')}}</p>
                <span class="x"
                      @click="__out"></span>
            </div>
            <div class="details">
                <div class="title">
                    <span>{{$t('cloud.detailsTh1')}}</span>
                    <span>{{$t('cloud.detailsTh2')}}</span>
                    <span>{{$t('cloud.detailsTh3')}}</span>
                    <span>{{$t('cloud.detailsTh4')}}</span>
                    <span>{{$t('cloud.detailsTh5')}}</span>
                </div>
                <ul class="result"
                    v-if="list.length">
                    <li class="cp"
                        v-for="(item,index) in list"
                        :key="index">
                        <span class="name">
                            <div class="img">
                                <Avatar :src="item.avatar"></Avatar>
                            </div>
                            <span>{{item.nickName}}</span>
                        </span>

                        <span>Lv{{item.level}}</span>
                        <span>{{$t('cloud.creditRate')}}{{item.creditRate}}%</span>
                        <span>{{item.netSpeed}}mbps</span>
                        <span>{{item.price}} {{item.currency}}</span>
                    </li>
                </ul>

            </div>
            <div class="out cp"
                 @click="__confirm">
                <span>
                    {{$t('confirm')}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array,
        state: { type: Boolean, default: false }
    },
    data() {
        return {}
    },
    components: {},
    computed: {},
    methods: {
        __out() {
            this.$emit('out')
        },
        __confirm() {
            this.$emit('confirm')
        }
    },
    watch: {},
    created() {}
}
</script>

<style  scoped lang="scss">
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
}
.main {
    position: absolute;
    left: 50%;
    top: 55%;
    width: 600px;

    transform: translate(-50%, -50%);
    background: #ffffff;
    > .title {
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
    .details {
        .title {
            display: flex;
            padding: 0 20px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #dfdfe0;

            > :nth-of-type(1) {
                width: 30%;
            }
            > :nth-of-type(2) {
                width: 10%;
            }
            > :nth-of-type(3) {
                width: 20%;
            }
            > :nth-of-type(4) {
                width: 20%;
            }
            > :nth-of-type(5) {
                width: 20%;
            }
        }
        .result {
            padding: 6px 0;
            max-height: 360px;
            overflow: auto;
            .name {
                // flex-grow: 1;
                display: flex;
            }
            .img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 20px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #eff0f0;
                > img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            > li {
                font-size: 14px;
                padding: 4px 20px;
                display: flex;
                text-align: center;
                > :nth-of-type(1) {
                    width: 30%;
                }
                > :nth-of-type(2) {
                    width: 10%;
                }
                > :nth-of-type(3) {
                    width: 20%;
                }
                > :nth-of-type(4) {
                    width: 20%;
                }
                > :nth-of-type(5) {
                    width: 20%;
                }
            }
            > li:hover {
                background: #3f61a6;
                color: #fff;
            }
        }
    }
    .out {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #e4e4e5;
        font-size: 14px;
        padding: 10px 20px;
        span {
            height: 24px;
            padding: 0 20px;
            line-height: 24px;
            background: #3f61a6;
            color: #ffffff;
            text-align: center;
        }
    }
}
</style>

 

