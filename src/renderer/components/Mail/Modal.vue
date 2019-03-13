<template>
    <div class="mask">
        <div class="contain clearfix">
            <div class="box">
                <div class="title">{{title}}
                    <span class="exit cp"
                          @click='__out'></span>
                </div>

                <div class="bl fl">
                    <div class="search-f">
                        <input type="text"
                               @focus="__foucus"
                               @blur="__blur"
                               placeholder="$t('email.placeholder')" />
                        <span class="search-icon"
                              :class="{'focusIcon':focusIcon}"></span>
                    </div>
                    <div class="f-list">
                        <div v-for="(item,index) in list"
                             :key="index"
                             class="clearfix">
                            <div>
                                <img :src="item.avatar" />
                            </div>
                            <div>
                                {{item.nickname}}
                            </div>
                            <input type="checkbox"
                                   @change="__select(item)"
                                   v-model="item.isChecked" />
                        </div>
                    </div>
                </div>

                <div class="br fl">
                    <div class="br-title">
                        {{$t('email.selected')}}{{selectList.length}}{{$t('email.sender')}}
                    </div>

                    <div class="f-list rlist">
                        <div v-for="(item,index) in selectList"
                             :key="index"
                             class="clearfix">
                            <div>
                                <img :src="item.avatar" />
                            </div>
                            <div>
                                {{item.nickname}}
                            </div>
                            <span @click="__del(index,item)"></span>
                        </div>
                    </div>

                    <div class="br-btns clearfix">
                        <div class="cp"
                             @click="__out">{{$t('cancel')}}</div>
                        <div class="cp"
                             @click="__done">{{$t('confirm')}}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: {
        name: {
            type: String
        }
    },
    data() {
        return {
            req: {
                userId: 0
            },
            focusIcon: false,
            list: [],
            selectList: [],
            selectIds: []
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            mailListState: state => state.Visible.mailListState
        }),
        title() {
            if (this.name === 'white') {
                return '添加白名單'
            }
            return '添加黑名單'
        }
    },
    watch: {},
    methods: {
        ...mapMutations(['SET_MAIL_LIST_STATE']),
        __out() {
            this.SET_MAIL_LIST_STATE()
        },
        __foucus() {
            this.focusIcon = true
        },
        __blur() {
            this.focusIcon = false
        },
        async __getList() {
            this.req.userId = this.userInfo.userId
            let selected
            if (this.name === 'white') {
                selected = this.api.emailWhitelist(this.userInfo.userId)
            } else {
                selected = this.api.emailBlacklist(this.userInfo.userId)
            }
            const res = await Promise.all([
                this.api.emailRecentuserlist(this.userInfo.userId),
                selected
            ])

            this.list = res[0].data
            //   this.list.forEach(item => {
            //     item.isChecked = false;
            //   });
            this.selectList = res[1].data
            this.selectIds = this.selectList.map(item => item.userId)
        },
        __select(item) {
            if (item.isChecked) {
                this.selectList.push(item)
            } else {
                // this.selectList = this.list.filter(item => item.isChecked)
                this.selectList.forEach((el, index) => {
                    if (el.userId === item.userId) {
                        this.selectList.splice(index, 1)
                    }
                })
            }
        },
        __del(index, item) {
            this.list.forEach(ele => {
                if (this.selectList[index].userId == ele.userId) {
                    ele.isChecked = false
                }
            })
            this.selectList.splice(index, 1)
            if (!item.del && this.selectIds.includes(item.userId)) {
                item.del = true
                this.list.push(item)
            }
        },
        __diffArr(arr, arr1) {
            let tempArr = []
            for (var i = 0; i < arr.length; i++) {
                if (!arr1.includes(arr[i])) {
                    tempArr.push(arr[i])
                }
            }
            return tempArr
        },
        async __done() {
            let type = this.name === 'white' ? 2 : 1

            let listIds = this.selectList.map(item => {
                return item.userId
            })
            let addIds = this.__diffArr(listIds, this.selectIds)
            let delIds = this.__diffArr(this.selectIds, listIds)

            if (addIds.length || delIds.length) {
                let data = {
                    blackOrWhite: type,
                    delListIds: delIds,
                    // isEmptyList: true,
                    listIds: addIds,
                    userId: this.userInfo.userId
                }
                const res = await this.api.emailOperatebatch(data)
                if (!res.code) {
                    this.$Toast('操作成功')
                    this.__out()
                } else {
                    this.$Toast(res.msg)
                }
            } else {
                this.__out()
            }
        }
    },

    created() {
        this.__getList()
    }
}
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
.box {
    width: 600px;
    height: 550px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 16px;
    height: 16px;
    display: block;
    background: url('./img/popup_cancel@3x.png');
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}
.contain {
    height: 400px;
}

.bl,
.br {
    width: 300px;
    height: 500px;
}

.bl {
    padding-top: 20px;
    border-right: 1px solid #dfdfe0;
    overflow-y: scroll;
}

.bl::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.search-f {
    width: 254px;
    margin: 0 auto;
    position: relative;
    input {
        width: 100%;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 10px;
    }
    input::-webkit-input-placeholder {
        padding-left: 26px;
    }
}

.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url('./img/search-icon.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 230px;
}

.focusIcon {
    right: 10px;
}

.f-list {
    width: 254px;
    margin: 20px auto 0;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        > div {
            float: left;
        }
        > div:first-child {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            background: #f1f1f1;
            img {
                width: 100%;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        input {
            float: right;
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;
            background: url(./img/addFriends_clear@3x.png);
            background-size: 100% 100%;
            margin-top: 9px;
            margin-right: 20px;
        }
    }
}

.br {
    position: relative;
}

.br-title {
    font-size: 12px;
    color: #999;
    margin: 20px 20px;
    letter-spacing: 1px;
}

.rlist {
    overflow-y: auto;
    height: calc(100% - 110px);
}

.br-btns {
    width: 100%;
    div {
        float: right;
        width: 66px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        margin-right: 18px;
    }
    > div:first-child {
        background: #dbdbdb;
    }
    > div:nth-child(2) {
        background: #3f61a6;
        color: #fff;
    }
}

.br-btns {
    position: absolute;
    bottom: 20px;
}
</style>