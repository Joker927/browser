<template>
    <div class="content">
        <div>
            <div class="titleWrap">
                <div class="title">
                    Angel Explorer
                </div>
            </div>
            <div class="box">
                <div class="login"
                     @keyup.enter="__login">
                    <h1>{{$t('login.login')}}</h1>
                    <div v-html="$t('login.text')"></div>
                    <div class="m-10">
                        <div class="input-title">{{$t('login.account')}}</div>
                        <ul class="tab cp">

                            <li class="mail"
                                @click="__tab('0')"
                                :class="{'active':loginForm.loginType==='0'}"></li>
                            <li class="tel"
                                @click="__tab('1')"
                                :class="{'active':loginForm.loginType==='1'}"></li>
                        </ul>

                        <div class="input">
                            <div class="account">

                                <p class="selected cp"
                                   v-if="loginForm.loginType==='1'"
                                   @click="__selectVisible('selectShow')">{{defaultAreaCode.value}} {{defaultAreaCode.code}}
                                </p>
                                <input type="text"
                                       v-else
                                       v-model="accountNo"
                                       :placeholder="$t('login.placeholder')">
                                <div class="selectWrap"
                                     v-show="selectShow">
                                    <ul class="select">
                                        <li class="opt"
                                            :key="index"
                                            @click="__select(item,'selectShow')"
                                            v-for="(item ,index) in areaCodes">
                                            {{item.code}}</li>
                                    </ul>

                                </div>
                            </div>
                            <div class="account">
                                <input v-if="loginForm.loginType==='1'"
                                       type="text"
                                       v-model="accountNo"
                                       :placeholder="$t('login.placeholder1')">
                            </div>
                        </div>

                    </div>
                    <div class="rule-hint"
                         v-html="$t('login.tips')">
                    </div>
                    <div class="m-10">

                        <div class="input-title">{{$t('login.password')}}</div>
                        <div class="pwd"><input autocomplete
                                   :type="passwordType[0].status"
                                   v-model="loginForm.password" />
                            <span class="eye"
                                  @click="__watchPwd(0)"
                                  :class="{'active':passwordType[0].flag}"></span>
                        </div>
                        <div class="checkbox ">
                            <input type="checkbox"
                                   v-model="rememberPass"><span @click="__changeRememberPass"
                                  class="cp">{{$t('login.remember')}}</span>
                        </div>
                        <NodeSetting ></NodeSetting>
                    </div>

                    <div class="btns">
                        <button class="cp"
                                @click="__forgetPwd">{{txt}}</button>
                        <button class="b-blue cp"
                                @click="__login">{{$t('login.login')}}</button>
                    </div>
                    <div class="tip"
                         v-if="tipShow"
                         v-html="tip">

                    </div>
                </div>

                <div class="register"
                     @keyup.enter="__register">
                    <h1>{{$t('login.create')}}</h1>
                    <div v-html="$t('login.text')"></div>
                    <div class="m-10">
                        <div class="input-title">{{$t('login.nickName')}}</div><input type="text"
                               :placeholder="$t('login.placeholder2')"
                               v-model="registerForm.nickname" />
                    </div>
                    <div class="m-10">
                        <div class="input-title">{{$t('login.account')}}</div>
                        <ul class="tab cp">

                            <li class="mail"
                                @click="__tab1('0')"
                                :class="{'active':registerForm.registerType==='0'}"></li>
                            <li class="tel"
                                @click="__tab1('1')"
                                :class="{'active':registerForm.registerType==='1'}"></li>
                        </ul>
                    </div>
                    <div class="input">
                        <div class="account">

                            <p class="selected cp"
                               v-if="registerForm.registerType==='1'"
                               @click="__selectVisible('selectShow1')">{{defaultAreaCode.value}} {{defaultAreaCode.code}}
                            </p>
                            <input type="text"
                                   v-else
                                   v-model="accountNo1"
                                   :placeholder="$t('login.placeholder')">
                            <div class="selectWrap"
                                 v-show="selectShow1">
                                <ul class="select">
                                    <li class="opt"
                                        :key="index"
                                        @click="__select(item,'selectShow1')"
                                        v-for="(item ,index) in areaCodes">
                                        {{item.code}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="account">
                            <input v-if="registerForm.registerType==='1'"
                                   type="text"
                                   v-model="accountNo1"
                                   :placeholder="$t('login.placeholder1')">
                        </div>
                    </div>

                    <div class="rule-hint"
                         v-html="$t('login.tips')">
                    </div>
                    <div class="m-10">
                        <button style="float:right;"
                                class="cp"
                                :class="{'b-blue':!isEmpty}"
                                @click="__regCode">{{txt1}}</button>
                        <div style="clear:both;"></div>
                    </div>

                    <div class="m-10">
                        <div class="input-title">{{$t('login.placeholder3')}}</div>
                        <input v-model="registerForm.code"
                               type="text" />
                    </div>
                    <div class="m-10">
                        <div class="input-title">{{$t('login.password')}}</div>
                        <div class="pwd">
                            <input :type="passwordType[1].status"
                                   v-model="registerForm.password" />
                            <span class="eye"
                                  @click="__watchPwd(1)"
                                  :class="{'active':passwordType[1].flag}"></span>
                        </div>

                    </div>
                    <div class="m-10">
                        <div class="input-title">{{$t('login.verifyPwd')}}</div>
                        <div class="pwd"><input :type="passwordType[2].status"
                                   v-model="registerForm.confirmPassword" />
                            <span class="eye"
                                  @click="__watchPwd(2)"
                                  :class="{'active':passwordType[2].flag}"></span>
                        </div>
                    </div>
                    <div class="register-hint">
                        <input type="checkbox"
                               class="checkbox"
                               v-model="checked" />
                        <span>
                            {{$t('login.tips1[0]')}} {{$t('login.tips1[1]')}} {{$t('login.tips1[2]')}}{{$t('login.tips1[3]')}}
                            <span class="highlight cp"
                                  @click="__changeMaskVisible"> {{$t('login.tips1[4]')}}</span> {{$t('login.tips1[5]')}}{{$t('login.tips1[6]')}} {{$t('login.tips1[7]')}}
                        </span>
                    </div>

                    <div class="m-10">
                        <button @click="__register"
                                style="float:right;"
                                class="b-blue cp">{{$t('login.logup')}}</button>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask"
             v-if="maskVisible">
            <div class="text">
                <div class="x"
                     @click="__changeMaskVisible">x</div>
                <h3>{{$t('login.liability[0]')}}</h3>
                <p>
                    {{$t('login.liability[1]')}}
                </p>
                <p>
                    {{$t('login.liability[2]')}}
                </p>
            </div>
        </div>
        <ForgetPwd @inputPass='__inputPass'
                   :visible.sync='forgetVisible'
                   :accountNo='loginForm.accountNo'
                   :type='loginForm.loginType'></ForgetPwd>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ForgetPwd from '@/components/Login/ForgetPwd'
import NodeSetting from '@/components/Login/NodeSetting'

import createSeed from 'gitium.seed.js'
import md5 from 'js-md5'
export default {
    data() {
        return {
            checked: true,
            selectShow: false,
            selectShow1: false,
            forgetVisible: false, //找回密码
            rememberPass: false,
            areaCodes: [],
            registerForm: {
                accountNo: '', // 账号
                code: '', //验证码
                collectionAddress: '', //钱包地址
                confirmPassword: '', // 确认密码 ,
                nickname: '', //昵称 ,
                password: '', //密码 ,
                registerType: '0', // 0：邮箱注册 1：手机号注册 ,
                // userName: '' //用户名
                secretKey: ''
            },
            loginForm: {
                collectionAddress: '',
                accountNo: '',
                loginType: '0',
                password: '',
                random: new Date().getTime()
            },
            areaCode: '',
            defaultAreaCode: '',
            accountNo: '', //登录
            accountNo1: '', //注册
            tip: '',
            tipShow: false,
            txt: this.$t('login.forgetPwd'),
            txt1: this.$t('login.verifyCode'),
            timer: null, //验证码定时器
            passwordType: [
                {
                    flag: false,
                    status: 'password'
                },
                {
                    flag: false,
                    status: 'password'
                },
                {
                    flag: false,
                    status: 'password'
                }
            ],
            eyes: [],
            maskVisible: false
        }
    },
    components: { ForgetPwd, NodeSetting },
    computed: {
        isEmpty() {
            if (this.accountNo1.trim() !== '' && this.timer === null) {
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['SET_USER_INFO', 'SET_BADGE_COUNT']),
        ...mapMutations([
            'GET_USER_INFO',
            'SET_ADDRESS_LIST',
            'SET_ADDRESS_LAST',
            'SET_SEED',
            'SET_LOADING_STATE'
        ]),

        __watchPwd(index) {
            if (this.passwordType[index]['flag']) {
                this.$set(this.passwordType, [index], {
                    flag: false,
                    status: 'password'
                })
            } else {
                this.$set(this.passwordType, [index], {
                    flag: true,
                    status: 'text'
                })
            }
        },
        async __getAreaCode() {
            const res = await this.api.areaCode()
            this.areaCodes = res.data
            this.defaultAreaCode = this.areaCodes[0]
        },
        __jump(w) {
            this.$router.push(w)
        },
        //根据seed获取地址列表,type==0为注册,type==1为登录
        async __getAddressBySeed(type) {
            //生成种子
            let seedData = ''
            if (type == 0) {
                seedData = createSeed(
                    this.registerForm.accountNo,
                    this.registerForm.password
                )
            } else {
                seedData = createSeed(
                    this.loginForm.accountNo,
                    this.loginForm.password
                )
            }

            let params = {
                seed: seedData.cyptoSeed
            }
            const res = await this.api.getAddressBySeed(params)
            this.SET_SEED(seedData.cyptoSeed)
            this.SET_ADDRESS_LIST(res.data.newAddressList)
            this.SET_ADDRESS_LAST(res.data.lastAddress)
            this.registerForm.secretKey = md5(
                seedData.cyptoSeed + res.data.newAddressList[0]
            ).toUpperCase()
            this.loginForm.sign = md5(
                md5(
                    seedData.cyptoSeed + res.data.newAddressList[0]
                ).toUpperCase() + this.loginForm.random
            ).toUpperCase()
            return res
        },
        async __regCode() {
            let areaCode = this.defaultAreaCode.value.substr(1)
            let req = {}
            if (this.accountNo1.trim() == '') {
                this.$Toast(this.$t('login.toast'))
                return
            }
            if (this.registerForm.registerType === '1') {
                let r = /^\d+$/

                if (!r.test(this.accountNo1)) return
                req = {
                    acceptNo: areaCode + '+' + this.accountNo1,
                    flag: '1'
                }
            } else {
                let r = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                if (!r.test(this.accountNo1)) {
                    this.$Toast(this.$t('login.toast1'))
                    return
                }
                req = {
                    acceptNo: this.accountNo1,
                    flag: '0'
                }
            }

            const res = await this.api.regCode(req)

            if (res.code === 0) {
                this.__changeTxt('txt1', this.$t('login.verifyCode'))
            }
            this.$Toast(res.msg)
        },
        async __register() {
            if (this.registerForm.nickname.trim() === '') {
                this.$Toast(this.$t('login.toast6'))
                return
            }
            if (this.registerForm.code.trim() === '') {
                this.$Toast(this.$t('login.toast7'))
                return
            }
            if (
                this.registerForm.password != this.registerForm.confirmPassword
            ) {
                this.$Toast(this.$t('login.passwordNoAlike'))
                return
            }
            if (!this.checked) {
                this.$Toast(this.$t('login.toas2'))
                return
            }
            if (this.accountNo1.trim() === '') {
                this.$Toast(this.$t('login.toast'))
                return
            }
            if (this.registerForm.password.trim() === '') {
                this.$Toast(this.$t('login.toast5'))
                return
            }
            this.SET_LOADING_STATE(true)

            let areaCode = this.defaultAreaCode.value.substr(1)
            if (this.registerForm.registerType === '1') {
                this.registerForm.accountNo = '+' + areaCode + this.accountNo1
            } else {
                this.registerForm.accountNo = this.accountNo1
            }

            this.__getAddressBySeed(0).then(seedRes => {
                this.registerForm.collectionAddress =
                    seedRes.data.newAddressList[0]
                this.api.register(this.registerForm).then(res => {
                    this.SET_LOADING_STATE(false)

                    this.$Toast(res.msg)
                })
            })
        },
        async __login() {
            if (this.accountNo.trim() === '') {
                this.$Toast(this.$t('login.toast'))
                return
            } else if (this.loginForm.password.trim() === '') {
                this.$Toast(this.$t('login.toast5'))
                return
            }

            this.SET_LOADING_STATE(true)

            if (this.loginForm.loginType === '1') {
                let areaCode = this.defaultAreaCode.value.substr(1)

                this.loginForm.accountNo = '+' + areaCode + this.accountNo
            } else {
                this.loginForm.accountNo = this.accountNo
            }

            this.__getAddressBySeed(1).then(seedRes => {
                this.loginForm.collectionAddress =
                    seedRes.data.newAddressList[0]
                this.api.login(this.loginForm).then(res => {
                    if (res.code == 0) {
                        this.__savePass()
                        this.SET_USER_INFO(res.data).then(() => {
                            this.api
                                .startListener({
                                    userId: res.data.userInfo.userId
                                })
                                .then(() => {
                                    this.SET_LOADING_STATE(false)
                                    this.GET_USER_INFO()
                                    this.__jump('/home')
                                    this.SET_BADGE_COUNT()
                                })
                        })
                    } else {
                        this.$Toast(res.msg)
                        this.SET_LOADING_STATE(false)
                    }
                })
            })
        },
        //查找最新登录记住的帐号
        __setPass() {
            let userPass = localStorage.getItem('USERPASS')
            if (typeof userPass === 'string') {
                userPass = JSON.parse(userPass)
                let tempArr = []

                for (const key in userPass) {
                    tempArr.push(userPass[key])
                }
                tempArr = tempArr.filter(item => item.isRemember)

                tempArr.sort((a, b) => b.lastTime - a.lastTime)
                if (tempArr[0]) {
                    this.rememberPass = true
                    this.accountNo = tempArr[0].accountNo

                    this.loginForm.password = tempArr[0].password
                    this.loginForm.loginType = tempArr[0].loginType
                    if (this.loginForm.loginType === '1') {
                        this.defaultAreaCode = tempArr[0].areaCode
                    }
                }
            }
        },

        //存储用户密码到本地
        __savePass() {
            let userPass = localStorage.getItem('USERPASS')
            if (typeof userPass === 'string') {
                userPass = JSON.parse(userPass)
            } else {
                userPass = {}
            }
            let accountNo = this.loginForm.accountNo
            if (!userPass[accountNo]) {
                userPass[accountNo] = {}
            }
            if (this.loginForm.loginType === '1') {
                userPass[accountNo]['areaCode'] = this.defaultAreaCode
            }
            userPass[accountNo]['loginType'] = this.loginForm.loginType

            userPass[accountNo]['accountNo'] = this.accountNo
            userPass[accountNo]['password'] = this.loginForm.password
            userPass[accountNo]['isRemember'] = this.rememberPass
            userPass[accountNo]['lastTime'] = new Date().getTime()

            localStorage.setItem('USERPASS', JSON.stringify(userPass))
        },
        //填写密码到输入框
        __inputPass(password) {
            this.loginForm.password = password
        },
        __selectVisible(s) {
            this[s] = !this[s]
        },
        __select(item, s) {
            this.defaultAreaCode = item
            this.__selectVisible(s)
        },
        __tab(v) {
            this.loginForm.loginType = v
            this.accountNo = ''
            this.loginForm.password = ''
            this.rememberPass = false
        },
        __tab1(v) {
            this.registerForm.registerType = v
            this.accountNo1 = ''
        },
        async __forgetPwd() {
            if (this.accountNo.trim() == '') {
                this.tip = this.$t('login.toast3')
                this.tipShow = true
            } else {
                let areaCode = this.defaultAreaCode.value.substr(1)
                if (this.loginForm.loginType === '1') {
                    this.loginForm.accountNo =
                        '+' + areaCode + '' + this.accountNo
                } else {
                    let r = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                    if (!r.test(this.accountNo)) {
                        this.$Toast(this.$t('login.toast1'))
                        return
                    }
                    this.loginForm.accountNo = this.accountNo
                }
                // const res = await this.api.forgetPwd(this.loginForm)

                this.forgetVisible = true
                // this.tip = this.$t('login.toast4')
                // this.__changeTxt('txt', this.$t('login.forgetPwd'))
            }
        },
        __changeTxt(str, text) {
            if (this.timer) return
            let num = 30
            this.timer = setInterval(() => {
                this[str] = num--
                if (num <= 0) {
                    this[str] = text
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000)
        },
        __changeMaskVisible() {
            this.maskVisible = !this.maskVisible
        },
        __changeRememberPass() {
            this.rememberPass = !this.rememberPass
        }
    },
    watch: {
        active() {
            if (this.active == 2) {
                this.selectShow = this.selectShow1 = false
            }
        }
    },
    created() {
        this.__getAreaCode()
        this.__setPass()
    }
}
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    .text {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 600px;
        padding: 20px;
        margin: 0 auto;
        transform: translate(-50%, -50%);
        background: #fff;
        > p {
            margin-top: 20px;
        }
        .x {
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 40px;
            color: #fff;
            font-size: 30px;
            line-height: 32px;
            text-align: center;
            background: #3e63a5;
        }
    }
}
.m-10 {
    margin-top: 10px;
}
.b-blue {
    background: #3e63a5;
}
.content {
    position: relative;
    background: #eeeeef;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.box {
    width: 900px;
    margin: 0 auto;
    display: flex;
    min-height: 900px;
}
.titleWrap {
    background: #3e63a5;
}
.title {
    width: 900px;
    margin: 0 auto;

    color: #fff;
    font-size: 28px;
    font-weight: 600;
    height: 80px;
    line-height: 80px;
}
.login,
.register {
    margin-top: 40px;
    > div:nth-child(2) {
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 20px;
    }
}
.login {
    .btns {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }
}
.register {
    margin-left: 300px;
}
.input-title {
    margin: 10px 0;
    padding-left: 20px;
    font-weight: 600;
}

.register-hint {
    margin-top: 30px;
    line-height: 20px;
}
.rule-hint {
    color: #888;
    padding-left: 20px;
    margin-top: 10px;
}
.btns {
    width: 300px;
}
input:not(.checkbox) {
    font-size: 14px;
    width: 300px;
    height: 30px;
    border-radius: 15px;
    outline: none;
    border: none;
    //  margin-left: -3px;
    padding-left: 20px;
}
button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    outline: none;
    border: none;
    text-align: center;
    color: #fff;
    background: #b4b4b5;
    font-size: 14px;
}
.input {
    width: 300px;
    border-radius: 15px;
    background: #cccccc;
    //overflow: hidden;
    //margin-left: -3px;
    .account:nth-of-type(1) {
        position: relative;
        z-index: 10;
        input {
            border-radius: 15px 15px 0 0;
        }
    }
    div:nth-of-type(2) {
        input {
            border-radius: 0 0 15px 15px;
            background-color: #fff;
        }
        .active {
        }
    }
    .selected {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px 15px 0 0;
        padding-left: 20px;
        background-color: #fff;
        border-bottom: 1px solid #cccccc;
    }
    .account {
        height: 30px;
        .selectWrap {
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            background: #eeeef0;
            border: 1px solid #dadbdd;
            border-radius: 0 0 15px 15px;
            height: 180px;
            overflow: hidden;
            .select {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                > .opt {
                    display: flex;
                    height: 30px;
                    padding-left: 10px;
                    color: #979797;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
}
.tab {
    display: flex;
    width: 300px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 10px;
    background-color: #cccccc;
    .tel,
    .mail {
        width: 50%;
        height: 30px;
        border-radius: 15px;
        background-size: 20px 20px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .tel {
        background-image: url('./../assets/img/tel.png');
    }
    .mail {
        background-image: url('./../assets/img/mail.png');
    }
    .active {
        background-color: #fff;
    }
}
.pwd {
    position: relative;
    .eye {
        position: absolute;
        right: 10px;
        top: 0;
        width: 30px;
        height: 30px;
        background-image: url('./../assets/img/eye.png');
        background-size: 100% 100%;
        opacity: 0.5;
    }
    .eye.active {
        opacity: 1;
    }
}
.checkbox {
    margin-top: 10px;
    display: flex;
    align-items: center;
    > input {
        width: 20px;
    }
}
.tip {
    position: relative;
    margin-top: 20px;
    font-size: 12px;
    padding: 14px 20px;
    border-radius: 15px;
    border: 1px solid #d4d5d6;
    background: #ffffff;
}
.tip::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 30px;
    width: 21px;
    height: 13px;
    background: url('./../assets/img/arrow.png');
}
</style>


