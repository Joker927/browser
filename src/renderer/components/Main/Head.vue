<template>
    <div class="bg"
         v-if="$route.name==='feed'||$route.name==='user'">
        <div class="bgImg">
            <img :src="datas.photoPath"
                 alt="">
            <div class="cp"
                 v-if="$route.name==='feed'"
                 @click="__clickInput('photoWall')">
                <p>{{$t('main.uploadcoverphotos')}}</p>
                <span class="icon"></span>

            </div>
            <span></span>
        </div>
        <div class="info">
            <p>{{datas.nickname}}</p>
            <div class="avatar">
                <img v-if="datas.avatar"
                     :src="datas.avatar"
                     alt="">
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
            <div class="msg cp">{{$t('main.sendMsg')}}</div>
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
    </div>
</template>
   


<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            datas: {},
            menuShow: false,
            type: 'avatar'
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
        async __getDatas() {
            let req = {}
            if (this.$route.name === 'feed') {
                req.id = this.userInfo.userId
            } else if (this.$route.name === 'user') {
                req.id = this.$route.query.id
            }
            const res = await this.api.userInfo(req)
            console.log(res, 'userInfo')
            this.datas = res.data
            if (this.$route.name === 'feed') {
                localStorage.setItem('USERINFO', JSON.stringify(res.data))
            }
        },
        async __add() {
            console.log(this.datas)
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
        async __del() {
            let data = {
                ids: [this.datas.userId]
            }
            const res = await this.api.friendDelete(data)
            if (res.msg == 'success') {
                this.__getDatas()
                //  this.$Toast('已发送请求')
            }
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
    height: 130px;
    background: #dbdcdc;
    > .bgImg {
        position: relative;
        height: 130px;
        overflow: hidden;
        > img {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            transform: translateY(-50%);
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
        > div {
            display: flex;
            opacity: 0;
            position: absolute;
            right: 50px;
            top: 5px;
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
    }
    > .bgImg:hover {
        > div {
            opacity: 1;
            transition: opacity 0.8s;
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
            background: #ffffff;
            overflow: hidden;
            border: 2px solid #ffffff;

            img {
                width: 100%;
                height: 100%;
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
</style>
