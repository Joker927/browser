<template>
    <div class="mask"
         v-if="show"
         @click.self="__out">
        <div class="box">
            <div class="tabPane">
                <div class="passWord">
                    <div class="input">
                        <input type="text"
                               disabled
                               :value="accountNo">
                    </div>
                    <div class="input">
                        <input type="text"
                               :placeholder="$t('login.inputCode')"
                               v-model="code">
                        <span class="cp"
                              @click="__sendCode">{{btnText}}</span>
                    </div>
                    <!-- <p v-html="$t('user.text')"></p> -->

                    <div class="btn">
                        <span class="forget cp"
                              @click="__checkCode">{{$t('login.findBack')}}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        accountNo: {
            type: String
        },
        type: {
            type: String
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            code: null,
            btnText: this.$t('login.sendCode')
        }
    },
    components: {},
    computed: {
        show: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        }
    },

    methods: {
        async __checkCode() {
            if (this.code.trim() === '') {
                this.$Toast(this.$t('login.inputCode'))
                return
            }
            let req = { acceptNo: this.accountNo, code: this.code }
            const res = await this.api.checkCode(req)
            if (res.code === 0) {
                let userPass = localStorage.getItem('USERPASS')
                if (typeof userPass === 'string') {
                    userPass = JSON.parse(userPass)
                }

                if (
                    userPass[this.accountNo] &&
                    userPass[this.accountNo]['password']
                ) {
                    this.$emit(
                        'inputPass',
                        userPass[this.accountNo]['password']
                    )
                } else {
                    this.$Toast(this.$t('login.toast8'))
                }
                this.__out()
            } else {
                this.$Toast(res.msg)
            }
        },
        async __sendCode() {
            if (this.timer) return

            let req = { acceptNo: this.accountNo, flag: this.type }
            const res = await this.api.sendkCode(req)
            this.$Toast(res.msg)
            if (res.code === 0) {
                this.__changeTxt('btnText', this.$t('login.sendCode'))
            }
        },
        __out() {
            this.show = false
        },
        __changeTxt(str, text) {
            if (this.timer) return
            let num = 60
            this.timer = setInterval(() => {
                this[str] = num--
                if (num <= 0) {
                    this[str] = text
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000)
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
    overflow: hidden;
}
.tabPane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    .input {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        white-space: nowrap;
        background: #efefef;
        color: #999999;
        border: 1px solid #e6e6e6;
        height: 30px;
        width: 412px;

        input {
            flex: 1;
            padding-left: 10px;
            border: none;
            outline: none;
            font-size: 14px;
            background: transparent;
        }
        span {
            color: #3f61a6;
            font-weight: bold;
            margin-right: 8px;
        }
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
