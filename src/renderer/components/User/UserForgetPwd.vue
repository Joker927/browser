<template>
    <div class="mask"
         v-if="show"
         @click.self="__out">
        <div class="box">
            <div class="tabPane">

                <div class="passWord">

                    <div class="input">

                        <input type="text"
                               :placeholder="$t('user.placeholder')"
                               v-model="accountNo">
                        <p v-html="$t('user.text')"></p>
                    </div>
                    <div class="btn">
                        <span class="forget cp"
                              @click="__changePwd">{{$t('user.forgotPwd')}}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            show: false
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        accountNo() {
            return this.userInfo.mobileNo || this.userInfo.email
        }
    },

    methods: {
        async __changePwd() {
            if (this.accountNo.trim() === '') {
                this.$Toast(this.$t('user.text1'))
                return
            }
            let accountType = 1
            let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            if (reg.test(this.accountNo)) {
                accountType = 0
            }

            let req = { accountNo: this.accountNo, accountType }
            const res = await this.api.forgetPwd(req)
            console.log(res, '__changePwd()')
            this.$Toast(res.msg)
        },
        __out() {
            this.show = false
        },
        __show() {
            this.show = true
        }
    },

    watch: {}
}
</script>

<style lang='scss' scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 606px;
    height: 210px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.tabPane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    .input {
        white-space: nowrap;
        input {
            height: 30px;
            width: 412px;
            padding-left: 10px;
            background: #efefef;
            border: 1px solid #e6e6e6;
            outline: none;
            display: block;
            font-size: 14px;
            margin-bottom: 16px;
        }
        color: #999999;
    }
    .btn {
        margin-top: 28px;
        > span {
            margin-right: 20px;
            border-radius: 3px;
            padding: 4px 10px;
        }

        .forget {
            background: #3f61a6;
            color: #ffffff;
        }
    }
}
</style>
