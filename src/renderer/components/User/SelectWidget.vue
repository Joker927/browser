<template>

    <div class="mask">
        <div class="contain clearfix">

            <div class="bl fl">
                <div class="search-f">
                    <input type="text"
                           @focus="__foucus"
                           @blur="__blur"
                           @input="__inputing"
                           v-model="searchName"
                           :placeholder="$t('search')">
                    <span class="search-icon"
                          :class="{'focusIcon':focusIcon}"></span>
                </div>
                <div class="list">
                    <div class=" cp"
                         v-for="(item,index) in list"
                         :key="index"
                         @click="__select(item)">
                        <div>
                            <img v-if="item.avatar"
                                 :src="item.avatar">

                        </div>
                        <div>
                            {{item.nickname }}
                        </div>
                        <input type="checkbox"
                               v-model="item.isChecked">
                    </div>
                </div>
            </div>

            <div class="br fl">
                <div class="br-title">
                    {{ $t('user.selected')}}{{selectList.length}} {{ $t('user.contact')}}
                </div>

                <div class="list rlist">
                    <div v-for="(item,index) in selectList"
                         :key="index"
                         class="clearfix">
                        <div>
                            <img v-if="item.avatar"
                                 :src="item.avatar">

                        </div>
                        <div>
                            {{item.nickname ||item.userName}}
                        </div>
                        <span @click="__del(index,item)"></span>
                    </div>
                </div>

                <div class="br-btns clearfix">
                    <div class="cp"
                         @click="__out">{{ $t('cancel')}}</div>
                    <div class="cp"
                         @click="__done">{{ $t('confirm')}}</div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { it } from 'date-fns/locale'
export default {
    props: {
        type: {
            type: Number
        }
    },
    data() {
        return {
            focusIcon: false,
            list: [],
            selectList: [],
            selectIds: [],
            searchName: '',
            removeBlackList: [] //移除黑名单列表
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            mailListState: state => state.Visible.mailListState
        })
    },
    watch: {},
    methods: {
        ...mapMutations(['']),
        __out() {
            this.$emit('done', 'cancel')
        },
        __foucus() {
            this.focusIcon = true
        },
        __blur() {
            this.focusIcon = false
        },
        __inputing() {
            if (this.timer) return
            this.timer = setTimeout(() => {
                this.__getList()
            }, 300)
        },
        async __getList() {
            let req = ''
            if (this.type === 3) {
                req = this.api.privacyBlacklist({
                    userId: this.userInfo.userId
                })
            } else {
                req = this.api.privacyDynamicviewList({
                    type: this.type,
                    userId: this.userInfo.userId
                })
            }
            const res = await Promise.all([
                this.api.searchFriendAndGroup({
                    searchName: this.searchName
                }),
                req
            ])

            this.list = res[0].data.friendList
            this.selectList = res[1].data
            this.selectIds = this.selectList.map(item => item.friendId)
            this.list.forEach(item => {
                if (this.selectIds.includes(item.friendId)) {
                    item.isChecked = true
                } else {
                    item.isChecked = false
                }
            })

            this.timer = null //重置输入框定时器状态
        },
        __select(item) {
            console.log(item, 'item')
            if (this.type === 3) {
            } else {
                if (!item.isChecked) {
                    this.selectList.push(item)
                    item.isChecked = true
                } else {
                    item.isChecked = false
                    this.selectList = this.list.filter(item => item.isChecked)
                }
            }
        },
        __del(index, item) {
            if (this.type === 3) {
                this.removeBlackList.push(item.id)
            } else {
                this.list.forEach(ele => {
                    if (this.selectList[index].friendId == ele.friendId) {
                        ele.isChecked = false
                    }
                })
            }
            this.selectList.splice(index, 1)
        },
        __diffArr(arr, arr1) {
            let tempArr = []
            for (var i = 0; i < arr.length; i++) {
                !arr1.includes(arr[i]) && tempArr.push(arr[i])
            }
            return tempArr
        },
        async __done() {
            if (this.type === 3) {
                let req = {
                    ids: this.removeBlackList,
                    userId: this.userInfo.userId
                }
                const res = await this.api.privacyRemoveBlacklist(req)

                if (res.code === 0) {
                    this.$Toast(this.$t('success'))
                    this.__out()
                } else {
                    this.$Toast(res.msg)
                }
            } else {
                let listIds = this.selectList.map(item => {
                    return item.friendId
                })
                let addIds = this.__diffArr(listIds, this.selectIds)
                let delIds = this.__diffArr(this.selectIds, listIds)
                if (addIds.length) {
                    let req = {
                        friendIds: addIds,
                        type: this.type,
                        userId: this.userInfo.userId
                    }
                    const res = await this.api.privacySetDynamicView(req)

                    if (res.code === 0) {
                        this.$Toast(this.$t('success'))
                        this.__out()
                    } else {
                        this.$Toast(res.msg)
                    }
                }

                if (delIds.length) {
                    let req = {
                        friendIds: delIds,
                        type: this.type,
                        userId: this.userInfo.userId
                    }
                    const res = await this.api.privacyRemoveDynamicView(req)

                    if (res.code === 0) {
                        this.$Toast(this.$t('success'))
                        this.__out()
                    } else {
                        this.$Toast(res.msg)
                    }
                }
            }
            console.log(111)
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
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.contain {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 500px;
    background: #fff;
    border-top: 1px solid #dfdfe0;
}
.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.bl,
.br {
    width: 50%;
    height: 100%;
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
        padding-left: 16px;
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

.list {
    width: 254px;
    margin: 20px auto 0;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        display: flex;
        align-items: center;

        > div:first-child {
            width: 30px;
            height: 30px;
            position: relative;
            overflow: hidden;
            border-radius: 50%;
            z-index: 1;
            background: #f1f1f1;
            img {
                object-fit: cover;
                width: 30px;
                height: 30px;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
            flex-grow: 1;
        }
        input {
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;
            background: url('./img/addFriends_clear@3x.png');
            background-size: 100% 100%;
            margin-right: 20px;
        }
    }
}
.rlist {
    overflow-y: auto;
    height: calc(100% - 110px);
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