<template>
    <div class="content mt16">

        <div class="title">
            <p>{{$t('user.privacy')}}</p>
        </div>
        <div class="info">
            <div class="title">
                {{$t('user.dynamic')}}
            </div>
            <ul class="list">
                <li>
                    <p>{{$t('user.text2')}}</p>
                    <span class="arrow cp"
                          @click="__setReqType(2)"></span>
                </li>
                <li>
                    <p>{{$t('user.text3')}}</p>
                    <span class="arrow cp"
                          @click="__setReqType(1)"></span>
                </li>
                <li>
                    <p>{{$t('user.text4')}}</p>

                    <div class="cp"
                         @click="__showMenu(1)">
                        <span>{{info.friendViewDynamicRange | rangeText(rangeTexts) }}</span>
                        <span class="arrow"></span>
                    </div>
                    <ul v-if="menuType===1"
                        class="cp"
                        @click="__setRange(1, $event)">
                        <li data-type='0'>{{$t('user.all')}}</li>
                        <li data-type='1'>{{$t('user.threedays')}}</li>
                        <li data-type='2'>{{$t('user.halfayear')}}</li>
                    </ul>
                </li>
                <li>
                    <p>{{$t('user.text5')}}</p>

                    <div class="cp"
                         @click="__showMenu(0)">
                        <span>{{info.strangerViewDynamicRange | rangeText(rangeTexts) }}</span>
                        <span class="arrow"></span>
                    </div>
                    <ul v-if="menuType===0"
                        class="cp"
                        @click="__setRange(0,$event)">
                        <li data-type='0'>{{$t('user.all')}}</li>
                        <li data-type='1'>{{$t('user.threedays')}}</li>
                        <li data-type='2'>{{$t('user.halfayear')}}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="info">
            <div class="title">
                {{$t('user.title')}}
            </div>
            <ul class="list">
                <li>
                    <p>{{$t('user.text6')}}</p>
                    <span @click="__setVerify"
                          class="switch mr"
                          :class="{'active':info.isVerify==1}"></span>
                </li>
            </ul>
        </div>
        <SelectWidget :type='reqType'
                      @done='__showWidget'
                      v-if="showWidget"></SelectWidget>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SelectWidget from './SelectWidget'
export default {
    data() {
        return {
            info: {},
            routerName: '',
            reqType: 1,
            menuType: null,
            showWidget: false,
            rangeTexts: [
                this.$t('user.all'),
                this.$t('user.threedays'),
                this.$t('user.halfayear')
            ]
        }
    },
    components: { SelectWidget },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    filters: {
        rangeText(value, arr) {
            switch (value) {
                case '0':
                case '':
                    return arr[0]
                    break
                case '1':
                    return arr[1]
                    break
                case '2':
                    return arr[2]
                    break
            }
        }
    },
    methods: {
        ...mapMutations(['SET_USER_INFO']),
        async __getDatas() {
            let req = {
                id: this.userInfo.userId
            }
            const res = await this.api.userInfo(req)
            if (res.code === 0) {
                this.info = res.data
            }
        },
        __showMenu(index) {
            this.menuType = this.menuType === index ? null : index
        },
        async __setRange(flag, event) {
            let type = event.target.dataset.type
            let req = {
                userId: this.userInfo.userId,
                type,
                flag
            }
            const res = await this.api.privacySetViewDynamicRange(req)
            this.menuType = null
            this.__getDatas()
        },
        async __setVerify() {
            let type = this.info.isVerify == '0' ? '1' : '0'
            let req = {
                userId: this.userInfo.userId,
                type
            }
            const res = await this.api.privacySetVerify(req)
            this.info.isVerify = type
            this.__getDatas()
        },
        __showWidget() {
            this.showWidget = false
        },
        __setReqType(num) {
            this.reqType = num
            this.showWidget = true
        }
    },

    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'privacy') {
                }
            },
            immediate: true
        }
    },
    created() {
        this.routeName = this.$route.name
        this.__getDatas()
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
    .info {
        display: flex;
        padding-top: 20px;
        line-height: 40px;
        //
        > .title {
            width: 170px;
        }
        .list {
            flex-grow: 1;

            > li {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                border-bottom: 1px solid #dbdcdc;
                padding-right: 20px;
                > div {
                    display: flex;
                    align-items: center;
                }
                > ul {
                    position: absolute;
                    right: 10px;
                    top: 40px;
                    width: 100px;
                    background: #ffffff;
                    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
                    z-index: 1;
                    > li {
                        padding-left: 10px;
                        border-bottom: 1px solid #dbdcdc;
                    }
                }
                .arrow {
                    margin: 10px 0 0 10px;
                    // width: 10px;
                    // height: 10px;
                    border-width: 10px;
                    border-color: #999 transparent transparent transparent;
                    border-style: solid;
                    // background: #000;
                }
            }
        }
    }
    .switch {
        margin: 0;
        display: inline-block;
        position: relative;
        width: 56px;
        height: 26px;
        border: 1px solid #dcdfe6;
        outline: none;
        border-radius: 20px;
        box-sizing: border-box;
        background: #dcdfe6;
        cursor: pointer;
        transition: border-color 0.3s, background-color 0.3s;
        vertical-align: middle;
    }
    .switch:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 100%;
        transition: all 0.3s;
        width: 20px;
        height: 20px;
        background-color: #fff;
    }
    .switch.active {
        background: #fff;
    }
    .switch.active:after {
        top: 2px;
        left: 32px;
        // right: 2px;
        background-color: #3f61a6;
    }
}
</style>
