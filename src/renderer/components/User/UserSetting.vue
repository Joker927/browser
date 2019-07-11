<template>
    <div class="content mt16">

        <div class="title">
            <p>{{$t('user.set')}}</p>
        </div>
        <ul class="tab">
            <li class="cp"
                :class="{'active':tabActive===0}"
                @click="__changeTab(0)">{{$t('user.set1')}}</li>
            <!-- <li class="cp "
                :class="{'active':tabActive===1}"
                @click="__changeTab(1)">{{$t('user.set2')}}</li> -->
            <li class="cp "
                :class="{'active':tabActive===2}"
                @click="__changeTab(2)">{{$t('user.set12')}}</li>
            <li class="cp "
                :class="{'active':tabActive===3}"
                @click="__changeTab(3)">{{$t('user.set13')}}</li>
            <li class="cp "
                :class="{'active':tabActive===4}"
                @click="__changeTab(4)">{{$t('user.set14')}}</li>

        </ul>
        <div class="tabPane">
            <div class="info"
                 v-if="tabActive===0">
                <div>
                    <div>
                        <p class="title">{{$t('user.set3')}}</p>
                        <p class="name n"
                           v-if='!isEdit'>{{userInfo.nickname}}</p>
                        <input class="name"
                               type="text"
                               v-model="nickname"
                               v-else>
                    </div>
                    <p class="cp btn"
                       v-if='!isEdit'
                       @click="__changeEditState">{{$t('user.set4')}}</p>
                    <p class="cp btn"
                       v-else
                       @click="__changeUserInfo('nickname')">{{$t('user.set5')}}</p>
                </div>
            </div>
            <div class="passWord"
                 v-if="tabActive===1">
                <div class="input">
                    <div>
                        <p>{{$t('user.set6')}}</p>
                        <input type="password"
                               v-model="req.oldPassword">
                    </div>
                    <div>
                        <p>{{$t('user.set7')}}</p>
                        <input type="password"
                               v-model="req.newPassword">
                    </div>
                    <div>
                        <p>{{$t('user.set8')}}</p>
                        <input type="password"
                               v-model="req.confirmPassword">
                    </div>

                </div>
                <div class="btn">
                    <span class="save cp"
                          @click="__changePwd">{{$t('user.set9')}}</span>
                    <span class="forget cp"
                          @click="__forgetPwd">{{$t('user.set10')}}</span>
                </div>
            </div>
            <div class="info"
                 v-if="tabActive===2">
                <div>
                    <div>
                        <p class="title">{{$t('user.set12')}}</p>
                        <p class="name n"
                           v-if='!isEdit'>{{userInfo.gender | genderText(genderArr)}}</p>
                        <p class="cp"
                           style="padding:10px"
                           :class="{'active':gender==0}"
                           @click="__changeGender(0)"
                           v-if='isEdit'>{{$t('user.gender[0]')}}</p>
                        <p class="cp"
                           style="margin-left:20px;padding:10px"
                           @click="__changeGender(1)"
                           :class="{'active':gender==1}"
                           v-if='isEdit'>{{$t('user.gender[1]')}}</p>
                    </div>
                    <p class="cp btn"
                       v-if='!isEdit'
                       @click="__changeEditState">{{$t('user.set4')}}</p>
                    <p class="cp btn"
                       v-else
                       @click="__changeUserInfo('gender')">{{$t('user.set5')}}</p>
                </div>
            </div>
            <div class="info"
                 v-if="tabActive===3">
                <div>
                    <div>
                        <p class="title">{{$t('user.set13')}}</p>
                        <p class="name n"
                           v-if='!isEdit'>{{userInfo.signature}}</p>
                        <input class="name"
                               type="text"
                               v-model="signature"
                               v-else>
                    </div>
                    <p class="cp btn"
                       v-if='!isEdit'
                       @click="__changeEditState">{{$t('user.set4')}}</p>
                    <p class="cp btn"
                       v-else
                       @click="__changeUserInfo('signature')">{{$t('user.set5')}}</p>
                </div>
            </div>
            <div class="info"
                 v-if="tabActive===4">
                <div>
                    <div>
                        <p class="title">{{$t('user.set14')}}</p>
                        <p class="name n"
                           v-if='!isEdit'>{{userInfo.address}}</p>
                        <input class="name"
                               type="text"
                               v-model="address"
                               v-else>
                    </div>
                    <p class="cp btn"
                       v-if='!isEdit'
                       @click="__changeEditState">{{$t('user.set4')}}</p>
                    <p class="cp btn"
                       v-else
                       @click="__changeUserInfo('address')">{{$t('user.set5')}}</p>
                </div>
            </div>
        </div>

        <UserForgetPwd ref="Modal"></UserForgetPwd>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import UserForgetPwd from './UserForgetPwd'
export default {
    data() {
        return {
            tabActive: 0,
            req: {
                confirmPassword: '',
                newPassword: '',
                oldPassword: ''
            },
            nickname: '',
            signature: '',
            gender: 0,
            address: '',
            isEdit: false
        }
    },
    filters: {
        genderText(value, genderArr) {
            let val = Number(value)
            return genderArr[val]
        }
    },
    components: { UserForgetPwd },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        genderArr() {
            return this.$t('user.gender')
        }
    },

    methods: {
        ...mapMutations(['REFRESH_USER_INFO']),
        async __changePwd() {
            this.req.userId = this.userInfo.userId
            const res = await this.api.userUploadPwd(this.req)

            this.$Toast(res.msg)
        },
        async __changeUserInfo(command) {
            //address	string
            // 用户地理位置

            // avatar	string
            // 用户头像

            // collectionAddress	string
            // 收付款地址

            // email	string
            // 用户邮箱

            // gender	string
            // 性别

            // mobileNo	string
            // 手机号

            // nickname	string
            // 用户昵称

            // signature	string
            // 签名

            // userName	string
            // 用户名
            console.log(this[command], command)
            if (
                this[command].typeof == 'string' &&
                this[command].trim() === ''
            ) {
                this.$Toast(this.$t('user.set11'))
                return
            }
            let req = {
                [command]: this[command]
            }

            const res = await this.api.updateUserInfo(req)
            if (res.code === 0) {
                const info = await this.api.userInfo({
                    id: this.userInfo.userId
                })
                if (info.code === 0) {
                    this.isEdit = false
                    this.REFRESH_USER_INFO(info.data)
                }
            }
            this.$Toast(res.msg)
        },
        __changeEditState() {
            this.isEdit = true
        },
        __changeGender(n) {
            this.gender = n
        },
        __changeTab(index) {
            this.tabActive = index
            this.isEdit = false
            this.gender = this.userInfo.gender
            this.nickname = this.userInfo.nickname
            this.signature = this.userInfo.signature
            this.address = this.userInfo.address
        },
        __forgetPwd() {
            this.$refs.Modal.__show()
        }
    },

    watch: {},
    created() {
        this.__changeTab(0)
    }
}
</script>

<style lang='scss' scoped>
.content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding-left: 30px;
    > .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #dbdcdc;
        .active {
            color: #3f61a6;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .tab {
        display: flex;
        height: 50px;
        align-items: center;
        li {
            margin-right: 40px;
            padding-bottom: 4px;
        }
        .active {
            color: #3f61a6;
            border-bottom: 1px solid #3f61a6;
        }
    }
    .tabPane {
        padding: 0 20px;
        .passWord {
            width: 600px;
            margin: 100px auto;
            .input {
                padding-bottom: 60px;
                border-bottom: 1px solid #dbdcdc;
                > div {
                    display: flex;

                    margin: 30px auto 0;
                    align-items: center;
                    p {
                        width: 140px;
                        text-align: right;
                    }
                    input {
                        margin-left: 20px;
                        height: 30px;
                        width: 412px;
                        padding-left: 10px;
                        background: #efefef;
                        border: 1px solid #e6e6e6;
                        outline: none;
                    }
                }
            }
        }
        .btn {
            margin: 30px 0;
            > span {
                margin-right: 20px;
                border-radius: 3px;
                padding: 4px 10px;
            }
            .save {
                background: #3f61a6;
                color: #ffffff;
            }
            .forget {
                background: #3f61a6;
                color: #ffffff;
            }
        }
    }
    .info {
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
                display: flex;
                align-items: center;
            }
            .name {
                width: 412px;
                padding-left: 10px;
                background: #efefef;
                border: 1px solid #e6e6e6;
                outline: none;
                height: 30px;
                margin-right: 20px;
                line-height: 30px;
            }
            .n {
                background: #ffffff;
                color: #747474;
                border: 1px solid #ffffff;
            }
            .title {
                width: 120px;
            }
            .btn {
                color: #3f61a6;
            }

            .active {
                color: #3f61a6;
                border-bottom: 1px solid #3f61a6;
            }
        }
    }
}
</style>
