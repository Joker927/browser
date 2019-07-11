<template>
    <div class="bg"
         v-if="$route.name==='feed'||$route.name==='user'">
        <div class="cp upload"
             v-if="$route.name==='feed'"
             @click="__clickInput('photoWall')">
            <p>{{$t('main.uploadcoverphotos')}}</p>
            <span class="icon"></span>

        </div>
        <div class="bgImg">
            <div>
                <img :src="datas.photoPath"
                     alt="">
            </div>

            <span></span>
        </div>

        <div class="info">
            <p>{{datas.nickname}}</p>
            <div class="avatar">
                <Avatar :src="datas.avatar" />
                <div class="cp"
                     v-if="$route.name==='feed'"
                     @click="__clickInput('avatar')">
                    <span class="icon"></span>
                    <p>{{$t('main.uploadthepicture')}}</p>
                </div>
            </div>
        </div>
        <div v-if="$route.name==='user'"
             class="opt">
            <div class="msg cp"
                 v-if="datas.isFriend==='1'"
                 @click='__chat'>{{$t('main.sendMsg')}}</div>
            <div class="add cp"
                 v-if="datas.isFriend==='0'"
                 @click="__add">{{$t('main.addFriend')}}</div>
            <div v-if="datas.isFriend==='1'"
                 class="menu"
                 @click="__opt">
                <div class="cp arrow">
                    {{$t('main.friends')}}
                </div>
                <ul class="list"
                    v-if="menuShow">
                    <li @click="__del"> {{$t('main.del')}}</li>
                </ul>
            </div>

        </div>
        <input type="file"
               ref="UpFile"
               @change="__upload"
               style="display:none">
        <div class="mask"
             v-if="dialogState"
             @click.self="__dialogCancel">
            <div class="details">
                <p class="title">是否确定删除?</p>
                <div class="btn">
                    <span class="cp"
                          @click="__dialogConfirm">{{$t('confirm')}}</span>
                    <span class="cp"
                          @click="__dialogCancel">{{$t('cancel')}}</span>
                </div>
            </div>

        </div>

    </div>
</template>
   


<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            datas: {},
            menuShow: false,
            type: 'avatar',
            dialogState: false
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        ...mapActions(['SET_USER_INFO']),
        ...mapMutations(['REFRESH_USER_INFO', 'SET_WEBIM_List']),
        async __getDatas() {
            let req = {}
            if (this.$route.name === 'feed') {
                req.id = this.userInfo.userId
            } else if (this.$route.name === 'user') {
                req.id = this.$route.query.id
            }
            const res = await this.api.userInfo(req)

            this.datas = res.data
            if (this.$route.name === 'feed') {
                this.REFRESH_USER_INFO(res.data)
            }
        },
        async __add() {
            let data = {
                requesterId: this.datas.userId
            }
            const res = await this.api.friendApply(data)
            if (res.msg == 'success') {
                this.__getDatas()
                this.$Toast(this.$t('main.requested'))
            }
        },
        __opt() {
            this.menuShow = !this.menuShow
        },
        __del() {
            this.dialogState = true
        },
        async __dialogConfirm() {
            let data = {
                ids: [this.datas.userId]
            }
            const res = await this.api.friendDelete(data)
            if (res.msg == 'success') {
                this.__dialogCancel()
                this.__getDatas()
                this.$bus.emit('getData')
                //  this.$Toast('已发送请求')
            }
        },
        __dialogCancel() {
            this.dialogState = false
        },
        async __upload() {
            let files = this.$refs.UpFile.files[0]
            let id = this.userInfo.userId
            let formData = new FormData()
            formData.append('file', files)
            let res = {}
            if (this.type === 'avatar') {
                res = await this.api.userUploadAvater(formData)
            } else {
                res = await this.api.snsUpdatePhotoWall(formData)
            }
            console.log(res, 'res')
            if (res.code == 0) {
                this.__getDatas()
                //  this.$Toast('已发送请求')
            }
        },
        __clickInput(n) {
            this.type = n
            this.$refs.UpFile.click()
        },
        __chat() {
            let obj = {
                userId: this.datas.userId,
                userName: this.datas.nickname,
                avatar: this.datas.avatar,
                type: 'personal',
                isShow: true,
                width: '210px',
                height: '168px',
                msgList: []
            }
            this.SET_WEBIM_List(obj)
        }
    },
    watch: {
        $route: {
            handler() {
                if (
                    this.$route.name === 'feed' ||
                    this.$route.name === 'user'
                ) {
                    this.__getDatas()
                }
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.bg {
    position: relative;
    height: 220px;
    background: #dbdcdc;
    > .bgImg {
        position: relative;
        height: 100%;
        overflow: hidden;
        > div {
            height: 100%;
            overflow: auto;
            img {
                // position: absolute;
                // top: 50%;
                // left: 0;
                width: 100%;
                // transform: translateY(-50%);
            }
        }
        > span {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 50px;
            width: 100%;
            background-image: linear-gradient(
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.1) 40%,
                rgba(0, 0, 0, 0.2) 80%
            );
        }
    }
    .upload {
        display: flex;
        opacity: 0;
        position: absolute;
        right: 10px;
        top: 5px;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
        align-items: center;
        padding: 0 4px;
        height: 18px;
        line-height: 18px;
        border-radius: 2px;
        .icon {
            margin-left: 3px;
            width: 12px;
            height: 9px;
            background: url('./img/avatar_camera@2x.png') no-repeat center
                center;
            background-size: 100% 100%;
        }
        > p {
            text-align: center;
            font-size: 10px;
            color: #ffffff;
        }
    }

    .info {
        position: absolute;
        right: 60px;
        bottom: -30px;
        display: flex;
        align-items: center;
        > p {
            margin-right: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
        }

        .avatar {
            position: relative;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #eff0f0;
            overflow: hidden;
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                object-fit: cover;
                width: 120px;
                height: 120px;
            }

            > div {
                opacity: 0;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 60px;
                width: 100%;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 0 0 60px 60px;
                .icon {
                    display: block;
                    margin: 14px auto 4px;
                    width: 12px;
                    height: 9px;
                    background: url('./img/avatar_camera@2x.png') no-repeat
                        center center;
                    background-size: cover;
                }
                > p {
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                }
            }
        }
        > .avatar:hover {
            > div {
                opacity: 1;
                transition: opacity 0.8s;
            }
        }
    }
    .opt {
        position: absolute;
        bottom: 10px;
        left: 10px;
        display: flex;
        font-size: 14px;
        line-height: 22px;

        .add,
        .arrow,
        .msg {
            text-align: center;
            height: 22px;
            padding: 0 10px 0 30px;
            background: #ffffff no-repeat 7px center;
            background-size: 16px 16px;
        }
        .msg {
            background-image: url('./img/chat@3x.png');
        }
        .add {
            margin-left: 20px;
            background-image: url('./img/friends@3x.png');
        }
        .arrow {
            position: relative;

            padding: 0 20px 0 25px;
            background-image: url('./img/friends@3x.png');
        }
        .arrow::before {
            content: '';
            position: absolute;
            top: 50%;
            right: 3px;
            width: 10px;
            height: 8px;
            margin-top: -4px;
            background-image: url('./img/arrow.svg');
            background-size: 100% 100%;
        }
        .menu {
            margin-left: 20px;
            position: relative;
            .list {
                background: #ffffff;
                position: absolute;
                right: 0px;
                top: 24px;
                border: 1px solid #f1f1f1;
                font-size: 12px;
                > li {
                    cursor: pointer;
                    padding: 0 4px;
                }
            }
        }
    }
}
.bg:hover {
    .upload {
        opacity: 1;
        transition: opacity 0.8s;
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
            > :nth-of-type(1) {
                // background: #000;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>
