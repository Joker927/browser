<template>
    <div class="mask"
         v-if="visible">
        <div class="content"
             v-if="!paid">
            <div class="title">

                <p>{{$t('cloud.payTitle')}}</p>
                <span class="x"
                      @click="__out"></span>
            </div>

            <div class="statement">
                {{form.size+''+form.sizeType.toUpperCase()}} {{form.type| typeTxt(typeArr)}} {{form.backNum}}個備份 至{{form.type|deadline}}到期
            </div>

            <div class="rank">
                <div class="clearfix selected">
                    <div class="fl">{{amount}}</div>
                    <div class="fr">GIT</div>
                </div>
            </div>

            <div class="hearImg">
                <div class="avatar">
                    <Avatar :src="info.avatar" />

                </div>
                <div>{{info.nickName}}</div>
            </div>

            <div class="btn cp"
                 @click="__confirm">{{$t('confirm')}}</div>
        </div>
        <div class="content"
             v-else>
            <div class="title">

                <p></p>
                <span class="x"
                      @click="__out"></span>
            </div>

            <div class="statement"
                 style="height:20px;">
            </div>

            <div class="hearImg">
                <div class="avatar">
                    <img :src="userInfo.avatar" />

                </div>
                <div>{{userInfo.nickname}}</div>
                <div>{{$t('cloud.paySucess')}}</div>
            </div>

            <div class="btn cp"
                 @click="__out">{{$t('confirm')}}</div>
        </div>
    </div>
</template>

<script>
import { format, addMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'

import { mapState, mapMutations } from 'vuex'
export default {
    props: {
        visible: Boolean,
        paid: Boolean,
        amount: Number,
        form: Object,
        info: Object
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        typeArr() {
            return this.$t('cloud.typeArr')
        }
    },
    filters: {
        typeTxt(value, typeArr) {
            switch (value) {
                case 1:
                    return typeArr[0]
                    break
                case 2:
                    return typeArr[1]
                    break
                case 3:
                    return typeArr[2]
                    break
                case 4:
                    return typeArr[3]
                    break
                case 5:
                    return typeArr[4]
                    break
            }
        },
        deadline(value) {
            let count = 0
            switch (value) {
                case 1:
                    count = 1
                    break
                case 2:
                    count = 2
                    break
                case 3:
                    count = 3
                    break
                case 4:
                    count = 6
                    break
                case 5:
                    count = 12
                    break
            }
            return format(addMonths(new Date(), count), 'yyyy-MM-dd', {
                locale: zhCN
            })
        }
    },
    mounted() {},
    watch: {},
    methods: {
        ...mapMutations(['']),
        __out() {
            this.$emit('update:visible', false)
        },
        __confirm() {
            this.$emit('confirm')
        }
    }
}
</script>

<style lang='scss' scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
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
    position: absolute;
    bottom: 30px;
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
    .avatar {
        width: 106px;
        height: 106px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eff0f0;
        > img {
            object-fit: cover;
            width: 106px;
            height: 106px;
        }
    }

    > div {
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
    }
}
</style>
